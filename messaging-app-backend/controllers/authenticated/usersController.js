import { prisma } from "../../clients/prismaClient.js";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import bcrypt from "bcryptjs";
import { s3Client } from "../../clients/s3Client.js";

const upload = multer();

 

const usersController = (() => {
  const getAllUsers = async (req, res) => {
    const { tokenHolder, filter, search } = req.query;
    if (tokenHolder === "true") {
      const user = await prisma.user.findMany({
        where: {
          id: req.user.id,
        },
      });
      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "User fetched successfuly",
        status: 200,
        data: user,
      });
    } else if (search && filter) {
      let users = null;
      if (filter !== "ALL") {
        if (filter !== "OFFLINE") {
          users = await prisma.user.findMany({
            where: {
              status: filter,
              id: {
                not: req.user.id,
              },
              username: {
                contains: search,
              },
            },
          });
        } else {
          users = await prisma.user.findMany({
            where: {
              OR: [{ status: filter }, { status: null }],
              id: {
                not: req.user.id,
              },
              username: {
                contains: search,
              },
            },
          });
        }
      } else {
        users = await prisma.user.findMany({
          where: {
            id: {
              not: req.user.id,
            },
            username: {
              contains: search,
            },
          },
        });
      }
      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "User fetched successfuly",
        status: 200,
        data: users,
      });
    } else if (filter) {
      let users = null;
      if (filter !== "ALL") {
        if (filter !== "OFFLINE") {
          users = await prisma.user.findMany({
            where: {
              status: filter,
              id: {
                not: req.user.id,
              },
            },
          });
        } else {
          users = await prisma.user.findMany({
            where: {
              OR: [{ status: filter }, { status: null }],
              id: {
                not: req.user.id,
              },
            },
          });
        }
      } else {
        users = await prisma.user.findMany({
          where: {
            id: {
              not: req.user.id,
            },
          },
        });
      }
      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "User fetched successfuly",
        status: 200,
        data: users,
      });
    } else if (search) {
      let users = null;

      users = await prisma.user.findMany({
        where: {
          id: {
            not: req.user.id,
          },
          username: {
            contains: search,
          },
        },
      });

      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "User fetched successfuly",
        status: 200,
        data: users,
      });
    } else {
      try {
        const users = await prisma.user.findMany({
          where: {
            id: {
              not: req.user.id,
            },
          },
        });
        return res.status(200).json({
          code: "FETCH_SUCCESS",
          message: "Users fetched successfuly",
          status: 200,
          data: users,
        });
      } catch (e) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was a problem fetching users",
          status: 500,
          data: e,
        });
      }
    }
  };

  const editUserProfile = [
    upload.single("file"),
    async (req, res) => {
      const { userId } = req.params;
      try {
        if (req.query.editPassword) {
          const { password, newPassword } = req.body;

          // check if password is valid
          const user = await prisma.user.findUnique({
            where: {
              id: Number(userId),
            },
          });

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return res.status(401).json({
              code: "PASSWORD_SUCCESS",
              message: "The password you entered is incorrect",
              status: 401,
            });
          }

          const hashedPassword = await bcrypt.hash(newPassword, 15);

          const updatedUser = await prisma.user.update({
            where: {
              id: Number(userId),
            },
            data: {
              password: hashedPassword,
            },
          });

          if (updatedUser) {
            return res.status(200).json({
              code: "UPDATE_SUCCESS",
              message: "Password changed successfuly!",
              status: 200,
              data: updatedUser,
            });
          }
        } else {
          const { username, bio } = req.body;
          const file = req.file;
          let updatedUser = null;

          // If there is a file, upload file
          // and save the key
          if (file) {
            await s3Client.send(
              new PutObjectCommand({
                Bucket: process.env.SUPABASE_BUCKET,
                Key: `${userId}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
              })
            );
            updatedUser = await prisma.user.update({
              where: {
                id: Number(userId),
              },
              data: {
                username,
                bio,
                avatar: `${userId}-${file.originalname}`,
              },
            });
          } else {
            updatedUser = await prisma.user.update({
              where: {
                id: Number(userId),
              },
              data: {
                username,
                bio,
              },
            });
          }
          return res.status(200).json({
            code: "UPDATE_SUCCESS",
            message: "Profile updated successfuly!",
            status: 200,
            data: updatedUser,
          });
        }
      } catch (e) {
        return res.status(500).json({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error in the server. Please try again",
          status: 500,
          data: e,
        });
      }
    },
  ];

  return { getAllUsers, editUserProfile };
})();

export default usersController;

import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { prisma } from "../clients/prismaClient.js";

dotenv.config();

const MIN_PASSWORD_LENGTH = 8;
const HASH_ROUNDS = 15;

const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsed = {};

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];
      parsed[key] = value;
      i += 1;
    }
  }

  return parsed;
};

const printUsage = () => {
  console.log("Usage:");
  console.log(
    "  node scripts/resetPasswordManual.js --email <email> --password <newPassword>",
  );
  console.log(
    "  node scripts/resetPasswordManual.js --userId <id> --password <newPassword>",
  );
  console.log(
    "Optional: use RESET_PASSWORD env var instead of --password to avoid shell history.",
  );
};

const main = async () => {
  const args = parseArgs();
  const email = args.email?.trim();
  const userIdRaw = args.userId?.trim();
  const password = args.password ?? process.env.RESET_PASSWORD;

  if ((!email && !userIdRaw) || (email && userIdRaw)) {
    console.error("Error: provide exactly one of --email or --userId.");
    printUsage();
    process.exitCode = 1;
    return;
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    console.error(
      `Error: password is required and must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    );
    process.exitCode = 1;
    return;
  }

  const where = email
    ? { email }
    : {
        id: Number(userIdRaw),
      };

  if (!email && Number.isNaN(where.id)) {
    console.error("Error: --userId must be a valid number.");
    process.exitCode = 1;
    return;
  }

  const user = await prisma.user.findUnique({
    where,
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  if (!user) {
    console.error("Error: user not found.");
    process.exitCode = 1;
    return;
  }

  const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  console.log(
    `Password updated successfully for user ${user.username} (${user.email}).`,
  );
};

try {
  await main();
} catch (error) {
  console.error("Failed to reset password:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

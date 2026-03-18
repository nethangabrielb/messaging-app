import useUser from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import useWidth from "@/stores/widthStore";
import { useNavigate } from "react-router-dom";

const PasswordSchema = z
  .object({
    password: z
      .string({ error: "Current password can't be empty" })
      .min(8, { message: "Password fields must have 8 characters minimum" })
      .nullable(),
    newPassword: z
      .string()
      .min(8, { message: "Password field must have 8 characters minimum" })
      .refine((val) => val.trim().length >= 1, {
        message: "New password can't be empty",
      }),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Password field must have 8 characters minimum" })
      .refine((val) => val.trim().length >= 1, {
        message: "New password can't be empty",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password did not match",
    path: ["confirmNewPassword"],
  });

type Password = z.infer<typeof PasswordSchema>;

const Password = () => {
  const [serverError, setServerError] = useState<null | string>(null);
  const { user } = useUser();
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });
  const width = useWidth((state) => state.width);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      const values = getValues();
      return fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${
          user?.data[0].id
        }?editPassword=true`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token") as string,
            )}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );
    },
    onSuccess: async (res) => {
      const data = await res.json();
      if (data.status === 401) {
        setServerError(data.message);
      } else {
        toast.success(data.message);
        reset();
        setServerError(null);
      }
    },
    onError: () => {
      toast.error(
        "There is an unexpected error in the server. Please try again!",
      );
    },
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <form
      className="relative flex w-full justify-center gap-4 p-4 md:justify-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      {width < 602 && (
        <Button
          className="absolute top-0 right-0 m-5"
          onClick={(e) => {
            e.preventDefault();
            navigate("/settings");
          }}
        >
          <ArrowLeft></ArrowLeft>
        </Button>
      )}
      <div className="flex w-fit flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className="ml-1 text-sm font-extralight">
            Current password
          </Label>
          <Input
            type="password"
            className={clsx(
              "font-light",
              errors.password ||
                (serverError && "border-red-500 !ring-red-500"),
            )}
            {...register("password")}
            onChange={() => {
              if (serverError) {
                setServerError(null);
              }
            }}
          ></Input>
          {errors.password && (
            <p className="translate-x-[4px] translate-y-[4px] text-[9px] text-red-500">
              {errors.password.message}
            </p>
          )}
          {serverError && (
            <p className="translate-x-[4px] translate-y-[4px] text-[9px] text-red-500">
              {serverError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="ml-1 text-sm font-extralight">New Password</Label>
          <Input
            type="password"
            className={clsx(
              "font-light",
              errors.newPassword && "border-red-500 !ring-red-500",
            )}
            {...register("newPassword")}
          ></Input>
          {errors.newPassword && (
            <p className="translate-x-[4px] translate-y-[4px] text-[9px] text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="ml-1 text-sm font-extralight">
            Confirm new password
          </Label>
          <Input
            type="password"
            className={clsx(
              "font-light",
              errors.confirmNewPassword && "border-red-500 !ring-red-500",
            )}
            {...register("confirmNewPassword")}
          ></Input>
          {errors.confirmNewPassword && (
            <p className="translate-x-[4px] translate-y-[4px] text-[9px] text-red-500">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          Change password
        </Button>
      </div>
    </form>
  );
};

export default Password;

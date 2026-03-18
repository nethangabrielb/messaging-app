import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { FormProps } from "@/types/formProps";

const RegistrationSchema = z
  .object({
    email: z.email().min(1),
    username: z.string().min(1).trim().nonempty(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterDetails = z.infer<typeof RegistrationSchema>;

export function RegisterForm({ ...props }: Readonly<FormProps>) {
  const [emailServerErr, setEmailServerErr] = useState<string | null>(null);
  const [usernameServerErr, setUsernameServerErr] = useState<string | null>(
    null,
  );

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterDetails>({
    resolver: zodResolver(RegistrationSchema),
  });

  const mutation = useMutation({
    mutationFn: (registrationInput: RegisterDetails) => {
      return fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationInput),
      });
    },
    onSuccess: async (res) => {
      const data = await res.json();
      switch (data.status) {
        case 201:
          toast.success(data.message);
          props.setForm("login");
          break;
        case 400: {
          data.data.map((err: { msg: string; path: string }) => {
            if (err.path === "email") {
              setEmailServerErr(err.msg);
            } else if (err.path === "username") {
              setUsernameServerErr(err.msg);
            }
          });
        }
      }
    },
    onError: () => {
      toast.error(
        "There was an error registering your account. Please try again",
      );
    },
  });

  const onSubmit = () => {
    const values = getValues();
    mutation.mutate(values);
  };

  return (
    <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to get started
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="email">Email</Label>
            {errors.email && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                Email can't be empty
              </p>
            )}
            {emailServerErr && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                {emailServerErr}
              </p>
            )}
          </div>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className={clsx(
              errors.email ||
                (emailServerErr && "border-red-500 !ring-red-500"),
            )}
            onChange={() => {
              if (emailServerErr) {
                setEmailServerErr(null);
              }
            }}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="username">Username</Label>
            {errors.username && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                Username can't be empty
              </p>
            )}
            {usernameServerErr && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                {usernameServerErr}
              </p>
            )}
          </div>
          <Input
            {...register("username")}
            id="username"
            type="username"
            required
            className={clsx(
              errors.username ||
                (usernameServerErr && "border-red-500 !ring-red-500"),
            )}
            onChange={() => {
              if (usernameServerErr) {
                setUsernameServerErr(null);
              }
            }}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            {errors.password && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                Passwords must be at least 8 characters
              </p>
            )}
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            required
            className={clsx(errors.password && "border-red-500 !ring-red-500")}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="confirmPassword" className="w-fit">
              Confirm Password
            </Label>
            {errors.confirmPassword && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                {errors.confirmPassword.type === "custom"
                  ? errors.confirmPassword.message
                  : "Passwords must be at least 8 characters"}
              </p>
            )}
          </div>
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            required
            className={clsx(
              errors.confirmPassword && "border-red-500 !ring-red-500",
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing you up..." : "Sign up"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <button
          className="cursor-pointer underline underline-offset-4"
          onClick={() => {
            props.setForm("login");
            reset();
          }}
        >
          Log in
        </button>
      </div>
    </form>
  );
}

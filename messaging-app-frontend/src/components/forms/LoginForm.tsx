import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormProps } from "@/types/formProps";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { socket } from "../../socket";

const LoginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

type LoginDetails = z.infer<typeof LoginSchema>;

export function LoginForm({ ...props }: Readonly<FormProps>) {
  const [error, setError] = useState<{ error: string; message: string }>({
    error: "",
    message: "",
  });
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<LoginDetails>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (loginInput: LoginDetails) => {
      return fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInput),
      });
    },
    onSuccess: async (res) => {
      const data = await res.json();

      switch (data.status) {
        case 401:
          setError({ error: "password", message: data.message });
          break;
        case 404:
          setError({ error: "email", message: data.message });
          break;
        case 200:
          localStorage.setItem("token", JSON.stringify(data.data.token));
          socket.connect();
          socket.emit(
            "set status",
            data?.data?.token,
            "ONLINE",
            (res: { success: true }) => {
              if (res.success) {
                navigate("/chat");
              }
            },
          );
      }
    },
  });

  const onSubmit = () => {
    const values = getValues();
    mutation.mutate(values);
  };

  return (
    <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="email">Email</Label>
            {errors.email && (touchedFields.email || isSubmitted) && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                Email can't be empty
              </p>
            )}
            {error.error === "email" && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                {error.message}
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
                (error.error === "email" && "border-red-500 !ring-red-500"),
            )}
            // Add an onChange listener here to remove error if
            // user is typing and finished typing
            onChange={() => {
              if (error.error === "email") {
                setError({ error: "", message: "" });
              }
            }}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {errors.password && (touchedFields.password || isSubmitted) && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                Password must be at least 8 characters
              </p>
            )}
            {error.error === "password" && (
              <p className="translate-y-[4px] text-[9px] text-red-500">
                {error.message}
              </p>
            )}
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            required
            className={clsx(
              errors.password ||
                (error.error === "password" && "border-red-500 !ring-red-500"),
            )}
            // Same here, we add an onChange listener here to remove error if
            // user is typing and finished typing
            onChange={() => {
              if (error.error === "password") {
                setError({ error: "", message: "" });
              }
            }}
          />
        </div>
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          className="cursor-pointer underline underline-offset-4"
          onClick={() => {
            props.setForm("register");
            reset();
          }}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

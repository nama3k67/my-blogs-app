"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { handleLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/libs/utils";
import { useTranslation } from "@/providers/translation.provider";
import { ROUTES } from "@/shared/constants";
import { LoginResponse } from "@/shared/types/auth/login.type";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const initialState: LoginResponse = {
  success: false,
  message: "",
  errors: {},
};

const formSchema = z.object({
  email: z.string().nonempty({ message: "email_required" }).email(),
  password: z.string().nonempty({ message: "password_required" }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [LoginResponse, setLoginResponse] = useState(initialState);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { dictionary } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await handleLogin(data);
    setLoginResponse(response);

    if (response.success) {
      form.reset();
    } else {
      passwordRef.current?.focus();
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {LoginResponse.message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{LoginResponse.message}</AlertDescription>
        </Alert>
      )}

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">{dictionary.log_in.title}</CardTitle>
          <CardDescription>{dictionary.log_in.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="on">
              <div className="flex flex-col gap-1">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dictionary.form.email}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>{dictionary.form.password}</FormLabel>
                          <Link
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            {dictionary.log_in.forgot_password}
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} ref={passwordRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full mb-2"
                >
                  <Loader2
                    className={cn("animate-spin", {
                      hidden: !form.formState.isSubmitting,
                    })}
                  />
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                {dictionary.log_in.have_account}{" "}
                <Link
                  href={ROUTES.PUBLIC.SIGNUP}
                  className="underline underline-offset-4"
                >
                  {dictionary.sign_up.title}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

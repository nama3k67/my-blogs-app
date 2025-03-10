"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { handleSignUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/providers/translation.provider";
import { ROUTES } from "@/shared/constants";
import { cn } from "@/shared/libs/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "email_required" })
      .email({ message: "email_invalid" }),
    username: z.string().nonempty({ message: "username_required" }),
    password: z
      .string()
      .nonempty({ message: "password_required" })
      .min(8, { message: "password_min_length" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "confirm_password_required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirm_password_not_match",
    path: ["confirmPassword"],
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { dictionary } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await handleSignUp(data);
    console.log(result);
    //TODO: Show alert when there is an error
  };

  return (
    <div className={cn("flex flex-col gap-7", className)} {...props}>
      <div className="flex flex-col items-center gap-1">
        <Link href={ROUTES.PUBLIC.HOME}>
          <Image
            src="/logo.png"
            width={48}
            height={48}
            alt="Logo Image"
            className="rounded-xl"
          />
        </Link>
        <h1 className="text-2xl font-medium text-gray-800">
          {dictionary.sign_up.description}
        </h1>
      </div>

      <Card className="rounded-none w-full sm:rounded-2xl pt-5">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="on">
              <div className="flex flex-col">
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dictionary.form.username}</FormLabel>
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
                        <FormLabel>{dictionary.form.password}</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {dictionary.form.confirm_password}
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full">
                    {dictionary.sign_up.title}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {dictionary.sign_up.description}
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-center text-sm">
                {dictionary.sign_up.have_account}{" "}
                <Link
                  href={ROUTES.PUBLIC.LOGIN}
                  className="underline underline-offset-4"
                >
                  {dictionary.log_in.title}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

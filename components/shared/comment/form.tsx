"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "@/providers/auth.provider";
import { useTranslation } from "@/providers/translation.provider";
import { CommentCreateRequest } from "@/services/type/comment.type";

const formSchema = z.object({
  content: z.string().nonempty({ message: "comment_required" }),
});

type Props = {
  blogId: number;
  onSubmit: (data: CommentCreateRequest) => Promise<void>;
};

export default function CommentForm({ blogId, onSubmit }: Props) {
  const { dictionary } = useTranslation();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    //TODO: If user is not logged in, redirect to login page (Or show toast to inform user to login)

    if (!user) return;

    await onSubmit({
      blogId: blogId,
      userId: user?.id,
      content: data.content,
    });
    form.reset();
  };

  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">{dictionary.comment.title}</h2>
      <div className="flex flex-col space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={dictionary.comment.placeholder}
                      className="resize-none rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                    />
                  </FormControl>
                  <div className="flex items-center justify-between">
                    <Button type="submit" className="w-fit">
                      {dictionary.comment.submit}
                    </Button>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

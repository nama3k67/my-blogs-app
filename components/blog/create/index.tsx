"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth.provider";
// import { createBlog } from "@/services/actions/blog.action";
import { DialogTitle } from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const BlogCreate: React.FC = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = () => {
    if (!user) return;

    // createBlog({ title, content, userId: user?.id });
  };

  return (
    <Dialog>
      <DialogTrigger>Tạo blog</DialogTrigger>
      <DialogContent className="w-4/5">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">Tạo Blog</DialogTitle>
        </DialogHeader>

        <Input
          onChange={(e) => setTitle(e.currentTarget.value)}
          defaultValue={title}
        />

        <MDEditor
          preview="edit"
          value={content}
          onChange={(val) => setContent(val || "")}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BlogCreate;

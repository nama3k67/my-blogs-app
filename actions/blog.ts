"use server";

import { handleAsyncAction } from "@/lib/async";
import { createBlog } from "@/services/actions/blog.action";
import { BlogRecreateRequest } from "@/services/type/blog.type";

export const handleCreateBlog = async (data: BlogRecreateRequest) =>
  handleAsyncAction(() => createBlog(data));

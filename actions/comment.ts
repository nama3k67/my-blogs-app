"use server";

import { createComment } from "@/services/actions/comment.action";
import { CommentCreateRequest } from "@/services/type/comment.type";
import { handleAsyncAction } from "@/shared/utils/async";

export const handleCreateComment = async (data: CommentCreateRequest) =>
  handleAsyncAction(() => createComment(data));

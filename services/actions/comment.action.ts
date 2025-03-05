import prisma from "@/shared/libs/prisma";
import { CommentCreateRequest } from "../type/comment.type";

export async function createComment(data: CommentCreateRequest) {
  const comment = await prisma.comments.create({
    data: {
      blogid: data.blogId,
      userid: data.userId,
      content: data.content,
    },
  });

  return comment;
}

export async function getCommentsByBlogId(blogId: number) {
  const comments = await prisma.comments.findMany({
    where: {
      blogid: blogId,
    },
    include: {
      users: true,
    }
  });

  return comments;
}

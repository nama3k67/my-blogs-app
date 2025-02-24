import prisma from "@/shared/libs/prisma";
import { slugify } from "@/shared/utils/common";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const blogs = await prisma.blogs.findMany();
  return NextResponse.json(blogs);
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { title, content, userid } = await request.json();
    const slug = slugify(title);

    const blog = await prisma.blogs.create({
      data: {
        title,
        content,
        userid,
        slug,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "An error occurred while creating the blog." },
      { status: 500 }
    );
  }
}

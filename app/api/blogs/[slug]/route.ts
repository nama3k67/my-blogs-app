import { NextResponse } from "next/server";

import prisma from "@/shared/libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const slug = (await params).slug;

    const blog = await prisma.blogs.findUnique({
      where: { slug },
    });

    return NextResponse.json(blog);
  } catch {
    return NextResponse.json(
      { message: "An error occurred while fetching the blog." },
      { status: 500 }
    );
  }
}

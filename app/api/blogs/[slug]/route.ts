import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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

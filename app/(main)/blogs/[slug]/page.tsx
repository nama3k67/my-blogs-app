import { BlogDetails } from "@/components/blog/details";

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: Params) {
  const { slug } = await params;

  const blog = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`
  ).then((res) => res.json());

  return (
    <div>
      <BlogDetails content={blog.content} />
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
  ).then((res) => res.json());

  return blogs;
}

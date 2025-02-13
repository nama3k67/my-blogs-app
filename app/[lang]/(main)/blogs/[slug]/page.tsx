import { BlogDetails } from "@/components/blog/details";
import { getBlogDetails, getBlogs } from "@/services/actions/blog.action";

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: Params) {
  const { slug } = await params;

  const blog = await getBlogDetails(slug);

  return (
    <div>
      <BlogDetails content={blog?.content || ""} />
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs;
}

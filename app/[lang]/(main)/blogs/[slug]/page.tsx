import { BlogDetails } from "@/components/blog/details";
import { getBlogDetails, getBlogs } from "@/services/actions/blog.action";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const blog = await getBlogDetails(slug);

  return {
    title: blog?.title,
    description: blog?.description,
  };
}

export default async function BlogDetailsPage({ params }: Params) {
  const { slug } = await params;
  const blog = await getBlogDetails(slug);

  return <BlogDetails content={blog?.content || ""} />;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs;
}

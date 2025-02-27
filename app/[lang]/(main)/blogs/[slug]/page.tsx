import { BlogDetails } from "@/components/blog/details";
import { Locale } from "@/i18n-config";
import { getBlogDetails, getBlogs } from "@/services/actions/blog.action";

interface Params {
  params: Promise<{ slug: string; lang: Locale }>;
}

export async function generateMetadata({ params }: Params) {
  const { lang, slug } = await params;
  const blog = await getBlogDetails({ slug, lang });

  return {
    title: blog?.title,
    description: blog?.description,
  };
}

export default async function BlogDetailsPage({ params }: Params) {
  const { lang, slug } = await params;
  const blog = await getBlogDetails({ slug, lang });

  return <BlogDetails content={blog?.content || ""} />;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs;
}

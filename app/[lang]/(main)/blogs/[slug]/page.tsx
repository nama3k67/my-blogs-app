import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { BlogDetails } from "@/components/blog/details";
import CommentForm from "@/components/shared/comment/form";
import CommentList from "@/components/shared/comment/list";

import { handleCreateComment } from "@/actions/comment";
import { Locale } from "@/i18n-config";
import { getBlogDetails } from "@/services/actions/blog.action";
import { getCommentsByBlogId } from "@/services/actions/comment.action";
import { CommentCreateRequest } from "@/services/type/comment.type";
import { ROUTES } from "@/shared/constants";
import { getDictionary } from "@/get-dictionary";

interface Params {
  params: Promise<{ slug: string; lang: Locale }>;
}

export async function generateMetadata({ params }: Params) {
  const { lang, slug } = await params;
  const { metadata } = await getDictionary(lang);
  const blog = await getBlogDetails({ slug, lang });

  return {
    title: `${blog?.title} - ${metadata.author}`,
    description: blog?.description,
  };
}

export default async function BlogDetailsPage({ params }: Params) {
  const { lang, slug } = await params;
  const blog = await getBlogDetails({ slug, lang });
  if (!blog) {
    notFound();
  }

  const comments = await getCommentsByBlogId(blog?.blogid);
  const createComment = async (data: CommentCreateRequest) => {
    "use server";
    const response = await handleCreateComment(data);

    if (response.success) {
      revalidatePath(`${ROUTES.PUBLIC.BLOG_DETAILS}/${slug}`, "page");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BlogDetails content={blog?.content || ""} />
      <CommentForm blogId={blog?.blogid} onSubmit={createComment} />
      <CommentList comments={comments} lang={lang} />
    </div>
  );
}

// export async function generateStaticParams({ params }: Params) {
//   const { lang } = await params;
//   console.log("🚀 ~ generateStaticParams ~ lang:", lang)
//   const blogs = await getBlogs({ lang });
//   return blogs;
// }

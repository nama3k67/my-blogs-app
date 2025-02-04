import { BlogItem } from "@/components/blog/item";
import { SimpleLayout } from "@/components/layout/shared/simple";
import { BlogItem as BlogItemType } from "@/shared/types/blog";

export default async function Blogs() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <SimpleLayout
      title="Blogs về thể thao, sức khỏe và công nghệ"
      intro="Là một lập trình viên đam mê thể thao sức bền, mình muốn chia sẻ những kiến thức của mình về dinh dưỡng, phương pháp tập luyện và công nghệ"
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {data.map((item: BlogItemType) => (
            <BlogItem key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}

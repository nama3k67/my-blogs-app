interface Params {
  param: Promise<{ slug: string }>;
}

export default async function Blogs({ param }: Params) {
  const { slug } = await param;
  return <h1>{slug}</h1>;
}

export async function generateStaticParams() {
  return [{ slug: "hello-world" }];
}

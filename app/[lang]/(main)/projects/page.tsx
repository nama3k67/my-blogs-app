import { Metadata } from "next";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

type Props = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { projects, metadata } = await getDictionary(lang);

  return {
    title: `${projects.title} - ${metadata.author}`,
    description: projects.description,
  };
}

export default async function ProjectsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample project cards */}
        <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Project One</h2>
          <p className="text-gray-600 mb-4">
            A brief description of the first project and its features.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              React
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              TypeScript
            </span>
          </div>
        </div>

        <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Project Two</h2>
          <p className="text-gray-600 mb-4">
            A brief description of the second project and its features.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              Next.js
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              Tailwind
            </span>
          </div>
        </div>

        <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Project Three</h2>
          <p className="text-gray-600 mb-4">
            A brief description of the third project and its features.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Node.js
            </span>
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
              MongoDB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

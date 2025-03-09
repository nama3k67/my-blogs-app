import { ROUTES } from "@/shared/constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return [
    {
      url: baseUrl + ROUTES.PUBLIC.HOME,
      alternates: {
        languages: {
          en: baseUrl + "/en",
          vi: baseUrl + "/vi",
        },
      },
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: baseUrl + ROUTES.PUBLIC.BLOG_LIST,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${ROUTES.PUBLIC.BLOG_LIST}`,
          vi: `${baseUrl}/vi/${ROUTES.PUBLIC.BLOG_LIST}`,
        },
      },
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: baseUrl + ROUTES.PUBLIC.ABOUT,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${ROUTES.PUBLIC.ABOUT}`,
          vi: `${baseUrl}/vi/${ROUTES.PUBLIC.ABOUT}`,
        },
      },
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}

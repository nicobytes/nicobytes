export function serializeJsonLd(
  schema: Record<string, unknown> | Record<string, unknown>[],
): string {
  return JSON.stringify(schema);
}

export function websiteSchema(siteUrl: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: siteUrl,
  };
}

export function personSchema(options: {
  name: string;
  url: string;
  description: string;
  sameAs: string[];
  jobTitle?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: options.name,
    url: options.url,
    description: options.description,
    sameAs: options.sameAs,
    jobTitle: options.jobTitle,
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: post.image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

export function blogIndexSchema(options: {
  siteUrl: string;
  posts: { title: string; url: string; datePublished: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: `${options.siteUrl}blog/`,
    blogPost: options.posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: post.url,
      datePublished: post.datePublished,
    })),
  };
}

export function creativeWorkSchema(project: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.url,
    image: project.image,
    datePublished: project.datePublished,
  };
}

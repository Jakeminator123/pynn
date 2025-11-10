import { siteContent } from "@/lib/content";

export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pynn.ai";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pynn AI",
    legalName: "Pynn AI SL",
    url: siteUrl,
    logo: `${siteUrl}/img/logo-pynn.svg`,
    description:
      "One platform connecting Europe's entire early-stage innovation ecosystem.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mallorca",
      addressRegion: "Balearic Islands",
      addressCountry: "ES",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@pynn.ai",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.linkedin.com/company/pynn-ai",
      // Add more social media URLs when available
    ],
    foundingDate: "2024",
    founders: [
      // Add founder info when available
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pynn",
    url: siteUrl,
    description:
      "One platform connecting Europe's entire early-stage innovation ecosystem.",
    publisher: {
      "@type": "Organization",
      name: "Pynn AI",
      logo: `${siteUrl}/img/logo-pynn.svg`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pynn Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Free trial available",
    },
    description:
      "White-label platform for investors, incubators, accelerators, corporates, governments, universities, events, and venture builders. Manage deal flow, organize pipeline, monitor portfolio progress, manage data rooms, and support portfolio companies.",
    featureList: [
      "Deal flow assessment",
      "Pipeline organization",
      "Portfolio monitoring",
      "Data room management",
      "White-label customization",
      "Multi-tenant support",
    ],
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteContent.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Story",
        item: `${siteUrl}/our-story`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "For Startups",
        item: `${siteUrl}/for-startups`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "For Clients",
        item: `${siteUrl}/for-clients`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

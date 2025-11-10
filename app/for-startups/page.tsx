import type { Metadata } from 'next';
import Link from 'next/link';
import { siteContent } from '@/lib/content';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'For Startups',
  description: 'Apply in five minutes and become visible to hundreds of investors across Europe. Access events, services, tools, and innovation partners.',
  alternates: {
    canonical: '/for-startups',
  },
  openGraph: {
    title: 'For Startups | Pynn',
    description: 'Apply in five minutes and become visible to hundreds of investors across Europe.',
    url: '/for-startups',
  },
};

export default function ForStartupsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pynn.ai';
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'For Startups',
        item: `${siteUrl}/for-startups`,
      },
    ],
  };

  return (
    <>
      <StructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 py-12 md:py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 md:mb-8 text-sm text-blue-700">
            <Link href="/" className="hover:text-blue-900 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-blue-900 font-medium">For Startups</span>
          </nav>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 md:mb-8">
            For Startups
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-4 md:space-y-6 text-slate-700">
            <p className="text-base md:text-xl">
              <strong className="text-slate-900">{siteContent.forStartups.content[0].split(',')[0]},</strong>
              {siteContent.forStartups.content[0].split(',').slice(1).join(',')}
            </p>
            <p className="text-base md:text-xl">
              {siteContent.forStartups.content[1]}
            </p>
          </div>

          <div className="mt-8 md:mt-12">
            <a
              href={siteContent.forStartups.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-center w-full sm:w-auto text-base md:text-lg"
            >
              {siteContent.forStartups.cta.text}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
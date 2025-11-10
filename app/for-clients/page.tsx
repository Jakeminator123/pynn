import type { Metadata } from 'next';
import Link from 'next/link';
import { siteContent } from '@/lib/content';
import StructuredData from '@/components/StructuredData';
import SubdomainLink from '@/components/SubdomainLink';

export const metadata: Metadata = {
  title: 'For Clients',
  description: 'A white-label platform for investors, incubators, accelerators, corporates, governments, universities, events, and venture builders.',
  alternates: {
    canonical: '/for-clients',
  },
  openGraph: {
    title: 'For Clients | Pynn',
    description: 'A white-label platform for investors, incubators, accelerators, and more.',
    url: '/for-clients',
  },
};

export default function ForClientsPage() {
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
        name: 'For Clients',
        item: `${siteUrl}/for-clients`,
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
            <span className="text-blue-900 font-medium">For Clients</span>
          </nav>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 md:mb-8">
            For Clients
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-4 md:space-y-6 text-slate-700">
            <p className="text-base md:text-xl">
              {siteContent.forClients.content[0]}
            </p>
            <p className="text-base md:text-xl">
              <strong className="text-slate-900">{siteContent.forClients.content[1].split(':')[0]}:</strong>
              {siteContent.forClients.content[1].split(':').slice(1).join(':')}
            </p>
          </div>

          <div className="mt-8 md:mt-12">
            <a
              href={siteContent.forClients.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-center w-full sm:w-auto text-base md:text-lg"
            >
              {siteContent.forClients.cta.text}
            </a>
          </div>

          {/* Subdomains Section */}
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-blue-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Example Communities
            </h2>
            <p className="text-slate-600 mb-6">
              See examples of communities powered by Pynn:
            </p>
            <div className="space-y-3">
              <SubdomainLink
                subdomainUrl={siteContent.subdomains.womenInvestInWomen.url}
                subdomainName={siteContent.subdomains.womenInvestInWomen.name}
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg"
              >
                Visit {siteContent.subdomains.womenInvestInWomen.name}
              </SubdomainLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
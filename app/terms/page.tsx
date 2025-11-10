import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Pynn AI SL',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
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
        name: 'Terms & Conditions',
        item: `${siteUrl}/terms`,
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
            <span className="text-blue-900 font-medium">Terms & Conditions</span>
          </nav>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 md:mb-8">
            Terms & Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="text-base md:text-lg">
              Terms and Conditions content will be added here. Please contact Pynn AI SL for the complete terms and conditions.
            </p>
            <p className="mt-4 text-base md:text-lg">
              For inquiries, please visit our main website or contact us through the provided channels.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
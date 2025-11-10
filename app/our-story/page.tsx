import type { Metadata } from 'next';
import Link from 'next/link';
import { siteContent } from '@/lib/content';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about Pynn\'s mission to centralize Europe\'s innovation ecosystem and solve the €30+ billion funding fragmentation problem.',
  alternates: {
    canonical: '/our-story',
  },
  openGraph: {
    title: 'Our Story | Pynn',
    description: 'Learn about Pynn\'s mission to centralize Europe\'s innovation ecosystem.',
    url: '/our-story',
  },
};

export default function OurStoryPage() {
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
        name: 'Our Story',
        item: `${siteUrl}/our-story`,
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
            <span className="text-blue-900 font-medium">Our Story</span>
          </nav>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 md:mb-8">
            Our Story
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-4 md:space-y-6 text-slate-700">
            <p className="text-base md:text-xl">
              {siteContent.ourStory.content[0]}
            </p>
            <p className="text-base md:text-xl">
              {siteContent.ourStory.content[1]}
            </p>
            <p className="text-xl md:text-2xl font-semibold text-slate-900">
              {siteContent.ourStory.content[2]}
            </p>
            <p className="text-base md:text-xl">
              {siteContent.ourStory.content[3]}
            </p>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
            <a
              href={siteContent.ourStory.links.viewDeck}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-center"
            >
              View Deck
            </a>
            <a
              href={siteContent.ourStory.links.bookMeeting}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-900 font-medium border-2 border-blue-300 rounded-lg hover:bg-white hover:border-blue-400 transition-all shadow-md hover:shadow-lg text-center"
            >
              Book a Meeting
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
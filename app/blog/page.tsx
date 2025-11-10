"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";

const blogPosts = [
  {
    id: 1,
    title: "The Future of European Innovation Ecosystems",
    excerpt: "Exploring how platforms like Pynn are reshaping the way startups connect with investors across Europe's fragmented markets.",
    date: "March 15, 2024",
    category: "Innovation",
  },
  {
    id: 2,
    title: "5 Key Trends in Early-Stage Funding for 2024",
    excerpt: "A deep dive into the latest trends shaping early-stage investment across European markets and what startups need to know.",
    date: "March 10, 2024",
    category: "Funding",
  },
  {
    id: 3,
    title: "Building Strong Investor-Startup Relationships",
    excerpt: "Best practices for startups looking to build meaningful connections with investors and navigate the funding landscape.",
    date: "March 5, 2024",
    category: "Startups",
  },
  {
    id: 4,
    title: "The Role of Accelerators in Modern Innovation",
    excerpt: "How accelerators and incubators are evolving to support the next generation of European startups.",
    date: "February 28, 2024",
    category: "Ecosystem",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" className="py-24 pb-16">
        <Container maxWidth="2xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-indigo-200 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Insights on innovation, funding, and the European startup ecosystem
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Blog Posts */}
      <Section variant="light" className="py-16 md:py-20">
        <Container maxWidth="2xl">
          <div className="grid gap-8 md:gap-10">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-blue-200/50 hover:border-blue-300/80 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-semibold">
                    {post.category}
                  </span>
                  <span className="text-slate-500 text-sm">{post.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                  {post.title}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-indigo-600 transition-colors"
                >
                  Read more
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}


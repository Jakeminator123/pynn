"use client";

import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/lib/content";
import StructuredData from "@/components/StructuredData";
import Card from "@/components/Card";
import Section from "@/components/Section";
import Container from "@/components/Container";
import SubdomainLink from "@/components/SubdomainLink";
import Logo3DWrapper from "@/components/Logo3DWrapper";
import VideoPlayer from "@/components/VideoPlayer";
import ChatButton from "@/components/ChatButton";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import { motion } from "framer-motion";

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      delay: 0.3,
    },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData />

      {/* Hero Section */}
      <Section
        variant="dark"
        className="flex flex-col items-center justify-center text-center text-white px-4 pt-24 pb-32 min-h-[75vh] flex-shrink-0"
      >
        <motion.div
          className="w-full max-w-[550px] h-[400px] mb-12 flex justify-center items-center relative mx-auto"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Background glow effects - single subtle pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl scale-150 opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-blue-600/15 rounded-full blur-2xl scale-125 animate-pulse animation-delay-2000 opacity-40"></div>

          {/* 3D Logo */}
          <Logo3DWrapper className="absolute inset-0 z-10" />
        </motion.div>
        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-[-0.02em] font-[family-name:var(--font-inter)]">
              <motion.span
                className="block mb-4 sm:mb-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-indigo-400/30 blur-2xl -z-10"></span>
                  <span className="relative bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                    The intelligence layer
                  </span>
                </span>
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-purple-400/30 to-pink-400/30 blur-2xl -z-10"></span>
                  <span className="relative bg-gradient-to-r from-cyan-100 via-white to-indigo-100 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x animation-delay-1000">
                    of European innovation
                  </span>
                </span>
              </motion.span>
            </h1>

            <motion.div
              className="flex items-center justify-center gap-2 mt-8 sm:mt-10"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="h-1.5 w-24 sm:w-32 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-[length:200%_100%] animate-gradient-x"></div>
              <div className="h-1 w-1 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="h-1.5 w-24 sm:w-32 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-[length:200%_100%] animate-gradient-x animation-delay-1000"></div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Cards Container */}
      <Section variant="light" className="py-20 md:py-28 -mt-12">
        <Container maxWidth="2xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
              How Pynn Works
            </h2>
            <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-[length:200%_100%] animate-gradient-x mx-auto"></div>
          </motion.div>
          <motion.div
            className="flex justify-center flex-wrap gap-6 lg:gap-8"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card
              index={0}
              title="Our Story"
              description={siteContent.ourStory.content}
              buttons={[
                {
                  text: "View Deck",
                  href: siteContent.ourStory.links.viewDeck,
                  variant: "primary",
                },
                {
                  text: "Book a Meeting",
                  href: siteContent.ourStory.links.bookMeeting,
                  variant: "secondary",
                },
              ]}
            />

            <Card
              index={1}
              title="For Startups"
              description={siteContent.forStartups.content}
              buttons={[
                {
                  text: siteContent.forStartups.cta.text,
                  href: siteContent.forStartups.cta.url,
                  variant: "primary",
                },
              ]}
            />

            <Card
              index={2}
              title="For Clients"
              description={siteContent.forClients.content}
              buttons={[
                {
                  text: siteContent.forClients.cta.text,
                  href: siteContent.forClients.cta.url,
                  variant: "secondary",
                },
              ]}
            />
          </motion.div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* Video Section */}
      <Section variant="light" className="py-20 md:py-28">
        <Container maxWidth="4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
              {siteContent.video.title}
            </h2>
            <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-[length:200%_100%] animate-gradient-x mx-auto mb-6"></div>
            <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {siteContent.video.description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <VideoPlayer
              src={siteContent.video.url}
              title={siteContent.video.title}
              className="max-w-4xl mx-auto"
            />
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Team Section */}
      <Team />

      {/* FAQ Section */}
      <FAQ />

      {/* Example Communities Section */}
      <Section variant="dark" className="py-20 md:py-28">
        <Container maxWidth="2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Example Communities
            </h2>
            <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-[length:200%_100%] animate-gradient-x mx-auto mb-6"></div>
            <h3 className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              See examples of communities powered by Pynn. Click to learn more
              about SEO best practices.
            </h3>
            <div className="flex justify-center">
              <SubdomainLink
                subdomainUrl={siteContent.subdomains.womenInvestInWomen.url}
                subdomainName={siteContent.subdomains.womenInvestInWomen.name}
                className="inline-block px-10 py-5 bg-white/20 backdrop-blur-md text-white font-bold text-lg rounded-xl hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Visit {siteContent.subdomains.womenInvestInWomen.name}
              </SubdomainLink>
            </div>
          </motion.div>
        </Container>
      </Section>
      {/* Chat Button */}
      <ChatButton />

      {/* Dev Button - Remove before production */}
      <div className="fixed bottom-4 left-4 z-50">
        <Link
          href="/for-devs"
          className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all text-sm"
        >
          For Devs
        </Link>
      </div>
    </>
  );
}

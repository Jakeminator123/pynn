"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import Section from "@/components/Section";
import FeatureIcon from "@/components/FeatureIcon";
import { siteContent } from "@/lib/content";

export default function Features() {
  return (
    <Section variant="light" className="py-20 md:py-28">
      <Container maxWidth="4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
            Platform Features
          </h2>
          <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-[length:200%_100%] animate-gradient-x mx-auto"></div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {siteContent.features.map((feature, index) => (
            <motion.article
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-200/50 hover:border-blue-300/80 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <FeatureIcon type={feature.iconType} className="mb-5" />
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}


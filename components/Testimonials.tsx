"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { siteContent } from "@/lib/content";

export default function Testimonials() {
  return (
    <Section variant="dark" className="py-20 md:py-28">
      <Container maxWidth="4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            What Our Users Say
          </h2>
          <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-[length:200%_100%] animate-gradient-x mx-auto"></div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {siteContent.testimonials.map((testimonial, index) => (
            <motion.article
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
                  aria-hidden="true"
                >
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg md:text-xl mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base font-semibold mb-0.5">
                    {testimonial.role}
                  </p>
                  <p className="text-white/60 text-xs md:text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <blockquote className="text-white/90 leading-relaxed text-base md:text-lg">
                &quot;{testimonial.content}&quot;
              </blockquote>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

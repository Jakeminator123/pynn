"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { siteContent } from "@/lib/content";

export default function Team() {
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
            Our Team
          </h2>
          <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-[length:200%_100%] animate-gradient-x mx-auto"></div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {siteContent.team.map((member, index) => (
            <motion.article
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-200/50 hover:border-blue-300/80 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 shadow-lg ring-2 ring-blue-200/50 hover:ring-blue-300/70 transition-all duration-300">
                  <Image
                    src={member.avatar}
                    alt={`${member.name} - ${member.role} at ${member.company}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    quality={90}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg md:text-xl mb-1">
                    {member.name}
                  </h3>
                  <p className="text-slate-700 text-sm md:text-base font-semibold mb-0.5">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-xs md:text-sm">
                    {member.company}
                  </p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

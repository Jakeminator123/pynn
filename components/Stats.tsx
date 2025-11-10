"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { siteContent } from "@/lib/content";

export default function Stats() {
  const stats = siteContent.stats;
  
  return (
    <Section variant="light" className="py-20 md:py-28">
      <Container maxWidth="6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const isFirst = index === 0;
            const isLast = index === stats.length - 1;
            
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border transition-all duration-300 ${
                  isFirst 
                    ? 'border-red-200/50 hover:border-red-300/70 hover:shadow-xl hover:shadow-red-100/30' 
                    : isLast
                    ? 'border-green-200/50 hover:border-green-300/70 hover:shadow-xl hover:shadow-green-100/30'
                    : 'border-blue-200/50 hover:border-blue-300/80 hover:shadow-xl hover:shadow-blue-100/30'
                }`}>
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <div className={`text-5xl md:text-6xl lg:text-7xl font-black leading-none ${
                        isFirst
                          ? 'bg-gradient-to-br from-red-500 to-orange-500 bg-clip-text text-transparent'
                          : isLast
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500 bg-clip-text text-transparent'
                          : 'bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                      }`}>
                        {stat.value}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-base md:text-lg font-bold text-slate-900 mb-1.5 leading-tight">
                        {stat.label}
                      </div>
                      <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                  
                  {isFirst && (
                    <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"></div>
                  )}
                  {isLast && (
                    <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"></div>
                  )}
                  {!isFirst && !isLast && (
                    <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}


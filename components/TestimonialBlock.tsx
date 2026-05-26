"use client";

import { motion } from "framer-motion";

interface TestimonialBlockProps {
  quote: string;
  author: string;
  title?: string;
}

export default function TestimonialBlock({ quote, author, title }: TestimonialBlockProps) {
  return (
    <section className="bg-cream2 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <span className="font-cormorant text-8xl text-gold leading-none block mb-2">&ldquo;</span>
        <blockquote className="font-cormorant italic text-2xl md:text-3xl text-text font-medium leading-relaxed mb-8">
          {quote}
        </blockquote>
        <div>
          <p className="font-montserrat text-xs font-semibold tracking-widest uppercase text-gold">
            {author}
          </p>
          {title && (
            <p className="font-dmsans text-sm text-text-muted mt-1">{title}</p>
          )}
        </div>
      </motion.div>
    </section>
  );
}

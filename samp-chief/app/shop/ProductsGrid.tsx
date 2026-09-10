"use client";

import { motion } from "framer-motion";

import ProductCardWrapper from "./productCard";

export default function ProductsGrid({ edges }: { edges: Array<{ node: any }> }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 xl:gap-16 pb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
    >
      {edges.map(({ node }) => (
        <ProductCardWrapper key={node.id} node={node} />
      ))}
    </motion.div>
  );
}

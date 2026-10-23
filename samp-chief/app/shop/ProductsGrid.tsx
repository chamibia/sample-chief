"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import ProductCardWrapper from "./productCard";

const ALL = "All";
const FEATURED = "Featured";

export default function ProductsGrid({ edges }: { edges: Array<{ node: any }> }) {
  const hasFeatured = useMemo(
    () => edges.some(({ node }) => node.tags?.includes("featured")),
    [edges]
  );

  const types = useMemo(() => {
    const seen = new Set<string>();
    edges.forEach(({ node }) => {
      if (node.productType) seen.add(node.productType);
    });
    return Array.from(seen).sort((a, b) => a.localeCompare(b));
  }, [edges]);

  const [selectedType, setSelectedType] = useState(() =>
    edges.some(({ node }) => node.tags?.includes("featured")) ? FEATURED : ALL
  );

  const filteredEdges =
    selectedType === ALL
      ? edges
      : selectedType === FEATURED
      ? edges.filter(({ node }) => node.tags?.includes("featured"))
      : edges.filter(({ node }) => node.productType === selectedType);

  if (types.length === 0 && !hasFeatured) {
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

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10">
        {[...(hasFeatured ? [FEATURED] : []), ...types, ALL].map((type) => {
          const isActive = selectedType === type;
          return (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`font-ruder font-medium text-base md:text-lg tracking-wide transition-all duration-200 ease-out hover:underline hover:underline-offset-4 hover:decoration-2 ${
                isActive
                  ? "text-[#202020] underline underline-offset-4 decoration-2"
                  : "text-gray-400 hover:text-[#202020]"
              }`}
            >
              {type.toUpperCase()}
            </button>
          );
        })}
      </div>

      <motion.div
        key={selectedType}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 xl:gap-16 pb-24"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        }}
      >
        {filteredEdges.map(({ node }) => (
          <ProductCardWrapper key={node.id} node={node} />
        ))}
      </motion.div>
    </div>
  );
}

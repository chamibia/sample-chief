'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ node }: { node: any }) {
  const img = node.images.edges[0]?.node
  return (
    <div className="aspect-square border border-black flex flex-col items-center justify-center text-center p-8">
      {/* Image */}
      <Link
        href={`/shop/${node.handle}`}
        className="block w-full max-w-[280px] mx-auto"
      >
        {img ? (
          <Image
            src={img.url}
            alt={img.altText || node.title}
            width={800}
            height={800}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">
            No Image
          </div>
        )}
      </Link>

      {/* Title */}
    <h3 className="mt-6 text-[12px] tracking-wide uppercase font-semibold leading-tight">
  {node.title}
</h3>

{/* Buy button (navigates to product page) */}
<div className="mt-3">
  <Link
    href={`/shop/${node.handle}`}
    className="text-[12px] uppercase font-medium tracking-wide text-[#2E8B57] hover:underline"
  >
    Buy
  </Link>
</div>
    </div>
  )
}

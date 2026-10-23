import { Metadata } from "next";

import { getProduct } from '@/lib/shopifyUtils';

type LayoutProps = {
  params: Promise<{ handle: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Product Not Found | Sample Chief",
      description: "The requested product could not be found.",
    };
  }

  return {
    // Set explicitly (rather than relying on the root layout's title
    // template) because app/shop/layout.tsx sets its own plain-string
    // title, which breaks template inheritance for nested shop routes.
    title: `${product.title} | Sample Chief`,
    description: product.description || `Shop ${product.title}`,
  };
}

export default function ProductLayout({ children }: LayoutProps) {
  return children;
}

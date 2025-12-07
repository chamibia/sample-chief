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
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
  };
}

export default function ProductLayout({ children }: LayoutProps) {
  return children;
}

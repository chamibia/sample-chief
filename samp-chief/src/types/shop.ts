// Shared types for shop/product functionality
export type ProductVariant = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantityAvailable: number;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
};

export type CartItem = {
  id: string;
  variantId: string;
  title: string;
  price: number;
  currencyCode: string;
  productHandle: string;
  image?: string;
  quantity: number;
  quantityAvailable?: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
};
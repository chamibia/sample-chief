"use client";

import Image from "next/image";
import { useEffect,useState } from "react";

import { useCart } from "@/components/CartProvider";

interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      images: {
        edges: Array<{
          node: {
            url: string;
            altText: string;
          };
        }>;
      };
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: CartItem;
    }>;
  };
}

export default function HeadlessCheckoutPage() {
  const { cart: localCart } = useCart();
  const [shopifyCart, setShopifyCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Create Shopify cart when component mounts
  useEffect(() => {
    createShopifyCart();
  }, []);

  const createShopifyCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/cart/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: localCart.items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create cart");
      }

      setShopifyCart(data.cart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create cart");
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (lineId: string, quantity: number) => {
    if (!shopifyCart) return;

    try {
      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: shopifyCart.id,
          action: "update",
          lines: [
            {
              id: lineId,
              quantity,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update cart");
      }

      setShopifyCart(data.cart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update cart");
    }
  };

  const removeCartItem = async (lineId: string) => {
    await updateCartItem(lineId, 0);
  };

  const handleCheckout = () => {
    if (shopifyCart?.checkoutUrl) {
      window.location.href = shopifyCart.checkoutUrl;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Creating your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={createShopifyCart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!shopifyCart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No cart found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {shopifyCart.lines.edges.map(({ node: item }) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <Image
                    src={item.merchandise.product.images.edges[0]?.node.url}
                    alt={item.merchandise.product.images.edges[0]?.node.altText}
                    className="w-16 h-16 object-cover rounded"
                    width={64}
                    height={64}
                    loading="lazy"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {item.merchandise.product.title}
                    </h3>
                    <p className="text-gray-600">{item.merchandise.title}</p>
                    <p className="text-gray-900 font-medium">
                      ${parseFloat(item.merchandise.price.amount)} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Total</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ${parseFloat(shopifyCart.cost.subtotalAmount.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>
                  ${parseFloat(shopifyCart.cost.totalTaxAmount.amount)}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    ${parseFloat(shopifyCart.cost.totalAmount.amount)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 mt-6"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

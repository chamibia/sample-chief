import { Cart,CartItem } from '@/types/shop';

// Shared utility for cart calculations
export const calculateCartTotals = (items: CartItem[]): { totalQuantity: number; totalPrice: number } => {
  return {
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
};

// Create a new cart with updated totals
export const updateCartTotals = (items: CartItem[]): Cart => {
  const totals = calculateCartTotals(items);
  return {
    items,
    ...totals,
  };
};

// Validate item availability before adding to cart
export const validateItemAvailability = (
  item: CartItem, 
  requestedQuantity: number = 1
): { isValid: boolean; message?: string } => {
  if (item.quantityAvailable !== undefined && item.quantityAvailable <= 0) {
    return { 
      isValid: false, 
      message: `Sorry, ${item.title} is out of stock.` 
    };
  }
  
  if (item.quantityAvailable !== undefined && requestedQuantity > item.quantityAvailable) {
    return { 
      isValid: false, 
      message: `Sorry, only ${item.quantityAvailable} ${item.title}(s) available.` 
    };
  }
  
  return { isValid: true };
};
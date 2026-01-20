import type { cartItem } from "../models/CartItem";
import { Product } from "../models/Product";

// localstorage
export const CART_KEY = "cart";

export const cart: cartItem[] = [];

export function cartLocalStorage() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function loadCartLocalStorage() {
  const storedCart = localStorage.getItem(CART_KEY);
  if (!storedCart) return;

  try {
    const storedCartItems = JSON.parse(storedCart) as Array<{
      product: {
        title: string;
        weight: string;
        info: string;
        price: string;
        heroimage: string;
        secondimage: string;
        thirdimage: string;
        fourthimage: string;
        carticon: string;
        productlink: string;
      };
      quantity: number;
    }>;

    cart.length = 0;

    storedCartItems.forEach((item) => {
      const product = new Product(
        item.product.title,
        item.product.weight,
        item.product.info,
        item.product.price,
        item.product.heroimage,
        item.product.secondimage,
        item.product.thirdimage,
        item.product.fourthimage,
        item.product.carticon,
        item.product.productlink,
      );

      cart.push({ product, quantity: item.quantity });
    });
  } catch {
    localStorage.removeItem(CART_KEY);
  }
}

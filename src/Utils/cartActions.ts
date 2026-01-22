import { Product } from "../models/Product";
import { cart, cartLocalStorage } from "./cartStorage";
import { renderCart, checkoutCart, openDrawer } from "./cartUi";

// Tömmer varukorgen
export function clearCart() {
  cart.length = 0;
  cartLocalStorage();
  renderCart();
  checkoutCart();
}

// Öka/minska antal i varukorgen/kassan
export function plusCart(index: number): void {
  if (index < 0) return;
  if (index >= cart.length) return;

  cart[index].quantity = cart[index].quantity + 1;
  cartLocalStorage();
  renderCart();
  checkoutCart();
}

export function minusCart(index: number): void {
  if (index < 0) return;
  if (index >= cart.length) return;

  cart[index].quantity = cart[index].quantity - 1;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  cartLocalStorage();
  renderCart();
  checkoutCart();
}

//lägger till i varukorgen +ökar om det är fler av samma
export function addToCart(product: Product) {
  const existing = cart.find(
    (item) =>
      item.product.title === product.title &&
      item.product.weight === product.weight,
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product: product, quantity: 1 });
  }
  renderCart();
  openDrawer();
  cartLocalStorage();
  checkoutCart();
}

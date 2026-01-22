import type { Product } from "../models/Product";
import { productInfo } from "./productDetails";

export const products = (product: Product, addToCart: (p: Product) => void) => {
  const container = document.getElementById("products");

  const card = document.createElement("div");
  card.className = "productCard";

  const img = document.createElement("img");
  img.src = product.heroimage;
  img.alt = "coffeImg";
  img.className = "productImg";

  img.addEventListener("click", () => {
    productInfo(product, addToCart);
  });

  const infoContainer = document.createElement("div");
  infoContainer.className = "infoContainer";

  const cartBtn = document.createElement("button");
  cartBtn.className = "cartBtn";
  cartBtn.addEventListener("click", () => {
    addToCart(product);
  });

  const icon = document.createElement("img");
  icon.src = product.carticon;
  icon.alt = "cartImg";
  icon.className = "icon";

  const productInfodiv = document.createElement("div");
  productInfodiv.className = "productInfo";

  const productTitle = document.createElement("p");
  productTitle.className = "coffeeTitle";
  productTitle.textContent = product.title;
  productTitle.style.whiteSpace = "pre-line";

  productTitle.addEventListener("click", () => {
    productInfo(product, addToCart);
  });

  const productPrice = document.createElement("p");
  productPrice.className = "coffeePrice";
  productPrice.textContent = product.price;

  cartBtn.appendChild(icon);
  productInfodiv.appendChild(productTitle);
  productInfodiv.appendChild(productPrice);

  infoContainer.appendChild(productInfodiv);
  infoContainer.appendChild(cartBtn);

  card.appendChild(img);
  card.appendChild(infoContainer);

  container?.appendChild(card);
};

import type { Product } from "../models/Product";

export const products = (
  product: Product,
  onAddToCart: (p: Product) => void
) => {
  const container = document.getElementById("products");

  const card = document.createElement("div");
  card.className = "productCard";

  const img = document.createElement("img");
  img.src = product.heroimage;
  img.alt = "coffeImg";
  img.className = "productImg";

  const infoContainer = document.createElement("div");
  infoContainer.className = "infoContainer";

  const cartBtn = document.createElement("button");
  cartBtn.className = "cartBtn";
  cartBtn.addEventListener("click", () => {
    onAddToCart(product);
  });

  const icon = document.createElement("img");
  icon.src = product.carticon;
  icon.alt = "cartImg";
  icon.className = "icon";

  const productInfo = document.createElement("div");
  productInfo.className = "productInfo";

  const productTitle = document.createElement("p");
  productTitle.className = "coffeeTitle";
  productTitle.textContent = product.title;
  productTitle.style.whiteSpace = "pre-line";

  const productPrice = document.createElement("p");
  productPrice.className = "coffeePrice";
  productPrice.textContent = product.price;

  cartBtn.appendChild(icon);
  productInfo.appendChild(productTitle);
  productInfo.appendChild(productPrice);

  infoContainer.appendChild(productInfo);
  infoContainer.appendChild(cartBtn);

  card.appendChild(img);
  card.appendChild(infoContainer);

  container?.appendChild(card);
};

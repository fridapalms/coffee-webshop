import type { Product } from "../models/Product";

export const showResult = (
  product: Product
  //   addToCart: (p: Product) => void
) => {
  const module = document.getElementById("searchResult");
  // skapa element
  const coffeeCard = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const infoContainer = document.createElement("div");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const weight = document.createElement("p");
  const cartBtn = document.createElement("button");
  const cartIcon = document.createElement("img");

  // Ändra element
  coffeeCard.className = "coffeeCard";
  imgContainer.className = "imgContainer";
  img.src = product.heroimage;
  img.alt = "Photo of " + product.title;
  infoContainer.className = "infoContainer";
  title.className = "title";
  price.className = "price";
  weight.className = "weight";
  cartBtn.className = "cartBtn";
  cartIcon.src = product.carticon;

  //Placera Element
  imgContainer.appendChild(img);
  infoContainer.appendChild(title);
  infoContainer.appendChild(weight);
  infoContainer.appendChild(price);
  cartBtn.appendChild(cartIcon);

  coffeeCard.appendChild(imgContainer);
  coffeeCard.appendChild(infoContainer);
  coffeeCard.appendChild(cartBtn);

  module?.appendChild(coffeeCard);
};

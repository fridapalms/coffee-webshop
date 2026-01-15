import type { Product } from "../models/Product";

export const showResult = (
  product: Product,
  addToCart: (p: Product) => void
) => {
  const searchContainer = document.getElementById("searchContainer");

  if (searchContainer) {
    searchContainer.style.visibility = "visible";
  }

  let module = document.getElementById("searchResult");
  if (!module) return;

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
  infoContainer.className = "detailsContainer";
  title.className = "title";
  title.innerHTML = product.title;
  price.className = "price";
  price.innerHTML = product.price;
  weight.className = "weight";
  weight.innerHTML = product.weight;
  cartBtn.className = "cartButton";
  cartBtn.addEventListener("click", () => {
    addToCart(product);
  });
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

export const searchNotFound = () => {
  const searchContainer = document.getElementById("searchContainer");

  if (searchContainer) {
    searchContainer.style.visibility = "visible";
  }

  let module = document.getElementById("searchResult");
  if (!module) return;

  const errorMessage = document.createElement("p");

  errorMessage.className = "errorMessage";
  errorMessage.innerHTML =
    "Hoppsan! Vi kunde inte hitta något som matchar din sökning.";

  module.appendChild(errorMessage);
};

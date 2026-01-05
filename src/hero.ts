export function products() {
  const container = document.getElementById("products");
  if (!container) return;

  const heroProducts = [
    { image: "./img/image4.png", icon: "./img/vector.png" },
    { image: "./img/image4.png", icon: "./img/vector.png" },
    { image: "./img/image4.png", icon: "./img/vector.png" },
    { image: "./img/image4.png", icon: "./img/vector.png" },
  ];

  container.innerHTML = "";

  for (let i = 0; i < heroProducts.length; i++) {
    const product = heroProducts[i];
    const card = document.createElement("div");
    card.className = "productCard";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = "Produkt.name";
    img.className = "productImg";

    const icon = document.createElement("img");
    icon.src = product.icon;
    icon.alt = "varukorg";
    icon.className = "icon";

    card.appendChild(img);
    card.appendChild(icon);

    container.appendChild(card);
  }
}

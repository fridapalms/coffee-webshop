export function products() {
  const container = document.getElementById("products");
  if (!container) return;

  const heroProducts = [
    { image: "/public/img/image 4.png", icon: "/public/img/vector.png" },
    { image: "/public/img/image 4.png", icon: "/public/img/vector.png" },
    { image: "/public/img/image 4.png", icon: "/public/img/vector.png" },
    { image: "/public/img/image 4.png", icon: "/public/img/vector.png" },
  ];

  container.innerHTML = "";

  for (let i = 0; i < heroProducts.length; i++) {
    const product = heroProducts[i];
    const card = document.createElement("div");
    card.className = "productCard";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = "Kaffe Bonor";
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

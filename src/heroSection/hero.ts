export function products() {
  const container = document.getElementById("products");
  if (!container) return;

  const heroProducts = [
    { image: "/public/img/image 4.png", icon: "/public/img/vector.png", name: "KAFFEBÖNOR\n299.00 kr" },
    { image: "/public/img/image 4.png", icon: "/public/img/vector.png", name: "KAFFEPETTERS\n299.00 kr" },
    { image: "/public/img/image 4.png", icon: "/public/img/vector.png", name: "KARLSSONS\n299.00 kr" },
    { image: "/public/img/image 4.png", icon: "/public/img/vector.png", name: "KOFFEBRODERNS\n299.00 kr" },
  ];

  container.innerHTML = "";

  for (let i = 0; i < heroProducts.length; i++) {
    const product = heroProducts[i];
    const card = document.createElement("div");
    card.className = "productCard";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = "coffeImg";
    img.className = "productImg";

    const icon = document.createElement("img");
    icon.src = product.icon;
    icon.alt = "varukorg";
    icon.className = "icon";

    const text = document.createElement("p");
    text.className = "coffeeText";
    text.textContent = product.name;
    text.style.whiteSpace = "pre-line";

    card.appendChild(img);
    card.appendChild(icon);
    card.appendChild(text);

    container.appendChild(card);
  }
}

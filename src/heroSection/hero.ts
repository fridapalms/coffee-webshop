export function products() {
  const container = document.getElementById("products");
  if (!container) return;

  const heroProducts = [
    {
      image: "/img/image 4.png",
      icon: "/public/img/vector.png",
      name: "KAFFEBÖNOR\n299.00 kr",
    },
    {
      image: "/img/image 4.png",
      icon: "/public/img/vector.png",
      name: "KAFFEPETTERS\n299.00 kr",
    },
    {
      image: "/img/image 4.png",
      icon: "/public/img/vector.png",
      name: "KARLSSONS\n299.00 kr",
    },
    {
      image: "/img/image 4.png",
      icon: "/public/img/vector.png",
      name: "KOFFEBRODERNS\n299.00 kr",
    },
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

    const infoContainer = document.createElement("div");
    infoContainer.className = "infoContainer";

    const iconContainer = document.createElement("button");
    iconContainer.className = "cartBtn";

    const icon = document.createElement("img");
    icon.src = product.icon;
    icon.alt = "cartImg";
    icon.className = "icon";

    const text = document.createElement("p");
    text.className = "coffeeText";
    text.textContent = product.name;
    text.style.whiteSpace = "pre-line";

    iconContainer.appendChild(icon);

    infoContainer.appendChild(text);
    infoContainer.appendChild(iconContainer);

    card.appendChild(img);
    card.appendChild(infoContainer);

    container.appendChild(card);
  }
}

export function productInfo() {
  const imgDivs = document.getElementsByClassName("imgdiv");
  // const textDivs = document.querySelectorAll<HTMLDivElement>(".textdiv");

  const productimg = [
    {
      num3: "/public/extra3.png",
      num2: "/public/extra2.png",
      num1: "/public/extra1.png",
      numhero: "/public/hero1.png",
      cart: "/public/img/vector.png",
    },
  ];

  for (let i = 0; i < imgDivs.length; i++) {
    const img = imgDivs[i] as HTMLDivElement;
    // const textInfo = textDivs[i] as HTMLDivElement; koppla!!!!

    img.addEventListener("click", () => {
      // create
      const productPage = document.createElement("div");
      const about = document.createElement("img");
      const about2 = document.createElement("img");
      const about3 = document.createElement("img");
      const about4 = document.createElement("img");

      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      const div4 = document.createElement("div");

      const productContainer = document.createElement("div");
      const productTitle = document.createElement("h2");
      const productText = document.createElement("p");

      const quantityContainer = document.createElement("div");
      const cartButton = document.createElement("button");
      const logo = document.createElement("img"); //img icon quantity
      const quantityInput = document.createElement("input"); //quantity input

      //add

      cartButton.type = "submit";
      cartButton.className = "cartbtn";

      logo.src = productimg[0].cart;
      logo.alt = "addtocart";
      logo.className = "cartimg";
      logo.id = "cartid";

      quantityInput.type = "number";
      quantityInput.value = "1";
      quantityInput.min = "1";
      quantityInput.id = "quantityProducts";
      quantityInput.readOnly = true;

      const smallContainer = document.createElement("div");
      const allWrapper = document.createElement("div");

      about.src = productimg[0].numhero;
      about4.src = productimg[0].num1;
      about3.src = productimg[0].num2;
      about2.src = productimg[0].num3;

      about.alt = "coffeeImg";
      about2.alt = "coffeeImg2";
      about3.alt = "coffeeImg3";
      about4.alt = "coffeeImg3";

      productContainer.className = "productContainer";
      quantityContainer.className = "quantityContainer";
      smallContainer.className = "small-container";
      allWrapper.className = "all-wrapper";
      div1.className = "div1";
      div2.className = "div2";
      div3.className = "div3";
      div4.className = "div4";

      about.className = "productImg";
      about2.className = "productImg2";
      about3.className = "productImg3";
      about4.className = "productImg4";
      productPage.className = "productPage";

      productTitle.textContent = "Karlssons Bönor";
      productText.textContent =
        "En len och fyllig smak som breder ut sig lugnt, med  tydliga toner av choklad och en behaglig rundhet i avslutet.";

      // append

      productContainer.appendChild(productTitle);
      productContainer.appendChild(productText);
      productPage.appendChild(productContainer);

      cartButton.appendChild(logo);
      quantityContainer.appendChild(quantityInput);
      quantityContainer.appendChild(cartButton);
      productPage.appendChild(quantityContainer);

      smallContainer.appendChild(div2);
      smallContainer.appendChild(div3);
      smallContainer.appendChild(div4);

      div1.appendChild(about);
      div2.appendChild(about2);
      div3.appendChild(about3);
      div4.appendChild(about4);

      productPage.appendChild(div1);
      productPage.appendChild(smallContainer);

      document.body.appendChild(productPage);
    });
  }
}

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
    const img = imgDivs[i] as HTMLDivElement; // klickbar bild
    // const textInfo = textDivs[i] as HTMLDivElement; koppla!!!!

    img.addEventListener("click", () => {
      // create
      const productPage = document.createElement("div");
      const bigImg = document.createElement("img");
      const imgSmallLeft = document.createElement("img");
      const imgSmallCenter = document.createElement("img");
      const imgSmallRight = document.createElement("img");

      const bigImgContainer = document.createElement("div");
      const smallImgLeft = document.createElement("div");
      const smallImgCenter = document.createElement("div");
      const smallImgRight = document.createElement("div");

      const productContainer = document.createElement("div");
      const productTitle = document.createElement("h2");
      const productText = document.createElement("p");

      const quantityContainer = document.createElement("div");
      const cartButton = document.createElement("button");
      const logo = document.createElement("img"); //img icon quantity
      const quantityInput = document.createElement("input"); //quantity input
      // content wrapp
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "contentWrapper";

      //add

      cartButton.type = "submit";
      cartButton.className = "cartbtn";

      bigImg.src = productimg[0].numhero;
      imgSmallRight.src = productimg[0].num1;
      imgSmallCenter.src = productimg[0].num2;
      imgSmallLeft.src = productimg[0].num3;
      logo.src = productimg[0].cart;

      bigImg.alt = "coffeeImg";
      imgSmallLeft.alt = "coffeeImg2";
      imgSmallCenter.alt = "coffeeImg3";
      imgSmallRight.alt = "coffeeImg4";
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

      productContainer.className = "productContainer";
      quantityContainer.className = "quantityContainer";
      smallContainer.className = "small-container";
      allWrapper.className = "all-wrapper";
      bigImgContainer.className = "bigImgContainer";

      smallImgLeft.className = "smallImgLeft";
      smallImgCenter.className = "smallImgCenter";
      smallImgRight.className = "smallImgRight";

      bigImg.className = "bigImg";
      imgSmallLeft.className = "imgSmallLeft";
      imgSmallCenter.className = "imgSmallCenter";
      imgSmallLeft.className = "imgSmallLeft";
      productPage.className = "productPage";

      productTitle.textContent = "Karlssons Bönor";
      productText.textContent =
        "En len och fyllig smak som breder ut sig lugnt, med  tydliga toner av choklad och en behaglig rundhet i avslutet.";

      // append

      // lägg quantityContainer här ↓
      productContainer.appendChild(quantityContainer);

      //
      productContainer.appendChild(productTitle);
      productContainer.appendChild(productText);
      // productPage.appendChild(productContainer);

      cartButton.appendChild(logo);
      quantityContainer.appendChild(quantityInput);
      quantityContainer.appendChild(cartButton);

      smallContainer.appendChild(smallImgLeft);
      smallContainer.appendChild(smallImgCenter);
      smallContainer.appendChild(smallImgRight);

      bigImgContainer.appendChild(bigImg);
      smallImgLeft.appendChild(imgSmallLeft);
      smallImgCenter.appendChild(imgSmallCenter);
      smallImgRight.appendChild(imgSmallRight);

      contentWrapper.appendChild(bigImgContainer);
      contentWrapper.appendChild(productContainer);
      contentWrapper.appendChild(smallContainer);
      productPage.appendChild(contentWrapper);

      document.body.appendChild(productPage);
    });
  }
}

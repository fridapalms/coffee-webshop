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
      // create element
      const productPage = document.createElement("div");
      const contentWrapper = document.createElement("div");

      const bigImg = document.createElement("img");
      const leftImg = document.createElement("img");
      const centerImg = document.createElement("img");
      const rightImg = document.createElement("img");

      const bigImgContainer = document.createElement("div");
      const smallImgLeftBox = document.createElement("div");
      const smallImgCenterBox = document.createElement("div");
      const smallImgRightBox = document.createElement("div");

      const productContainer = document.createElement("div");
      const productTitle = document.createElement("h2");
      const productText = document.createElement("p");

      const quantityContainer = document.createElement("div");
      const cartButton = document.createElement("button");
      const carts = document.createElement("img");
      const quantityInput = document.createElement("input");

      contentWrapper.className = "contentWrapper";
      const smallContainer = document.createElement("div");
      const allWrapper = document.createElement("div");

      const bigImgBox = document.createElement("div");
      const textContainer = document.createElement("div");

      //add

      cartButton.type = "submit";
      cartButton.className = "cartbtn";

      bigImg.src = productimg[0].numhero;
      leftImg.src = productimg[0].num1;
      rightImg.src = productimg[0].num2;
      centerImg.src = productimg[0].num3;
      carts.src = productimg[0].cart;

      bigImg.alt = "coffeeImg";
      leftImg.alt = "coffeeImg2";
      centerImg.alt = "coffeeImg3";
      rightImg.alt = "coffeeImg4";
      carts.alt = "addtocart";

      carts.className = "cartimg";
      carts.id = "cartid";

      quantityInput.type = "number";
      quantityInput.value = "1";
      quantityInput.min = "1";
      quantityInput.id = "quantityProducts";
      quantityInput.readOnly = true;

      textContainer.className = "textContainer";
      bigImgBox.className = "bigImgBox";
      productContainer.className = "productContainer";
      quantityContainer.className = "quantityContainer";
      smallContainer.className = "small-container";
      allWrapper.className = "all-wrapper";
      bigImgContainer.className = "bigImgContainer";

      smallImgLeftBox.className = "smallImgLeftBox";
      smallImgCenterBox.className = "smallImgCenterBox";
      smallImgRightBox.className = "smallImgRightBox";

      bigImg.className = "bigImg";
      leftImg.className = "leftImg";
      centerImg.className = "canterImg";
      rightImg.className = "rightImg";
      productPage.className = "productPage";

      productTitle.textContent = "Karlssons Bönor";
      productText.innerHTML =
        "En len och fyllig smak som breder ut sig lugnt, med  tydliga toner av choklad och en behaglig rundhet i avslutet.<br><strong>Pris:</strong><span class='price'>2 290 kr</span>";

      // append
      // left column
      bigImgBox.appendChild(bigImg);
      bigImgContainer.appendChild(bigImgBox);

      smallImgLeftBox.appendChild(leftImg);
      smallImgCenterBox.appendChild(centerImg);
      smallImgRightBox.appendChild(rightImg);

      smallContainer.appendChild(smallImgLeftBox);
      smallContainer.appendChild(smallImgCenterBox);
      smallContainer.appendChild(smallImgRightBox);

      bigImgContainer.appendChild(smallContainer);

      //  right column
      textContainer.appendChild(productTitle);
      textContainer.appendChild(productText);
      productContainer.appendChild(textContainer);

      cartButton.appendChild(carts);
      quantityContainer.appendChild(quantityInput);
      quantityContainer.appendChild(cartButton);
      productContainer.appendChild(quantityContainer);

      // content containers
      contentWrapper.appendChild(bigImgContainer);
      contentWrapper.appendChild(productContainer);

      // product page
      productPage.appendChild(contentWrapper);
      document.body.appendChild(productPage);
    });
  }
}

import { products } from "../heroSection/hero";
import type { Product } from "../models/Product";

const imgDivs = document.getElementsByClassName("imgdiv");
const textDivs = document.getElementsByClassName("textdiv");
const productContent = products;

for (let i = 0; i < productContent.length; i++) {
  const product = productContent[i];

  (imgDivs[i] as HTMLElement).addEventListener("click", () => {
    productInfo(product);
  });

  (textDivs[i] as HTMLElement).addEventListener("click", () => {
    productInfo(product);
  });
}

export function productInfo(product: Product) {
  //const imgDivs = document.getElementsByClassName("imgdiv");
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

  // create HTML
  //for (let i = 0; i < imgDivs.length; i++) {
  // const img = imgDivs[i] as HTMLDivElement;
  //const product = products[i];
  // const textInfo = textDivs[i] as HTMLDivElement; koppla!!!!

  //img.addEventListener("click", () => {
  //page + allcontent
  const productPage = document.createElement("div");
  const contentWrapper = document.createElement("div");

  //images
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

  const smallContainer = document.createElement("div");
  const allWrapper = document.createElement("div");

  const bigImgBox = document.createElement("div");
  const textContainer = document.createElement("div");

  bigImgBox.innerHTML = "";
  //add

  //bigImg.src = productimg[0].numhero; KOPPLA
  leftImg.src = productimg[0].num1;
  rightImg.src = productimg[0].num2;
  centerImg.src = productimg[0].num3;
  carts.src = productimg[0].cart;

  bigImg.alt = "coffeeImg";
  leftImg.alt = "coffeeImg2";
  centerImg.alt = "coffeeImg3";
  rightImg.alt = "coffeeImg4";
  carts.alt = "addtocart";

  cartButton.type = "submit";
  quantityInput.type = "number";
  quantityInput.value = "1";
  quantityInput.min = "1";

  //quantityInput.readOnly = true;

  quantityInput.id = "quantityProducts";
  carts.id = "cartid";

  cartButton.className = "cartbtn";
  carts.className = "cartimg";
  contentWrapper.className = "contentWrapper";
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

  productTitle.textContent = product.title;
  productText.innerHTML = `
        En len och fyllig smak som breder ut sig lugnt, med  tydliga toner av choklad och en behaglig rundhet i avslutet.<br><strong>Pris:</strong><span class='price'>${product.price}</span>`;

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

  //closebutton

  //button close page
  closeButton(productPage);
  document.body.appendChild(productPage);
  // });

  function closeButton(productPage: HTMLElement) {
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.className = "closeButton";

    closeBtn.addEventListener("click", () => {
      productPage.remove();
    });
    productPage.appendChild(closeBtn);
  }
}

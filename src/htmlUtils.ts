import { Product } from "./models/Product";
import { productInfo } from "./productInfo/productDetails";

//Funktion createHtml
export const createHtml = (product: Product, onAddToCart: (p: Product) => void) => {
  const productsdiv = document.getElementById("allproducts");

  //Skapa element
  const productcard = document.createElement("div");
  const imgdiv = document.createElement("div");
  const img = document.createElement("img");
  const infodiv = document.createElement("div");
  const textdiv = document.createElement("div");
  const producttitle = document.createElement("h3");
  const productprice = document.createElement("h4");
  const cartbtn = document.createElement("button");
  const cartimg = document.createElement("img");

  //Ändra element
  productcard.className = "productcard";
  imgdiv.className = "imgdiv";
  img.src = product.heroimage;
  infodiv.className = "infodiv";
  textdiv.className = "textdiv";
  producttitle.className = "producttitle";
  producttitle.innerHTML = product.title;
  productprice.className = "productprice";
  productprice.innerHTML = product.price;
  cartbtn.className = "cartbtn";
  cartimg.className = "cartimg";
  cartimg.src = product.carticon;

  //productinfo
  producttitle.addEventListener("click", () => {
    productInfo(product);
  });

  //productImg.addEventListener("click", () => {
  // productInfo(product);
  //});

  //productPrice.addEventListener("click", () => {
  // productInfo(product);
  //});

  cartbtn.addEventListener("click", () => {
    onAddToCart(product);
  });

  //Placera element
  imgdiv.appendChild(img);
  cartbtn.appendChild(cartimg);
  infodiv.appendChild(textdiv);
  infodiv.appendChild(cartbtn);
  textdiv.appendChild(producttitle);
  textdiv.appendChild(productprice);
  productcard.appendChild(imgdiv);
  productcard.appendChild(infodiv);
  productsdiv?.appendChild(productcard);
};

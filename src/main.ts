import { createHtml } from "./htmlUtils";
import { Product } from "./models/Product";
import "./scss/style.scss";
import "./scss/productstyle.scss";

//-------  products.html - start -------
//
//Skapar alla de 12 produkterna
const product1: Product = new Product("Kaffepetters", "250g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "299kr", "/hero2.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product2: Product = new Product("Kaffebönan", "250g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "199kr", "/hero1.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product3: Product = new Product("Koffebroderns", "250g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "229kr", "/hero4.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product4: Product = new Product("Kaffebönan", "500g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "399kr", "/hero1.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product5: Product = new Product("Karlssons", "250g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "249kr", "/hero3.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product6: Product = new Product("Kaffebönan", "250g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "199kr", "/hero1.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product7: Product = new Product("Kaffepetters", "500g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "589kr", "/hero2.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product8: Product = new Product("Kaffebönan", "500g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "399kr", "/hero1.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product9: Product = new Product("Koffebroderns", "500g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "429kr", "/hero4.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product10: Product = new Product("Kaffebönan", "500g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "399kr", "/hero1.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product11: Product = new Product("Karlssons", "500g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "499kr", "/hero3.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");
const product12: Product = new Product("Kaffebönan", "500g", "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.", "399kr", "/hero1.png", "/extra1.png", "/extra2.png", "/extra3.png", "/cart.svg", "#");

//Listan med alla 12 produkter
const allproducts: Product[] = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12];

//Loopa genom listan allproducts, skapar HTML för varje produkt
allproducts.forEach((product) => {
  const productsdiv = document.getElementById("allproducts");

  if (productsdiv) {
    createHtml(product);
  }
});

//-------  products.html - slut -------
//
//

const cartBtn = document.querySelector(".cart");
const overlay = document.getElementById("cartOverlay");
const closeBtn = document.querySelector(".close");

if (cartBtn && overlay && closeBtn) {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("open");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.classList.remove("open");
    }
  });
}

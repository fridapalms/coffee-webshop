import { createHtml } from "./htmlUtils";
import { Product } from "./models/Product";
import "./scss/style.scss";
import "./scss/_products.scss";
import { cookiePopUp } from "./Utils/cooikeUtils";

//Cookie
cookiePopUp();

// Sparar produkt och antal i varukorgen
type cartItem = { product: Product; quantity: number };
const cart: cartItem[] = [];

function stackPrice(price: string): number {
  return Number(price.replace("kr", ""));
}

// uppdaterar innehållet i varukorgen
function renderCart() {
  const drawer = document.querySelector(".drawer") as HTMLElement | null;
  if (!drawer) return;
  const p = drawer.querySelector("p") as HTMLParagraphElement | null;
  if (!p) return;

  let list = drawer.querySelector(".cart-list") as HTMLDivElement | null;
  if (!list) {
    list = document.createElement("div");
    list.className = "cart-list";
    drawer.appendChild(list);
  }

  // Döljer kassa knappen när varukorgen är tom
if (cart.length === 0) {
    p.textContent = "Din varukorg är tom";
    list.innerHTML = "";
    const checkoutBtn = drawer.querySelector(".checkout-btn");
  checkoutBtn?.remove();
  return;
  }

  p.textContent = "";
  list.innerHTML = "";

  // loopar igenom varukorgen och bygger HTML
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const row = document.createElement("div");
    row.className = "cart-item";

    const img = document.createElement("img");
    img.className = "cart-item-image";
    img.src = item.product.heroimage;
    img.alt = item.product.title;

    const text = document.createElement("div");
    text.className = "cart-item-text";
    const unitPrice = stackPrice(item.product.price);
    const totalPrice = unitPrice * item.quantity;
    text.textContent = `${item.product.title} x${item.quantity} (${totalPrice} kr)`;

    row.appendChild(img);
    row.appendChild(text);
    list.appendChild(row);
  }

// gå till kassan knappen i varukorgen
let checkoutBtn = drawer.querySelector(".checkout-btn") as HTMLButtonElement | null;

if (!checkoutBtn) {
  checkoutBtn = document.createElement("button");
  checkoutBtn.className = "checkout-btn";
  checkoutBtn.textContent = "Gå till kassan"

  checkoutBtn.addEventListener("click", () => {
    window.location.href = "shop.html";
  });
  drawer.appendChild(checkoutBtn);
}

}

// öppnar varukorgen
function openDrawer() {
  const overlay = document.getElementById("cartOverlay");
  overlay?.classList.add("open");
}

//lägger till i varukorgen +ökar om det är fler av samma
function addToCart(product: Product) {
  const existing = cart.find((item) => item.product.title === product.title && item.product.weight === product.weight);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product: product, quantity: 1 });
  }
  renderCart();
  openDrawer();
}

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
    createHtml(product, addToCart);
  }
});

//-------  products.html - end -------
//
//

// öppna och stänga varukorgen
const cartBtn = document.querySelector(".cart");
const overlay = document.getElementById("cartOverlay");
const closeBtn = document.querySelector(".close");

if (cartBtn && overlay && closeBtn) {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.classList.add("open");
    renderCart();
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

renderCart();

//------ shop.html - start -----
//
//Lyssna efter klick på Bekräfta köp -> Öppna/stång orderbekräftelse popup
const buybtn = document.getElementById("buybtn");

buybtn?.addEventListener("click", async () => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  modal.innerHTML = "";

  if (modal) {
    const modaldiv = document.createElement("div");
    modaldiv.className = "modaldiv";
    const confirmation = document.createElement("p");
    confirmation.className = "confirmation";
    confirmation.innerHTML = "Vi har mottagit din order!<br />Orderbekräftelse skickas via mail.";
    const closepopup = document.createElement("button");
    closepopup.className = "closepopup";
    closepopup.innerHTML = "Stäng fönster";
    modaldiv.appendChild(confirmation);
    modaldiv.appendChild(closepopup);
    modal.appendChild(modaldiv);

    closepopup.addEventListener("click", async () => {
      modal.close();
    });

    modal.showModal();
  }
});

//Tömmer formuläret efter klick
const form = document.getElementById("buyform") as HTMLFormElement;

buybtn?.addEventListener("click", () => {
  form.reset();
  //Kanske lägga till här att varukorgslistan töms då varorna är köpta?
});
//------ shop.html - end -----

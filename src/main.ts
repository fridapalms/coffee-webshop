import { createHtml } from "./htmlUtils";
import { Product } from "./models/Product";
import "./scss/style.scss";
import "./scss/_products.scss";
import { cookiePopUp } from "./Utils/cooike";
import { products } from "./heroSection/hero";
import { searchNotFound, showResult } from "./Utils/showResult";

import { productInfo } from "./productInfo/productDetails";

//Cookie
cookiePopUp();

// Sparar produkt och antal i varukorgen
type cartItem = { product: Product; quantity: number };
const cart: cartItem[] = [];

// localstorage
const CART_KEY = "cart";

function cartLocalStorage() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadCartLocalStorage() {
  const storedCart = localStorage.getItem(CART_KEY);
  if (!storedCart) return;

  try {
    const storedCartItems = JSON.parse(storedCart) as Array<{
      product: {
        title: string;
        weight: string;
        info: string;
        price: string;
        heroimage: string;
        secondimage: string;
        thirdimage: string;
        fourthimage: string;
        carticon: string;
        productlink: string;
      };
      quantity: number;
    }>;

    cart.length = 0;

    storedCartItems.forEach((item) => {
      const product = new Product(
        item.product.title,
        item.product.weight,
        item.product.info,
        item.product.price,
        item.product.heroimage,
        item.product.secondimage,
        item.product.thirdimage,
        item.product.fourthimage,
        item.product.carticon,
        item.product.productlink
      );

      cart.push({ product, quantity: item.quantity });
    });
  } catch {
    localStorage.removeItem(CART_KEY);
  }
}

loadCartLocalStorage();

function stackPrice(price: string): number {
  return Number(price.replace("kr", ""));
}

// Tömmer varukorgen
function clearCart() {
  cart.length = 0;
  cartLocalStorage();
  renderCart();
  checkoutCart();
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

  // Totalpris varukorgen
  let totalSumCart = drawer.querySelector(".cart-total") as HTMLDivElement | null;
  if (!totalSumCart) {
    totalSumCart = document.createElement("div");
    totalSumCart.className = "cart-total";
    drawer.appendChild(totalSumCart);
  }

  // Döljer kassa knappen när varukorgen är tom
  if (cart.length === 0) {
    p.textContent = "Din varukorg är tom";
    list.innerHTML = "";
    totalSumCart.textContent = "";
    const checkoutBtn = drawer.querySelector(".checkout-btn");
    checkoutBtn?.remove();
    const clearBtn = drawer.querySelector(".clear-btn");
    clearBtn?.remove();
    cartLocalStorage();
    return;
  }

  p.textContent = "";
  list.innerHTML = "";
  let cartTotal = 0;

  // loopar igenom varukorgen och bygger HTML
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const row = document.createElement("div");
    row.className = "cart-item";

    const img = document.createElement("img");
    img.className = "cart-item-image";
    img.src = item.product.heroimage;
    img.alt = item.product.title;

    // Totalpris kassan
    const text = document.createElement("div");
    text.className = "cart-item-text";
    const unitPrice = stackPrice(item.product.price);
    const totalPrice = unitPrice * item.quantity;
    cartTotal += totalPrice;
    text.textContent = `${item.product.title} x${item.quantity} (${totalPrice} kr)`;

    row.appendChild(img);
    row.appendChild(text);
    list.appendChild(row);
  }

  totalSumCart.textContent = `Totalpris: ${cartTotal} kr`;

  // gå till kassan knappen i varukorgen
  let checkoutBtn = drawer.querySelector(".checkout-btn") as HTMLButtonElement | null;

  if (!checkoutBtn) {
    checkoutBtn = document.createElement("button");
    checkoutBtn.className = "checkout-btn";
    checkoutBtn.textContent = "Gå till kassan";

    checkoutBtn.addEventListener("click", () => {
      cartLocalStorage();
      window.location.href = "shop.html";
    });
    drawer.appendChild(checkoutBtn);
  }

  // tömmer varukorgen knappen
  let clearBtn = drawer.querySelector(".clear-btn") as HTMLButtonElement | null;
  if (!clearBtn) {
    clearBtn = document.createElement("button");
    clearBtn.className = "clear-btn";
    clearBtn.textContent = "Töm varukorgen";
    clearBtn.addEventListener("click", clearCart);
    drawer.appendChild(clearBtn);
  }
}

// rendera varukorgen på shop-sidan
function checkoutCart() {
  const basket = document.querySelector(".basket-display") as HTMLDivElement | null;
  const sumCart = document.querySelector(".sum") as HTMLElement | null;

  if (!basket || !sumCart) return;

  if (cart.length === 0) {
    basket.textContent = "Din varukorg är tom.";
    sumCart.textContent = "Summa: 0 kr";
    return;
  }
  basket.innerHTML = "";
  let totalSum = 0;

  cart.forEach((item) => {
    const unitPrice = stackPrice(item.product.price);
    const itemTotal = unitPrice * item.quantity;
    totalSum += itemTotal;

    const row = document.createElement("div");
    row.className = "checkout-item";

    const img = document.createElement("img");
    img.src = item.product.heroimage;
    img.alt = item.product.title;
    img.className = "checkout-item-image";
    row.appendChild(img);

    const text = document.createElement("div");
    text.textContent = `${item.product.title} (${item.product.weight}) x${item.quantity} - ${itemTotal} kr`;
    row.appendChild(text);
    basket.appendChild(row);
  });
  sumCart.textContent = `Totalpris: ${totalSum} kr`;
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
  cartLocalStorage();
}

//-------  products.html - start -------
//
//Skapar alla de 12 produkterna
const product1: Product = new Product(
  "Kaffepetters",
  "250g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "299kr",
  "/hero2.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product2: Product = new Product(
  "Kaffekonrads",
  "250g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "199kr",
  "/hero1.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product3: Product = new Product(
  "Koffebroderns",
  "250g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "229kr",
  "/hero4.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product4: Product = new Product(
  "Kaffekonrads",
  "500g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "399kr",
  "/hero1.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product5: Product = new Product(
  "Karlssons",
  "250g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "249kr",
  "/hero3.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product6: Product = new Product(
  "Kaffebönan",
  "250g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "199kr",
  "/hero1.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product7: Product = new Product(
  "Kaffepetters",
  "500g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "589kr",
  "/hero2.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product8: Product = new Product(
  "Kaffebönan",
  "500g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "399kr",
  "/hero1.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product9: Product = new Product(
  "Koffebroderns",
  "500g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "429kr",
  "/hero4.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product10: Product = new Product(
  "Kaffebönan",
  "500g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "399kr",
  "/hero1.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product11: Product = new Product(
  "Karlssons",
  "500g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "499kr",
  "/hero3.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);
const product12: Product = new Product(
  "Kaffebönan",
  "500g",
  "En len och fyllig smak som breder ut sig lugnt, med tydliga tonern av choklad och en behaglig rundhet i avslutet.",
  "399kr",
  "/hero1.png",
  "/extra1.png",
  "/extra2.png",
  "/extra3.png",
  "/cart.svg",
  "#"
);

//Listan med alla 12 produkter
const allproducts: Product[] = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
  product11,
  product12,
];

//skapar en lista med 4 produkter utifrån allproducts
//loopar igenom listan skapar html för produkterna i nya listan

const popularProducts = allproducts.slice(0, 4);
popularProducts.forEach((product) => {
  const popularContainer = document.getElementById("products");

  if (popularContainer) {
    products(product, addToCart);
  }
});

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
checkoutCart();

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
    confirmation.innerHTML =
      "Vi har mottagit din order!<br />Orderbekräftelse skickas via mail.<br />Ordernummer: 0000";
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
  clearCart();
  //Kanske lägga till här att varukorgslistan töms då varorna är köpta?
});
//------ shop.html - end -----

//Sök bland produkter
document.getElementById("searchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchOverlay = document.getElementById("searchOverlay");
  const searchResult = document.getElementById("searchResult");
  const searchContainer = document.getElementById("searchContainer");
  const theInput = document.getElementById("searchInput") as HTMLInputElement;
  if (!theInput) return;

  if (searchOverlay && searchResult && searchContainer) {
    searchResult.innerHTML = "";
    searchOverlay.classList.add("open");
    searchOverlay.addEventListener("click", () => {
      searchOverlay.classList.remove("open");
      searchContainer.style.visibility = "hidden";
      theInput.value = "";
    });
  }

  let search = theInput.value.trim();
  let found = false;

  allproducts.forEach((product) => {
    if (product.title.toLowerCase().includes(search.toLowerCase())) {
      found = true;
      showResult(product, addToCart);
      console.log(product);
    }
  });
  if (!found) {
    searchNotFound();
    console.log("ERRRORORORO!");
  }
});

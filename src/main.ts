import { createHtml } from "./Utils/htmlUtils";
import { Product } from "./models/Product";
import "./scss/style.scss";
import { cookiePopUp } from "./Utils/cooike";
import { products } from "./heroSection/hero";
import { searchNotFound, showResult } from "./Utils/showResult";
import { stackPrice } from "./Utils/stackPrice";
import {
  cart,
  cartLocalStorage,
  loadCartLocalStorage,
} from "./Utils/cartStorage";

//import { productInfo } from "./productInfo/productDetails";

cookiePopUp();

loadCartLocalStorage();

// Tömmer varukorgen
function clearCart() {
  cart.length = 0;
  cartLocalStorage();
  renderCart();
  checkoutCart();
}

// Öka/minska antal i varukorgen/kassan
function plusCart(index: number): void {
  if (index < 0) return;
  if (index >= cart.length) return;

  cart[index].quantity = cart[index].quantity + 1;
  cartLocalStorage();
  renderCart();
  checkoutCart();
}

function minusCart(index: number): void {
  if (index < 0) return;
  if (index >= cart.length) return;

  cart[index].quantity = cart[index].quantity - 1;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
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
  let totalSumCart = drawer.querySelector(
    ".cart-total",
  ) as HTMLDivElement | null;
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

    // Totalpris varukorgen
    const text = document.createElement("div");
    text.className = "cart-item-text";
    const unitPrice = stackPrice(item.product.price);
    const totalPrice = unitPrice * item.quantity;
    cartTotal += totalPrice;

    // minus plus knapp - Varukorgen
    const titel = document.createElement("div");
    titel.textContent = `${item.product.title} (${totalPrice} kr)`;

    // minus knapp
    const controls = document.createElement("div");
    const minusBtn = document.createElement("button");
    minusBtn.className = "minus-Btn";
    minusBtn.textContent = "-";
    minusBtn.addEventListener("click", () => {
      minusCart(i);
    });

    const itemQuantity = document.createElement("span");
    itemQuantity.className = "item-Quantity";
    itemQuantity.textContent = String(item.quantity);

    // plus knapp
    const plusBtn = document.createElement("button");
    plusBtn.className = "plus-Btn";
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => {
      plusCart(i);
    });

    controls.appendChild(minusBtn);
    controls.appendChild(itemQuantity);
    controls.appendChild(plusBtn);
    text.appendChild(titel);
    text.appendChild(controls);

    row.appendChild(img);
    row.appendChild(text);
    list.appendChild(row);
  }

  totalSumCart.textContent = `Totalpris: ${cartTotal} kr`;

  // gå till kassan knappen i varukorgen
  let checkoutBtn = drawer.querySelector(
    ".checkout-btn",
  ) as HTMLButtonElement | null;

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
  const basket = document.querySelector(
    ".basket-display",
  ) as HTMLDivElement | null;
  const sumCart = document.querySelector(".sum") as HTMLElement | null;

  if (!basket || !sumCart) return;

  if (cart.length === 0) {
    basket.textContent = "Din varukorg är tom.";
    sumCart.textContent = "Summa: 0 kr";
    return;
  }
  basket.innerHTML = "";
  let totalSum = 0;

  cart.forEach((item, i) => {
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

    // minus plus knapp - Kassan
    const titel = document.createElement("div");
    titel.className = "titel-checkout";
    titel.textContent = `${item.product.title} (${item.product.weight}) - ${itemTotal} kr`;

    // minus knapp
    const text = document.createElement("div");
    const controls = document.createElement("div");
    const minusBtn = document.createElement("button");
    minusBtn.className = "minus-Btn";
    minusBtn.textContent = "-";
    minusBtn.addEventListener("click", () => {
      minusCart(i);
    });

    const itemQuantity = document.createElement("span");
    itemQuantity.className = "item-Quantity";
    itemQuantity.textContent = String(item.quantity);

    // plus knapp
    const plusBtn = document.createElement("button");
    plusBtn.className = "plus-Btn";
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => {
      plusCart(i);
    });

    controls.appendChild(minusBtn);
    controls.appendChild(itemQuantity);
    controls.appendChild(plusBtn);
    text.appendChild(titel);
    text.appendChild(controls);
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
  const existing = cart.find(
    (item) =>
      item.product.title === product.title &&
      item.product.weight === product.weight,
  );

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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
  "#",
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
    const indexlink = document.createElement("a");
    indexlink.href = "index.html";
    indexlink.className = "linkreset";
    const closepopup = document.createElement("button");
    closepopup.className = "closepopup";
    closepopup.innerHTML = "Stäng fönster";
    modaldiv.appendChild(confirmation);
    modaldiv.appendChild(indexlink);
    indexlink.appendChild(closepopup);
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

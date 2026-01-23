import { createHtml } from "./Utils/htmlUtils";
import "./scss/style.scss";
import { cookiePopUp } from "./Utils/cooike";
import { products } from "./Utils/hero";
import { searchNotFound, showResult } from "./Utils/showResult";
import { addToCart, clearCart } from "./Utils/cartActions";
import { allproducts, popularProducts } from "./data/productData";
import "./Utils/cartDOM";

//Cookie
cookiePopUp();

// ---- products.html ------
//
//Loopa genom listan allproducts, skapar HTML för varje produkt
allproducts.forEach((product) => {
  const productsdiv = document.getElementById("allproducts");

  if (productsdiv) {
    createHtml(product, addToCart);
  }
});

// ---- index.html - hero section -----
//
//loopar igenom listan popularProducts, skapar HTML för varje produkt
popularProducts.forEach((product) => {
  const popularContainer = document.getElementById("products");

  if (popularContainer) {
    products(product, addToCart);
  }
});
//
//

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
    }
  });
  if (!found) {
    searchNotFound();
  }
});

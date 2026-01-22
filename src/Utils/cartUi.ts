import { cart, cartLocalStorage } from "./cartStorage";
import { stackPrice } from "./stackPrice";
import { clearCart, minusCart, plusCart } from "./cartActions";


// uppdaterar innehållet i varukorgen
export function renderCart() {
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
      renderCart();
      checkoutCart();
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
      renderCart();
      checkoutCart();
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
export function checkoutCart() {
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
      renderCart();
      checkoutCart();
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
      renderCart();
      checkoutCart();
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
export function openDrawer() {
  const overlay = document.getElementById("cartOverlay");
  overlay?.classList.add("open");
}
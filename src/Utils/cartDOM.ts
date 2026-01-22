import { loadCartLocalStorage } from "./cartStorage";
import { renderCart, checkoutCart, openDrawer } from "./cartUi";

loadCartLocalStorage();

// öppna och stänga varukorgen
const cartBtn = document.querySelector(".cart");
const overlay = document.getElementById("cartOverlay");
const closeBtn = document.querySelector(".close");

if (cartBtn && overlay && closeBtn) {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    renderCart();
    openDrawer();
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
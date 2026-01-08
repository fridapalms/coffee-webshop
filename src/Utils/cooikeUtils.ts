export const cookiePopUp = () => {
  const cookieBox = document.getElementById("cookiePopUp");
  const buttons = document.querySelectorAll(".acceptBtn, .declineBtn");

  if (!cookieBox) return;

  // om cookie finns sprat visas inte cookie pop up
  if (document.cookie.includes("cookies")) {
    cookieBox.style.display = "none";
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      cookieBox?.remove();

      if (btn.className === "acceptBtn") {
        document.cookie =
          // cookie expiration date 1 hour
          "chocolateChip=cookies; max-age=" + 60 * 60 + ";path=/";
      }
    });
  });
};

export function productInfo() {
  const imgDivs = document.getElementsByClassName("imgdiv");
  const textDivs = document.querySelectorAll<HTMLDivElement>(".textdiv");

  for (let i = 0; i < imgDivs.length; i++) {
    const img = imgDivs[i] as HTMLDivElement;
    const textInfo = textDivs[i] as HTMLDivElement;

    img.addEventListener("click", () => {
      alert("Du klickade på bilden!");
    });

    textInfo.addEventListener("click", () => {
      alert("Du klickade på texten!");
    });
  }
}

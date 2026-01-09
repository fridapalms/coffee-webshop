export function productInfo() {
  const imgDivs = document.getElementsByClassName("imgdiv");
  const textDivs = document.querySelectorAll<HTMLDivElement>(".textdiv");

  const productimg = [
    {
      num3: "/public/extra3.png",
      num2: "/public/extra2.png",
      num1: "/public/extra1.png",
      numhero: "/public/hero1.png",
    },
  ];

  for (let i = 0; i < imgDivs.length; i++) {
    const img = imgDivs[i] as HTMLDivElement;
    const textInfo = textDivs[i] as HTMLDivElement;

    img.addEventListener("click", () => {
      // create
      const productPage = document.createElement("div");
      const about = document.createElement("img");
      const about2 = document.createElement("img");
      const about3 = document.createElement("img");
      const about4 = document.createElement("img");
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      const div4 = document.createElement("div");
      const smallContainer = document.createElement("div");
      const allWrapper = document.createElement("div");

      about.src = productimg[0].numhero;
      about4.src = productimg[0].num1;
      about3.src = productimg[0].num2;
      about2.src = productimg[0].num3;

      about.alt = "coffeeImg";
      about2.alt = "coffeeImg2";
      about3.alt = "coffeeImg3";
      about4.alt = "coffeeImg3";

      smallContainer.className = "small-container";
      allWrapper.className = "all-wrapper";
      div1.className = "div1";
      div2.className = "div2";
      div3.className = "div3";
      div4.className = "div4";

      about.className = "productImg";
      about2.className = "productImg2";
      about3.className = "productImg3";
      about4.className = "productImg4";
      productPage.className = "productPage";

      // append

      smallContainer.appendChild(div2);
      smallContainer.appendChild(div3);
      smallContainer.appendChild(div4);

      div1.appendChild(about);
      div2.appendChild(about2);
      div3.appendChild(about3);
      div4.appendChild(about4);
      productPage.appendChild(div1);
      productPage.appendChild(smallContainer);

      document.body.appendChild(productPage);
    });
  }
}

//Type för en produkt

export class Product {
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

  constructor(title: string, weight: string, info: string, price: string, heroimage: string, secondimage: string, thirdimage: string, fourthimage: string, carticon: string, productlink: string) {
    this.title = title;
    this.weight = weight;
    this.info = info;
    this.price = price;
    this.heroimage = heroimage;
    this.secondimage = secondimage;
    this.thirdimage = thirdimage;
    this.fourthimage = fourthimage;
    this.carticon = carticon;
    this.productlink = productlink;
  }
}

export function stackPrice(price: string): number {
  return Number(price.replace("kr", ""));
}

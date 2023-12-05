declare module "colorthief" {
  type Color = [number, number, number];
  class ColorThiefStatic {
    getColor(img: string): Promise<Color>;
    getPalette(img: string): Promise<Color[]>;
  }

  const ColorThief: ColorThiefStatic;
  export default ColorThief;
}

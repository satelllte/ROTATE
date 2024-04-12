import {ROTATE_Manager} from './ROTATE_Manager';

export class ROTATE_Font {
  public image: HTMLImageElement;
  public colorOffset: number;
  public lineHeight: number | undefined = undefined;
  public chars: FontCharItem[] | undefined = undefined;

  constructor(
    imageSrc: string,
    dataSrc: string,
    scale: number = 1,
    colorOffset: number = 0,
  ) {
    this.image = ROTATE_Manager.loadImage(imageSrc);
    this.colorOffset = colorOffset;
    ROTATE_Manager.loadTextFile(dataSrc, (textRaw) => {
      var fontDataObject = JSON.parse(textRaw) as FontDataObject; // TODO: handle error
      this.lineHeight = fontDataObject.l * scale;
      var fontDataObjectC = fontDataObject.c;
      this.chars = [];
      for (var m = 0; m < fontDataObjectC.length; ) {
        var k = fontDataObjectC[m];
        ++m;
        k.x *= scale;
        k.y *= scale;
        k.w *= scale;
        k.h *= scale;
        k.xo *= scale;
        k.yo *= scale;
        k.xa *= scale;
        this.chars[k.c] = k;
      }
    });
  }
}

type FontCharItem = {
  c: number;
  x: number;
  y: number;
  w: number;
  h: number;
  xo: number;
  yo: number;
  xa: number;
};

type FontDataObject = {
  l: number; // lineHeight
  c: FontCharItem[]; // chars
};

function rgb2hsv(r: number, g: number, b: number) {
  // normalize r,g,b to range 0..1
  (r /= 255), (g /= 255), (b /= 255);
  //calculate min and max of r,b,g
  const Cmin = Math.min(r, g, b),
    Cmax = Math.max(r, g, b);
  //initialize h and s and set v = maximum Value if r,g,b
  let h,
    s = 0;
  const v = Cmax;
  //calculate diff of Cmax and Cmin
  const d = Cmax - Cmin;
  //set h according based on values of Cmax and diff
  if (d === 0) {
    h = 0;
  } else {
    switch (Cmax) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        throw new Error("error while converting rgb to hsv");
    }
    h /= 6;
  }
  //set s based on value of Cmax
  s = Cmax === 0 ? 0 : d / Cmax;
  return [h, s, v];
}

export function toTuyaColor(color: string) {
  let val;
  //split the string into pieces of 2 and put them in the rgb array
  const rgb = color.match(/.{1,2}/g);

  if (!rgb) throw new Error("input color not in valid format");

  //convert the rgb value to a hsv value
  const hsv = rgb2hsv(
    parseInt(rgb[0], 16),
    parseInt(rgb[1], 16),
    parseInt(rgb[2], 16)
  );

  if (hsv.length !== 3) throw new Error("error occurred converting rgb to hsv");

  let hexvalue = "";
  //start to create the hex string by putting the rgb values in
  for (val in rgb) {
    hexvalue += ("00" + rgb[val]).slice(-2);
  }

  const hsvArray = [hsv[0]! * 360, hsv[1]! * 255, hsv[2]! * 255];

  let hexValueHSV = "";
  //construct a array of the hex values of h, s and v
  for (val in hsvArray) {
    const num = parseInt(val) > 0 ? 2 : 3;
    const str = parseInt(val) > 0 ? "00" : "000";
    hexValueHSV += (str + hsvArray[val].toString(16)).slice(-num);
  }
  //concat the hsv array with a leading zero to the rgb hex array and make sure all is lower case
  hexvalue = (hexvalue + ("00000000" + hexValueHSV).slice(-8)).toLowerCase();
  return hexvalue;
}

export enum LightbulbProperty {
  Power = 1,
  ColorMode,
  Brightness,
  Intensity,
  Color,
}

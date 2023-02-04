import * as convert from "color-convert";

// crée un tableau vide.
const colors = [];

export function generatePalette(hex) {
  const [h, s] = convert.hex.hsl(hex);

  const tab = [];

  for (let i = 0; i <= 100; i += 10) {
    tab.push([h, s, i]);
  }
  return tab;
}

export function shadow(input) {
  const [h, s, l] = convert.hex.hsl(input);

  return `${h}deg ${s}% ${l}%`;
}

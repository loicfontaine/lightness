import { generatePalette, shadow } from "./modules/utils";
import { Color } from "./modules/Color";
import * as convert from "/node_modules/color-convert";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const form = document.querySelector("form");
const input = document.querySelector("input");
const parent = document.querySelector("main");
const header = document.querySelector("header");
const body = document.querySelector("body");
const notyf = new Notyf();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  try {
    if (!/^#[0-9A-F]{6}$/i.test(input.value)) {
      throw new Error(`${input.value} is not a valid Hexadecimal color.`);
    } else {
      displayColors(input.value);
    }
  } catch (err) {
    notyf.error(err.message);
  }
});

function displayColors(input) {
  const palette = generatePalette(input);
  console.log(palette);
  palette.forEach((element) => {
    new Color(element).display(parent);
  });

  header.classList.add("minimized");
  //parent.innerHTML = "";

  body.style.background = `linear-gradient(-45deg, ${getBackground(
    palette
  ).join(",")})`;
  body.style.backgroundSize = `400% 400%`;
  document.documentElement.style.setProperty("--shadow-color", shadow(input));
}

function getBackground(palette) {
  const colorBG = [0, Math.round(palette.length / 2), palette.length - 1].map(
    (index) => `#${convert.hsl.hex(palette[index])}`
  );
  console.log(colorBG);
  return colorBG;
}

parent.addEventListener("click", async function (e) {
  const color = e.target.closest(".color").dataset.color;
  try {
    await navigator.clipboard.writeText(color);
  } catch (error) {
    notyf.error(error);
  }
  notyf.success(`copied ${color} to clipboard`);
});

import * as convert from "color-convert";

export class Color {
  #hsl;
  #hex;
  #element;
  constructor(tabHSL) {
    this.#hsl = tabHSL;
    this.#hex = `${convert.hsl.hex(tabHSL)}`;
    this.#element = this.#generateElement();

    return this;
  }

  #generateElement() {
    let textColor;
    if (this.#hsl[2] < 60) {
      textColor = "255, 255, 255";
    } else {
      textColor = "0, 0, 0";
    }

    return `<div class="color" data-color="#${
      this.#hex
    }" style="background-color: #${this.#hex}">
<p style="color: rgb(${textColor})">#${this.#hex}</p>
</div>`;
  }

  display(parentElement) {
    parentElement.insertAdjacentHTML("afterbegin", this.#element);
  }
}

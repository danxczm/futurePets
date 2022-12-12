const generateBtn = document.querySelector(".generate");
const colorDivs = document.querySelectorAll(".color");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
let initialColors;

//events list
sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

const generateHex = (_) => chroma.random();

(function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    //add the color
    div.style.backgroundColor = generateHex();
    hexText.innerText = generateHex();
    //change the text color
    checkTextColor(generateHex(), hexText);
    //colorize sliders
    const color = generateHex();
    const sliders = div.querySelectorAll(".sliders input");
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSliders(color, hue, brightness, saturation);
  });
})();

function checkTextColor(color, text) {
  const brightness = chroma(color).luminance();
  brightness > 0.5
    ? (text.style.color = "black")
    : (text.style.color = "white");
}

function colorizeSliders(color, hue, brightness, saturation) {
  //saturation
  const lowSat = color.set("hsl.s", 0);
  const maxSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([lowSat, color, maxSat]);
  //srightness
  const midBright = color.set("hsl.l", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  //update colors
  saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(
    0
  )}, ${scaleSat(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(
    0
  )},${scaleBright(0.5)} ,${scaleBright(1)})`;

  //hue
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;
}

function hslControls(e) {
  const index =
    e.target.getAttribute("data-bright") ||
    e.target.getAttribute("data-sat") ||
    e.target.getAttribute("data-hue");

  let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];
  const bgColor = colorDivs[index].querySelector("h2").innerText;
  let color = chroma(bgColor)
    .set("hsl.s", saturation.value)
    .set("hsl.l", brightness.value)
    .set("hsl.h", hue.value);
  colorDivs[index].style.backgroundColor = color;
}

/* generate random color:
	const letters = "0123456789ABCDEF";
  let hash = "#";

  for (let i = 0; i < 6; i++) {
  hash += letters[Math.floor(Math.random() * 16)];
  }
	*/

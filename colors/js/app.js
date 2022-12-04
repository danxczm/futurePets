const refs = {
  generateBtn: document.querySelector(".generate"),
  colorDivs: document.querySelectorAll(".color"),
  sliders: document.querySelectorAll('.input[type="range"]'),
  currentHexes: document.querySelectorAll(".color h2"),
};
let initialColors;
const generateHex = _ => chroma.random();

function randomColor() {
	refs.colorDivs.forEach((div, index) => {
		const hexText = div.children[0];
		// const randomColor = generateHex();
		div.style.backgroundColor = generateHex();
		hexText.innerText = generateHex();
	})
}

randomColor()

/* generate random color:
	const letters = "0123456789ABCDEF";
  let hash = "#";

  for (let i = 0; i < 6; i++) {
  hash += letters[Math.floor(Math.random() * 16)];
  }
	*/


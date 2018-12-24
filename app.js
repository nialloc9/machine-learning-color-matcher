const canvas = document.getElementById("canvas");
const input = document.getElementById("color-picker");

const network = new brain.NeuralNetwork();

const trainingData = [
  { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { dark: 1 } },
  { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { light: 1 } },
  { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { light: 1 } },
  { input: { r: 1, g: 1, b: 0.17 }, output: { light: 1 } }
];

network.train(trainingData);

/**
 * @description converts hex to rgb
 * @param {string} hex
 * @returns {*} rgb
 */
function getRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
        g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
        b: Math.round(parseInt(result[3], 16) / 2.55) / 100
      }
    : null;
}

/**
 * @description handles a change event
 * @param {*} event
 * @returns {void}
 */
function onChange(event) {
  const hexColor = event.target.value;

  const rgb = getRgb(hexColor);

  const result = brain.likely(rgb, network);
  console.log(rgb, result);
  canvas.style.backgroundColor = hexColor;
  canvas.innerText = hexColor;
  canvas.style.color = result === "dark" ? "white" : "black";
}

input.addEventListener("change", onChange);

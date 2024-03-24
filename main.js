const etchASketch = document.querySelector("#etch-a-sketch");
const promptSizeButton = document.querySelector("#prompt-size-button")
const DARKEN_STEP_CONT = 10;
let size = 16;

promptSizeButton.addEventListener('click', () => {
  do {
    if (size > 100 || size < 10) {
      alert("Choose grid size between 10 and 100");
    }
    size = prompt("Grid size:");
  }
  while (size > 100 || size < 10)

  clearEtchASketch();
  fillEtchASketch(size);
});

fillEtchASketch(size);


function fillEtchASketch(size) {  
  pixelPercentSize = 100 / size - 0.2;
  pixelPercentMargin = 0.1;

  for (let i = 0; i < size * size; i++) {
    const pixelSketch = document.createElement('div');
    pixelSketch.style.width = pixelPercentSize + '%';
    pixelSketch.style.height = pixelPercentSize + '%';
    pixelSketch.style.margin = pixelPercentMargin + '%';

    pixelSketch.addEventListener('mouseenter', colorPixel);

    etchASketch.appendChild(pixelSketch);
  }
}

function getRandomColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

function colorPixel(event) {
  const pixel = event.target;

  if (!pixel.getAttribute('scratched')) {
    pixel.style.backgroundColor = getRandomColor();
    pixel.setAttribute('scratched', true);

    // Get rid of 'rgb()' and turn into array
    colorRGBValues = pixel.style.backgroundColor.slice(4, -1).split(', ');
    let red = +colorRGBValues[0];
    let green = +colorRGBValues[1];
    let blue = +colorRGBValues[2];

    pixel.setAttribute('redStep', - red / DARKEN_STEP_CONT);
    pixel.setAttribute('greenStep', - green / DARKEN_STEP_CONT);
    pixel.setAttribute('blueStep', - blue / DARKEN_STEP_CONT);
    return;
  }

  if (pixel.getAttribute('scratched') && !pixel.getAttribute('black')) {
    console.log('darken')
    colorRGBValues = pixel.style.backgroundColor.slice(4, -1).split(', ');
    let red = +colorRGBValues[0];
    let green = +colorRGBValues[1];
    let blue = +colorRGBValues[2];

    red += +pixel.getAttribute('redStep');
    green += +pixel.getAttribute('greenStep');
    blue += +pixel.getAttribute('blueStep');

    console.log(red);
    pixel.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    if (red === 0 && blue === 0 && green === 0) {
      pixel.setAttribute('black', 'true');
    }
  }
}

function clearEtchASketch() {
  while (etchASketch.firstChild) {
    etchASketch.removeChild(etchASketch.lastChild);
  }
}
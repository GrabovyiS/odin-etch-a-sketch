const etchASketch = document.querySelector("#etch-a-sketch");
const promptSizeButton = document.querySelector("#prompt-size-button")
let size = 16;
promptSizeButton.addEventListener('click', () => {
  do {
    if (size > 100 || size < 10) {
      alert("Choose grid size between 10 and 100");
    }
    size = prompt("Grid size:");
  }
  while (size > 100 || size < 10)

  fillEtchASketch(size);
});

fillEtchASketch(size);


function fillEtchASketch(size) {
  while (etchASketch.firstChild) {
    etchASketch.removeChild(etchASketch.lastChild);
  }
  
  pixelPercentSize = 100 / size - 0.2;
  pixelPercentMargin = 0.1;

  for (let i = 0; i < size * size; i++) {
    const pixelSketch = document.createElement('div');
    pixelSketch.style.width = pixelPercentSize + '%';
    pixelSketch.style.height = pixelPercentSize + '%';
    pixelSketch.style.margin = pixelPercentMargin + '%';

    pixelSketch.addEventListener('mouseenter', () => {
      pixelSketch.classList.add('scratched')
    });
    etchASketch.appendChild(pixelSketch);
  }
}
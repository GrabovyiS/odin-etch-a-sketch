const etchASketch = document.querySelector("#etch-a-sketch");
const SIZE = 16;

function fillEtchASketch() {
  for (let i = 0; i < SIZE*SIZE; i++) {
    const pixelSketch = document.createElement('div');
    pixelSketch.classList.add('sixteenth');
    pixelSketch.addEventListener('mouseenter', () => {
      pixelSketch.classList.add('scratched')
    });
    etchASketch.appendChild(pixelSketch);
  }
}

fillEtchASketch();
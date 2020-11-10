const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    }

    image.src = url;
  });
}

loadImage('human.png').then(img => {
  console.log(img);

  for (let x = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      ctx.drawImage(img, x*7, y*10, 10, 10);
    }
  }

});

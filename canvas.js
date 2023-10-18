const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

c.beginPath();
c.moveTo(0, canvas.height / 2);
for (let i =0; i < canvas.width; i++) {
  c.lineTo(canvas.width, canvas.height / 2);
}

c.stroke();
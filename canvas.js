

const canvas = document.querySelector('canvas');
const  c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

addEventListener('mousemove', function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
  init();
});

function drawCircle() {
  c.fillStyle = 'red';
  c.beginPath();
  c.arc(100, 100, 50, 0, Math.PI * 2);
  c.fill();
}

drawCircle();




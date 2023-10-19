

const canvas = document.querySelector('canvas');
const  c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

addEventListener('mousemove', function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
  
});

addEventListener('click', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  
});

addEventListener('resize', function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
  init();
});

function drawCircle() {
  c.fillStyle = 'red';
  c.beginPath();
  c.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  c.fill();
}


class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // random between 1 and 6
    this.size = Math.random() * 5 + 1;
    // move away from mouse
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
}


function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}




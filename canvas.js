

const canvas = document.querySelector('canvas');
const  c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};
const particleArray = [];


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
});



class Particle {
  constructor() {
    // this.x = mouse.x;
    // this.y = mouse.y;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // random between 1 and 6
    this.size = Math.random() * 5 + 1;
    // move away from mouse
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    c.fillStyle = 'red';
    c.beginPath();
    c.arc(this.x, this.y, 50, 0, Math.PI * 2);
    c.fill();
  }
  }
function init() {
  for (let i = 0; i < 100; i++) {
    particleArray.push(new Particle());
  }
}
init();

function handleParticle(){
  for(let i = 0; i < particleArray.length; i++){
    particleArray[i].update();
    particleArray[i].draw();
  }
}
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(animate);
}
animate();





const canvas = document.querySelector('canvas');
const  c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

addEventListener("mousemove", function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
  init();
});

class Object {
  constructor (x, y, radius, color){ 
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
  } 

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}
// Implementation
let object;
function init() {
  object = [];

  for (let i = 0; i < 190; i++) {

  }

}


function animate() {
	requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillText('canvas', mouse.x, mouse.y)

    particles.forEach(particle => {
      particle.update();
  });
}
init(); 
animate();
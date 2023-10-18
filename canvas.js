

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

class Particle {
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
  update(){
    this.draw();
  }
}


// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 190; i++) {
    particles.push(new Particle( canvas.width / 2, canvas.height / 2, 5, 'blue'))
  }

}


function animate() {
	requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.draw();
  });
}
init(); 
animate();
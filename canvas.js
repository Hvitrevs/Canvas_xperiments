

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
  constructor (x, y, radius, color, velocity) { 
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
  this.velocity = velocity;
  } 

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
  update() {
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}


// Implementation
let particles

function init() {
  particles = [];
  const radius = 130

  for (let i = 0; i < 30; i++) {
    // if full circle = pi * 2 radians
    const radian = (Math.PI * 2) / 30;
    const x = canvas.width  / 2;
    const y = canvas.height / 2;
    particles.push(
      new Particle( x, y , 5, 'blue', {
      x: Math.cos(radian * i),
      y: Math.sin(radian * i)
      })
    )
  };

}

function generateRing() {
  setTimeout(generateRing, 1000)
  for (let i = 0; i < 30; i++) {
    // if full circle = pi * 2 radians
    const radian = (Math.PI * 2) / 30;
    const x = canvas.width  / 2;
    const y = canvas.height / 2;
    particles.push(
      new Particle( x, y , 5, 'blue', {
      x: Math.cos(radian * i),
      y: Math.sin(radian * i)
      })
    )
  };
}

function animate() {
	requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
  });
}
init(); 
animate();


// const x = canvas.width  / 2 + Math.cos(radian * i) *  radius;
// const y = canvas.height / 2 + Math.sin(radian * i) * radius;
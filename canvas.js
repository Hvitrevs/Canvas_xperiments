

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

});



class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;

    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;

  }

  update(){

  }

  draw() {

  }
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}


animate();



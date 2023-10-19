

const canvas = document.querySelector('canvas');
const  c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};
const particleArray = [];
let hue = 0;

addEventListener('mousemove', function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
  for(let i = 0; i < 10; i++){
    particleArray.push(new Particle());
  }  
});

addEventListener('click', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for(let i = 0; i < 10; i++){
    particleArray.push(new Particle());
  }
  
  
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


    // random between 1 and 16
    this.size = Math.random() * 16 + 1;
    // move away from mouse
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    c.fill();
  }
}


function handleParticle(){
  for(let i = 0; i < particleArray.length; i++){
    particleArray[i].update();
    particleArray[i].draw();

    // creating constellation connects for particles

    for (let j = i; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        c.beginPath();
        c.strokeStyle = particleArray[i].color;
        c.lineWidth = 0.5;
        c.moveTo(particleArray[i].x, particleArray[i].y);
        c.lineTo(particleArray[j].x, particleArray[j].y);
        c.stroke();
      }
    }

    if (particleArray[i].size <= 0.3){
      particleArray.splice(i, 1);
      i--;
    }
  }
}


function animate() {
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'rgba(0, 0, 0, 0.2)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  hue+=1;
  requestAnimationFrame(animate);
}


animate();



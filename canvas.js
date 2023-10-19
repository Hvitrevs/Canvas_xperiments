

const canvas = document.querySelector('canvas');
const  c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(c);


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
  const effect = new Effect(canvas);
effect.handleParticles(c);

});



class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = 10;
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);


    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;

  }

  update(){

  }

  draw(context) {
    context.fillStyle = 'hsl('+ this.x * 0.5 + ', 100%, 50%)';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }
}
class Effect {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 200;
    this.createParticles();
  }
  createParticles(){
    for(let i =0; i < this.numberOfParticles; i++){
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context){
    this.particles.forEach(particle => {
      particle.draw(context);
    })
  }
}
const effect = new Effect(canvas);
effect.handleParticles(c);

function animate() {
  // c.clearRect(0, 0, canvas.width, canvas.height);
  // requestAnimationFrame(animate);
}


animate();



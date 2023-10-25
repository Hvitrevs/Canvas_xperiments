
const canvas = document.querySelector('canvas');
const  c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


addEventListener('resize', function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

});

window.onresize = function() {
  location.reload();
}

const mouse = {
	x: undefined,
	y: undefined
};

const gradient = c.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'hsla(329, 78.50%, 87.30%, 0.71)');
gradient.addColorStop(0.5, 'hsla(295, 57.70%, 62.90%, 0.40)');
gradient.addColorStop(1, 'hsla(251, 100.00%, 91.20%, 0.60)');
c.fillStyle = gradient;
c.strokeStyle = gradient;


class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 5 + 1);
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = -this.radius + Math.random() * this.effect.height * 0.5;
    this.vx =  Math.random() * 0.5 - 0.1;
    this.vy = 0;
    this.gravity = this.radius * 0.001;

    this.friction = Math.random() * 0.5 + 0.4;

  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
  update(){
    this.vy += this.gravity;
    this.x +=  this.vx;
    this.y += this.vy;

    if( this.y > this.effect.height - this.radius){
      this.reset();
    }

  }
  reset(){
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = -this.radius + Math.random() * this.effect.height * 0.5;
    this.vy = 0;
  }

}

class Effect {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 450;
    this.createParticles();
    this.debug = true;

    // particle pusharound
    this.mouse = {
      x: 0,
      y:0,
      pressed: false,
      radius: 220
    }
    window.addEventListener('resise', e=> {
      this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
    });

    window.addEventListener('mousemove', e => {
      if (this.mouse.reseed){
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }
    });
    window.addEventListener('mouseup', e => {
      this.mouse.pressed = false;

    });
    window.addEventListener('mousedown', e => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;

    });

  }


  createParticles(){
    for(let i =0; i < this.numberOfParticles; i++){
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context){
    this.connectParticles(context);
    this.particles.forEach(particle => {
      
      particle.draw(context);
      particle.update();
    });
    
  }

  connectParticles(context){
    const maxDistance = 60;
    for (let a = 0; a< this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          context.save();
          const opacity = 1 - (distance/maxDistance);
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    const gradient = c.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'hsla(329, 78.50%, 87.30%, 0.71)');
    gradient.addColorStop(0.5, 'hsla(295, 57.70%, 62.90%, 0.40)');
    gradient.addColorStop(1, 'hsla(251, 100.00%, 91.20%, 0.60)');
    this.context.fillStyle = gradient;
    this.context.strokeStyle = gradient;
    this.particles.forEach(particle => {
      particle.reset();
    });
  }

}

const effect = new Effect(canvas, c);


function animate() {

  c.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(c);
  requestAnimationFrame(animate);
}


animate();



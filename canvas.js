
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
gradient.addColorStop(0, 'hsla(329, 88.70%, 72.40%, 0.71)');
gradient.addColorStop(0.5, 'hsla(295, 61.60%, 29.60%, 0.40)');
gradient.addColorStop(1, 'hsla(251, 100.00%, 91.20%, 0.60)');
c.fillStyle = gradient;
c.strokeStyle = gradient;


class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 7 + 1);
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = - Math.random() * this.effect.height * 0.5;
    this.vx =  Math.random() * 0.5 - 0.1;
    this.vy = 0;
    this.gravity = this.radius * 0.001;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.friction = Math.random() * 0.5 + 0.4;
    this.color = 'white';

  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    if (this.effect.debug){
      context.fillStyle = this.color;
      context.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
  }
  update(){
    this.vy += this.gravity;
    this.x +=  this.vx;
    this.y += this.vy;

    if( this.y > this.effect.height + this.radius + this.effect.maxDistance || this.x < -this.radius - this.effect.maxDistance || this.x > this.effect.width + this.radius + this.effect.maxDistance){
      this.reset();
    }

    // collision
    if (
      this.x - this.radius < this.effect.element.x + this.effect.element.width &&
      this.x - this.radius + this.width > this.effect.element.x &&
      this.y < this.effect.element.y + this.effect.element.height &&
      this.height + this.y > this.effect.element.y 
    ) {
      this.color = 'red';

    } else {
      this.color = 'blue';
    }
  }


  reset(){
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = -this.radius - this.effect.maxDistance - Math.random() * this.effect.height * 0.2;
    this.vy = 0;
  }

}

class Effect {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 550;
    this.createParticles();
    this.debug = true;
    this.element = document.getElementById('hh1').getBoundingClientRect();
    console.log(this.element);

    // particle pusharound
    this.mouse = {
      x: 0,
      y:0,
      pressed: false,
      radius: 220
    }

    window.addEventListener('keydown', e => {
      if (e.key === 'd'){
        this.debug = !this.debug;
        
      }
    })
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
    for(let i = 0; i < this.numberOfParticles; i++){
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context){
    this.connectParticles(context);
    this.particles.forEach(particle => {
      
      particle.draw(context);
      particle.update();
    });
    if (this.debug){
      context.strokeRect(this.element.x, this.element.y, this.element.width, this.element.height);
    }
    
  }

  connectParticles(context){
    this.maxDistance = 150;
    for (let a = 0; a< this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < this.maxDistance) {
          context.save();
          const opacity = 1 - (distance/this.maxDistance);
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


// animate();




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
gradient.addColorStop(0, 'hsla(178, 77.50%, 63.30%, 0.89)');
gradient.addColorStop(0.5, 'hsl(216, 66.10%, 49.80%)');
gradient.addColorStop(1, 'hsl(166, 70.90%, 49.80%)');
c.fillStyle = gradient;
c.strokeStyle = gradient;


class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 5 + 1);
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx =  Math.random() * 0.5 - 0.1;
    this.vy = Math.random() * 0.1  - 0.01;
    this.pushX = 0;
    this.pushY = 0;
    this.friction = Math.random() * 0.5 + 0.4;

  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
  update(){

    if (this.effect.mouse.pressed){
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = (this.effect.mouse.radius / distance);
      if (distance < this.effect.mouse.radius){
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;

      }

    }
    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    if (this.x < this.radius){
      this.x = this.radius;
      this.vx *= -1;
    } else if( this.x > this.effect.width - this.radius){
      this.x = this.effect.width - this.radius;
      this.vx *= -1;
    }
    if (this.y < this.radius){
      this.y = this.radius;
      this.vy *= -1;
    } else if( this.y > this.effect.height - this.radius){
      this.y = this.effect.height - this.radius;
      this.vy *= -1;
    }

  }
  reset(){
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this. y = this.radius + Math.random() * ( this.effect.height - this.radius * 2);
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
    })

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
    gradient.addColorStop(0, 'hsla(178, 77.50%, 63.30%, 0.89)');
    gradient.addColorStop(0.5, 'hsl(216, 66.10%, 49.80%)');
    gradient.addColorStop(1, 'hsl(166, 70.90%, 49.80%)');
    this.context.fillStyle = gradient;
    this.context.strokeStyle = gradient;
    this.particles.forEach(particle => {
      particle.reset();
    });
  }

}

const effect = new Effect(canvas);


function animate() {

  c.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(c);
  requestAnimationFrame(animate);
}


// animate();



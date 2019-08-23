class astro{
  constructor(id,m,x,y,vx,vy,c,density){
    this.x = x;
    this.y = y;
    this.mass = m*density;
    this.vx = vx;
    this.vy = vy;
    this.d = Math.sqrt(m)
    this.ax = 0;
    this.ay = 0;
    this.id = id;
    this.c = c;
  }

  show(){
    strokeWeight(0);
    fill(this.c);
    circle(this.x,this.y,this.d);
  }

  move(){
    //first order Euler integration
    this.x += this.vx;
    this.y += this.vy;
    this.vx += this.ax;
    this.vy += this.ay;
  }

  leapfrog1(){
    //second order leapfrog integration - first part
    this.vx += this.ax/2;
    this.vy += this.ay/2;
    this.x += this.vx;
    this.y += this.vy;
  }
  leapfrog2(){
    //second order leapfrog integration - second part
    this.vx += this.ax/2;
    this.vy += this.ay/2;
  }
  updateA(vect){
    let fx = 0;
    let fy = 0;
    for (var i = 0; i < vect.length; i++) {
      if (vect[i].id != this.id){
        let r2 = (vect[i].x - this.x)*(vect[i].x - this.x)+(vect[i].y - this.y)*(vect[i].y - this.y);
        //set limit to the attraction between near objects
        if (r2< (vect[i].d+this.d)*(vect[i].d+this.d) ) {
          r2 = (vect[i].d+this.d)*(vect[i].d+this.d);
        }
        let r3 = Math.pow(r2,3/2);
        fx +=  G *vect[i].mass * this.mass * (vect[i].x-this.x) / r3;
        fy +=  G *vect[i].mass * this.mass * (vect[i].y-this.y) / r3;
      }
    }
    this.ax = fx/this.mass;
    this.ay = fy/this.mass;
  }

}

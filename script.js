const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

const BALLS = [];

let LEFT, RIGHT, UP, DOWN;
let friction = 0.1;

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtr(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mag(){
        return Math.sqrt(this.x**2, this.y**2);
    }

    mul(n){
        return new Vector(this.x*n, this.y*n);
    }

    drawVec(start_x, start_y, n, color){
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x*n, start_y + this.y*n);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }
}
class Ball{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.vel = new Vector(0,0);
        this.acc = new Vector(0,0);
        this.acceleration=1;
        this.player = false;
        BALLS.push(this);
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
    }

    display(){
        this.vel.drawVec(this.x, this.y, 10, "green");
        this.acc.drawVec(this.x, this.y, 100, "blue");

    }
}

function keyControl(b){
        canvas.addEventListener('keydown', function(e){
        if(e.keyCode === 38){
            //up
            UP = true;
        }

        if(e.keyCode === 40){
            //down
            DOWN = true;
        }

        if(e.keyCode === 37){
            //left
            LEFT = true;
        }

        if(e.keyCode === 39){
            //right
            RIGHT = true;
        }
    });

    canvas.addEventListener('keyup', function(e){
        if(e.keyCode === 38){
            //up
            UP = false;
        }

        if(e.keyCode === 40){
            //down
            DOWN = false;
        }

        if(e.keyCode === 37){
            //left
            LEFT = false;
        }

        if(e.keyCode === 39){
            //right
            RIGHT = false;
        }
    });

        if(UP){
            b.acc.y = -b.acceleration;
        }

        if(DOWN){
            b.acc.y = b.acceleration;
        }

        if(LEFT){
            b.acc.x = -b.acceleration;
        }

        if(RIGHT){
            b.acc.x = b.acceleration;
        }

        if((!UP) && (!DOWN)){
            b.acc.y = 0;
        }

        if((!LEFT) && (!RIGHT)){
            b.acc.x = 0;
        }

        b.vel = b.vel.add(b.acc);
        b.vel = b.vel.mul(1-friction);
          
        b.x += b.vel.x;
        b.y += b.vel.y;
}

function mainLoop(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    BALLS.forEach((b) => {
        b.drawBall();
        if(b.player){
            keyControl(b);
        }
        b.display();
    });
    
    requestAnimationFrame(mainLoop);
}

let b1 = new Ball(200, 200, 50);
b1.player = true;

requestAnimationFrame(mainLoop);

resizeCanvas();

window.addEventListener("resize", () => {
    resizeCanvas();
});
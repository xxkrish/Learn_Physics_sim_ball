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

class Ball{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.vel_x = 0;
        this.vel_y = 0;
        this.acc_x=0;
        this.acc_y=0;
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
            b.acc_y = -b.acceleration;
        }

        if(DOWN){
            b.acc_y = b.acceleration;
        }

        if(LEFT){
            b.acc_x = -b.acceleration;
        }

        if(RIGHT){
            b.acc_x = b.acceleration;
        }

        if((!UP) && (!DOWN)){
            b.acc_y = 0;
        }

        if((!LEFT) && (!RIGHT)){
            b.acc_x = 0;
        }

        b.vel_x += b.acc_x;
        b.vel_y += b.acc_y;

        b.x += b.vel_x;
        b.y += b.vel_y;
}

function mainLoop(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    BALLS.forEach((b) => {
        b.drawBall();
        if(b.player){
            keyControl(b);
        }
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
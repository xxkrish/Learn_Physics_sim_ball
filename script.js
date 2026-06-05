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
        this.velocity = 15;
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
            b.y -= b1.velocity;
        }

        if(DOWN){
            b.y += b.velocity;
        }

        if(LEFT){
            b.x -= b.velocity;
        }

        if(RIGHT){
            b.x += b.velocity;
        }
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
drawBall(x, y, r);

window.addEventListener("resize", () => {
    resizeCanvas();
});
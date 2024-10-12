
import { Ground } from './ground.js';
import { Stars } from './stars.js';
import { MountainsLow } from './mountainsLow.js';
import { MountainsHigh } from './mountainsHigh.js';
import { Runner } from './runner.js';
import { Enemies } from './enemies.js';
 
window.onload = init;
 
let ctx;
 
 
let stars;
let mountainsHigh;
let mountainsLow;
let ground;
let delta;
let previousTime;
let speed;
let speedFactor = 1;
const BASE_SPEED = 16;
let runner;
let enemies;
 
function init() {
    let canvas = document.getElementById("my-canvas");
 
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
 
        stars = new Stars(ctx);
        stars.load(loaded);
 
        mountainsHigh = new MountainsHigh(ctx);
        mountainsHigh.load(loaded);
 
        mountainsLow = new MountainsLow(ctx);
        mountainsLow.load(loaded);
 
        ground = new Ground(ctx);
        ground.load(loaded);

        runner = new Runner(ctx);
        runner.load(loaded);

        enemies = new Enemies(ctx);
        enemies.load(loaded);

        document.body.onkeyup = function(e) {
            if (e.keyCode == 32) {
                handleUserAction();
            }
        }
 
        loadAudio();

        canvas.onclick = handleUserAction;

        

 
    } else {
        alert("Canvas is not supported.");
    }
}
 
let loaderCounter = 0;
 
function loaded() {
 
    loaderCounter++;
 
    if (loaderCounter < 6)
        return;
    previousTime = performance.now();
 
    window.requestAnimationFrame(main);
}
 
 let running = false;
function main(currentTime) {
    if(running) {
        window.requestAnimationFrame(main);
    }
    delta = parseInt(currentTime - previousTime);
    speed = Math.abs(speedFactor * delta / BASE_SPEED);
    clearCanvas();
    update();
    draw();
    showGameStats();
    previousTime = currentTime;
    
    if(speed < 8){
        speedFactor += 0.001;
    }
}
 
function clearCanvas() {
    let linearGradient = ctx.createLinearGradient(ctx.canvas.width / 2, 0, ctx.canvas.width / 2, ctx.canvas.height);
    linearGradient.addColorStop(0, '#0D0E20');
    linearGradient.addColorStop(0.5, '#26303E');
    linearGradient.addColorStop(1, '#445664');
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
 
 
function update() {
    stars.update(speed);
    mountainsHigh.update(speed);
    mountainsLow.update(speed);
    ground.update(speed);
    runner.update(speed);
    enemies.update(speed);

    detectCollision();
}
 
 
function draw() {
    stars.draw();
    mountainsHigh.draw();
    mountainsLow.draw();
    ground.draw();
    runner.draw();
    enemies.draw();

    if(running) {
        drawScore();
    }

    if(isGameOver) {
        gameOver();
    }
}

function showGameStats() {
    let fps;
    let fpsSpan = document.getElementById("fps");
    let speedSpan = document.getElementById("speed");
 
    if (delta != 0) {
        fps = parseInt(1000 / delta);
    }
    fpsSpan.innerHTML = fps;
    speedSpan.innerHTML = speed;
}

function handleUserAction() {
    if (!running) {
        resetGame();
        window.requestAnimationFrame(main);
        runner.startRunning();
        startSound.play();
    } else {
        if(runner.jump()){

            jumpSound.play();
        }
        
    }
}
 
let isGameOver;
function detectCollision() {
 
    for (let i = 0; i < enemies.list.length; i++) {
        if (enemies.list[i].isActive) {
 
            let circle1 = {
                radius: runner.Sprite.Destination.width * 0.4,
                x: runner.Sprite.Destination.x + runner.Sprite.Destination.width / 2,
                y: runner.Sprite.Destination.y + runner.Sprite.Destination.height / 2
            };
            let circle2 = {
                radius: enemies.list[i].width * 0.4,
                x: enemies.list[i].x + enemies.list[i].width / 2,
                y: enemies.list[i].y + enemies.list[i].height / 2
            };
 
            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
 
            if (distance < circle1.radius + circle2.radius) {
                isGameOver = true;
            }
 
        }
    }
}


function gameOver () {
    endSound.play();
    running = false;
    ctx.font = 'bold 80px Luckiest Guy';
    ctx.fillStyle = 'white';
    let text = ctx.measureText('Game Over');
    ctx.fillText('Game Over', ctx.canvas.width / 2 - text.width / 2, ctx.canvas.height / 2);
}


let startSound;
let jumpSound;
let endSound;

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
 
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

 
function loadAudio() {
    startSound = new Sound("sounds/click.wav");
    jumpSound = new Sound("sounds/jump.wav");
    endSound = new Sound("sounds/fail.wav");
}


let score = 0;
 
function drawScore() {
 
    score += speed;
 
    let scoreText = "Score: " + parseInt(score);
 
    ctx.font = 'bold 36px Luckiest Guy';
    ctx.fillStyle = "white";
 
    let text = ctx.measureText(scoreText);
 
    ctx.fillText(scoreText, 50, 50);
 
}

function resetGame() {
    running = true;
    isGameOver = false;
    score = 0;
    speedFactor = 1;
    enemies.reset();
    previousTime = performance.now();
}

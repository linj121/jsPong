import Ball from './Ball.js';
import Paddle from './Paddle.js';

// update loop 

// create a new ball object given the DOM element
const ball = new Ball(document.getElementById('ball'));
// create a new paddle object given the DOM element
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

//global var lastTime, keeps track of the time last time we call update
let lastTime;

function update(time){

    //calculate the time difference compared to last function call 
    if (lastTime != null) {
        const delta = time - lastTime;
        //update the ball using delta and rects of both paddles for collision detection
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        // "AI", believe it or not
        computerPaddle.update(delta, ball.y);
        //change color by time
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

        if(isLose()) { handleLose(); }
    }

    //upon first call, lastTime is assigned with time
    lastTime = time;

    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1;
    } else if (rect.left <= 0) {
        computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1;
    } else {
        console.log("unexpected situation");
    }
    ball.reset();
    computerPaddle.reset();

}

document.addEventListener("mousemove", (e) => {
    // percentage value relative to window.innerHeight
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(update);


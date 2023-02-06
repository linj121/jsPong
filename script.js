import Ball from './Ball.js';
import Paddle from './Paddle.js';

// update loop 

// create a new ball object given the DOM element
const ball = new Ball(document.getElementById('ball'));
// create a new paddle object given the DOM element
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));

//global var lastTime, keeps track of the time last time we call update
let lastTime;

function update(time){

    //calculate the time difference compared to last function call 
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta);
    }

    //upon first call, lastTime is assigned with time
    lastTime = time;

    //console.log(`time: ${time}`);

    window.requestAnimationFrame(update);
}

document.addEventListener("mousemove", (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(update);

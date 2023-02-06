const INITTIAL_VELOCITY = 0.03;
const VELOCITY_INCREASE = 0.000001;

export default class Ball {
    constructor(ballElement) {
        this.ballElement = ballElement;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballElement.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"));
    }

    set y(value) {
        this.ballElement.style.setProperty("--y", value);
    }

    rect() {
        // The Element.getBoundingClientRect() method returns a 
        // DOMRect object providing information about the size of 
        // an element and its position relative to the viewport.
        return this.ballElement.getBoundingClientRect();
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = {x: 0, y: 0};
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            // heading is the radian of a unit circle, heading in [0, 2Pi]
            // https://www.mathsisfun.com/geometry/unit-circle.html
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)};
        }
        this.velocity = INITTIAL_VELOCITY;
    }

    update(delta) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        const rect = this.rect();
        //increase the velocity by time
        this.velocity += VELOCITY_INCREASE * delta;
        // The read-only innerHeight property of the Window interface 
        // returns the interior height of the window in pixels, including 
        // the height of the horizontal scroll bar, if present. 
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }
        if (rect.right >= window.innerWidth || rect.left <= 0) {
            this.direction.x *= -1;
        }
    }


}

function randomNumberBetween(min, max) {
    // range + lower bound
    return Math.random() * (max - min) + min;
}
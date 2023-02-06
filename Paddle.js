const SPEED = 0.02; 

export default class Paddle {
    constructor(paddleElement) {
        this.paddleElement = paddleElement;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElement.style.setProperty("--position", value);
    }

    rect() {
        return this.paddleElement.getBoundingClientRect();
    }

    reset() {
        this.position = 50;
    }

    update(delta, ballHeight) {
        // if ball is higher, height minus position is positive, paddle moves up
        // otherwise, it moves down or remains
        this.position += SPEED * delta * (ballHeight - this.position);
    }
}
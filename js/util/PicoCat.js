class PicoCat {
    constructor(main, body, speed, defaultDirection) {
        this.main = main;
        this.body = body;
        this.speed = speed;
        this.direction = defaultDirection;
        this.positionX = 0;
    }
    init() {
        this.directionChange && this.directionChange(this.direction);
    }
    onDirectionChanged(callback) {
        this._onDirectionChanged = callback;
    }
    onMove(callback) {
        this._onMove = callback;
    }
    onMovePaused(callback) {
        this._onMovePaused = callback;
    }
    onJump(callback) {
        this._onJump = callback;
    }
    onJumpEnd(callback) {
        this._onJumpEnd = callback;
    }
    onStep(callback) {
        this._onStep = callback;
    }
    directionChange(newDirection) {
        const temp = this.direction;
        this.direction = newDirection;
        this._onDirectionChanged(temp, newDirection);
    }
    move(newDirection) {
        clearInterval(this.runningTimer);
        this.directionChange && this.directionChange(newDirection || 'right');
        this.runningTimer = setInterval(() => {
            this.direction === 'left' ? this.positionX -= this.speed : this.positionX += this.speed;
            this.body.style.transform = `translateX(${this.positionX}px)`;
            this._onStep(this);
        }, 1);
        this.state = 1;
        this._onMove(this.direction, this.state);
    }
    movePaused() {
        clearInterval(this.runningTimer);
        this._onMovePaused();
    }
    jump(time) {
        if (this.state === 2)
            return;
        this.state = 2;
        this._onJump(this.direction, this.state);
        setTimeout(() => {
            this.state = 0;
            this._onJumpEnd();
        }, time);
    }
    changePositionX(newX) {
        this.positionX = newX;
        this.body.style.transform = `translateX(${this.positionX}px)`;
    }
}
export default PicoCat;

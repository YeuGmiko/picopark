class PicoCat {
    main: HTMLElement
    body: HTMLElement
    state: number // 0停止 1跑 2跳跃
    speed: number
    direction: string
    positionX: number
    runningTimer: number
    _onDirectionChanged: Function
    _onMove: Function
    _onMovePaused: Function
    _onJump: Function
    _onJumpEnd: Function
    _onStep: Function

    constructor(main, body, speed: number, defaultDirection: 'left' | 'right') {
        this.main = main
        this.body = body
        this.speed = speed
        this.direction = defaultDirection
        this.positionX = 0
    }

    init() {
        this.directionChange && this.directionChange(this.direction)
    }
    onDirectionChanged(callback: Function) {
        this._onDirectionChanged = callback
    }
    onMove(callback: Function) {
        this._onMove = callback
    }
    onMovePaused(callback: Function) {
        this._onMovePaused = callback
    }
    onJump(callback: Function) {
        this._onJump = callback
    }
    onJumpEnd(callback: Function) {
        this._onJumpEnd = callback
    }

    onStep(callback: Function) {
        this._onStep = callback
    }

    directionChange(newDirection: string) {
        const temp = this.direction
        this.direction = newDirection
        this._onDirectionChanged(temp, newDirection)
    }

    move(newDirection: string) {
        clearInterval(this.runningTimer)
        this.directionChange && this.directionChange(newDirection || 'right')
        this.runningTimer = setInterval(() => {
            this.direction === 'left' ? this.positionX -= this.speed : this.positionX += this.speed
            this.body.style.transform = `translateX(${this.positionX}px)`
            this._onStep(this)
        }, 1)
        this.state = 1
        this._onMove(this.direction, this.state)
    }
    movePaused() {
        clearInterval(this.runningTimer)
        this._onMovePaused()
    }
    jump(time) {
        if (this.state === 2)
            return
        this.state = 2
        this._onJump(this.direction, this.state)
        setTimeout(() => {
            this.state = 0
            this._onJumpEnd()
        }, time)
    }

    changePositionX(newX) {
        this.positionX = newX
        this.body.style.transform = `translateX(${this.positionX}px)`
    }

}

export default PicoCat
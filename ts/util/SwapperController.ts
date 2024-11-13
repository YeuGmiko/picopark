class SwapperController {
    public main: HTMLElement
    private list: HTMLElement
    private listWidth: number
    private currentX: number
    private direction: 'left' | 'right'
    private speed: number
    private timerId: number

    constructor(swapper: HTMLElement, itemListContainer: HTMLElement, speed: number, direction?: 'left' | 'right') {
        this.main = swapper
        this.list = itemListContainer
        this.listWidth = itemListContainer.offsetWidth
        this.direction = direction || 'left'
        this.speed = speed / 1000
        this.init()
    }

    private init() {
        this.main.insertBefore(this.list.cloneNode(true), this.list)
        this.main.appendChild(this.list.cloneNode(true))
        this.main.style.transform = `translateX(${this.currentX = -this.listWidth}px)`
        return this
    }

    start() {
        clearInterval(this.timerId)
        this.timerId = setInterval(() => {
            this.move()
        }, 1)
        return this
    }

    private move() {
        if (this.currentX >= 0 || this.currentX <= -(this.listWidth*2))
            this.currentX = -this.listWidth
        this.direction === 'left' ? this.currentX -= this.speed : this.currentX += this.speed
        this.main.style.transform = `translateX(${this.currentX}px)`
        return this
    }

    stop() {
        clearInterval(this.timerId)
        return this
    }

}
export default SwapperController
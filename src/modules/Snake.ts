/**
 * 蛇
 */
class Snake
{
    protected element: HTMLElement;
    // 蛇头元素
    protected head: HTMLElement;
    // 蛇的身体（包括蛇头）
    protected bodies: HTMLCollectionOf<HTMLElement>;
    // 蛇当前的行走方向
    protected direction = "";

    constructor()
    {
        this.element = document.getElementById("snake")!;
        this.head = document.querySelector("#snake > div")!;
        this.bodies = this.element.getElementsByTagName("div");
    }

    /**
     * 设置蛇头的X坐标值
     */
    set X(value: number)
    {
        if (this.X === value) {
            return;
        }

        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了！");
        }

        this.moveBody();

        this.head.style.left = value + "px";
    }

    /**
     * 返回蛇头的X坐标值
     */
    get X(): number
    {
        return this.head.offsetLeft;
    }

    /**
     * 设置蛇头的Y坐标值
     */
    set Y(value: number)
    {
        if (this.Y === value) {
            return;
        }

        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了！");
        }

        this.moveBody();

        this.head.style.top = value + "px";
    }

    /**
     * 返回蛇头的Y坐标值
     */
    get Y(): number
    {
        return this.head.offsetTop;
    }

    /**
     * 设置蛇的行走方向
     */
    set nowDirection(value: string)
    {
        this.direction = value;
    }

    /**
     * 获取蛇的身体
     */
    get nowBodies(): HTMLCollectionOf<HTMLElement>
    {
        return this.bodies;
    }

    /**
     * 吃完食物增加身体
     */
    public addBody(): void
    {
        const div = document.createElement("div");
        this.element.appendChild(div);
    }

    /**
     * 多节蛇的移动
     */
    public moveBody(): void
    {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let x = this.bodies[i - 1].offsetLeft;
            let y = this.bodies[i - 1].offsetTop;

            this.bodies[i].style.left = x + "px";
            this.bodies[i].style.top = y + "px";
        }
    }

    /**
     * 追尾检查
     */
    public checkRearEnd(): void | never
    {
        // 只要蛇头与其他任何蛇身重叠则为追尾
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X === this.bodies[i].offsetLeft && this.Y === this.bodies[i].offsetTop) {
                throw new Error("蛇追尾了！");
            }
        }
    }

    /**
     * 蛇头走
     */
    public run(): void
    {
        let x = this.X;
        let y = this.Y;

        switch(this.direction) {
            case "ArrowUp" :
            case "Up" :
                y -= 10;
                break;
            case "ArrowDown" :
            case "Down" :
                y += 10;
                break;
            case "ArrowLeft" :
            case "Left" :
                x -= 10;
                break;
            case "ArrowRight" :
            case "Right" :
                x += 10;
                break;
        }

        this.X = x;
        this.Y = y;
    }
}

export default Snake;
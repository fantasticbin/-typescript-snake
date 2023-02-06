import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import AnyTouch from "any-touch";
import type { AnyTouchEvent } from "any-touch";

/**
 * 游戏控制器
 */
class GameController
{
    protected snake: Snake;
    protected food: Food;
    protected scorePanel: ScorePanel;

    // 用于防止调头，记录上一次键盘操作
    protected lastKeyDown = '';
    // 用于标记游戏是否未结束
    protected isLive = true;

    constructor()
    {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
    }

    /**
     * 游戏初始化，运行该方法表示游戏开始
     */
    public init(): void
    {
        // 绑定键盘事件，当按下 上/下/左/右 时改变蛇的行动方向
        document.addEventListener("keydown", this.keyDownHandle.bind(this));

        // 使用any-touch绑定滑动手势事件
        const page = document.querySelector("html") as HTMLElement;
        const at = new AnyTouch(page);
        at.on(["panup", "pandown", "panright", "panleft"], this.panHandle.bind(this));

        this.snakeRun();
    }

    /**
     * 键盘事件逻辑
     * @param event 事件属性
     */
    protected keyDownHandle(event: KeyboardEvent): void
    {
        const horizontal = ["ArrowLeft", "Left", "ArrowRight", "Right"];
        const vertical = ["ArrowUp", "Up", "ArrowDown", "Down"];
        const beginBan = ["ArrowUp", "Up", "ArrowLeft", "Left"];

        // 防止水平调头
        if (horizontal.includes(this.lastKeyDown) && horizontal.includes(event.key)) {
            return;
        }

        // 防止垂直调头
        if (vertical.includes(this.lastKeyDown) && vertical.includes(event.key)) {
            return;
        }

        // 防止游戏开始即结束
        if (this.snake.nowDirection === "" && beginBan.includes(event.key)) {
            return;
        }

        // 设置当前蛇的行走方向
        this.snake.nowDirection = event.key;
        // 记录此次键盘操作
        this.lastKeyDown = event.key;
    }

    /**
     * 滑动手势事件逻辑（最终模拟成键盘事件）
     * @param event 事件属性
     */
    protected panHandle(event: AnyTouchEvent): void
    {
        const keyMap = new Map();
        keyMap.set("up", "ArrowUp");
        keyMap.set("down", "ArrowDown");
        keyMap.set("left", "ArrowLeft");
        keyMap.set("right", "ArrowRight");

        let keyboardEvent = new KeyboardEvent(event.direction, {
            key: keyMap.get(event.direction)
        });
        this.keyDownHandle(keyboardEvent);
    }

    /**
     * 检查蛇是否吃到食物
     * @param x X坐标
     * @param y Y坐标
     */
    protected checkEat(x: number, y: number): void
    {
        if (x === this.food.X && y === this.food.Y) {
            // 食物位置重置
            this.food.change(this.snake.nowBodies);
            // 分数增加
            this.scorePanel.addScore();
            // 蛇身增加一节
            this.snake.addBody();
        }
    }

    /**
     * 处理蛇走逻辑
     */
    protected snakeRun(): void
    {
        this.checkEat(this.snake.X, this.snake.Y);

        try {
            this.snake.checkRearEnd();
            this.snake.run();
        } catch (e: any) {
            // 捕获到错误意味着游戏失败
            alert((e as Error).message + " GAME OVER!");
            this.isLive = false;
        }

        // 定时调用自身，并根据当前等级动态改变速度
        this.isLive && setTimeout(this.snakeRun.bind(this), 300 - (this.scorePanel.nowLevel - 1) * 30);
    }
}

export default GameController;
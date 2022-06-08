/**
 * 食物
 */
class Food
{
    protected element: HTMLElement;

    constructor()
    {
        this.element = document.getElementById("food")!;
    }

    /**
     * 返回食物X坐标值
     */
    get X(): number
    {
        return this.element.offsetLeft;
    }

    /**
     * 返回食物Y坐标值
     */
    get Y(): number
    {
        return this.element.offsetTop;
    }

    /**
     * 食物位置重置
     * @param snakeBodies 蛇身元素集合
     */
    public change(snakeBodies: HTMLCollectionOf<HTMLElement>): void
    {
        // 随机生成一个位置，最小是0，最大是290，每次移动间隔大小是10
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;

        // 防止食物重置时位置和蛇身重叠
        for (let snakeBody of snakeBodies) {
            if (top === snakeBody.offsetTop && left === snakeBody.offsetLeft) {
                // 递归调用，生成新的位置，并中止当前程序继续执行（一定要加上中止，否则该逻辑无效）
                this.change(snakeBodies);
                return;
            }
        }

        this.element.style.top = top + "px";
        this.element.style.left = left + "px";
    }
}

export default Food;
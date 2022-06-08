/**
 * 记分牌
 */
class ScorePanel
{
    protected score = 0;
    protected level = 1;
    protected scoreElement: HTMLElement;
    protected levelElement: HTMLElement;

    constructor(protected maxLavel: number = 10, protected upScore: number = 10)
    {
        this.scoreElement = document.getElementById("score")!;
        this.levelElement = document.getElementById("level")!;
    }

    /**
     * 加分
     */
    public addScore(): void
    {
        this.scoreElement.innerText = (++this.score).toString();

        // 分数达到设置的数则升级
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    /**
     * 升级
     */
    protected levelUp(): void
    {
        if (this.level <= this.maxLavel) {
            this.levelElement.innerText = (++this.level).toString();
        }
    }

    /**
     * 获取当前等级
     */
    get nowLevel(): number
    {
        return this.level;
    }
}

export default ScorePanel;
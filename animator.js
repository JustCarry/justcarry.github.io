class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, stopAtLastFrame = false) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, stopAtLastFrame});

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
        this.stopped = false;
    }

    drawFrame(tick, ctx, x, y) {
        if (!this.stopped) {
            this.elapsedTime += tick;

            if (this.elapsedTime > this.totalTime) {
                if (this.stopAtLastFrame) {
                    this.stopped = true; 
                    this.elapsedTime = this.totalTime; 
                } else {
                    this.elapsedTime -= this.totalTime;
                }
            }
        }

        const frame = this.currentFrame();

        ctx.drawImage(this.spritesheet,
            this.xStart + (this.width * frame), this.yStart,
            this.width, this.height,
            x, y,
            this.width * 1.6, this.height * 1.6);
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    reset() {  
        this.elapsedTime = 0;
        this.stopped = false;
    }

    isDone() {
        return this.stopped || (this.elapsedTime >= this.totalTime && this.stopAtLastFrame);
    }
}

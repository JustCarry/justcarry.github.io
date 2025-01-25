class Bandit {
    constructor(game) {
        this.game = game;
        
        this.idle =  new Animator(ASSET_MANAGER.getAsset("./assets/HeavyBandit.png"), 0, 0, 48, 48, 4, 0.1);
        this.aggro =  new Animator(ASSET_MANAGER.getAsset("./assets/HeavyBandit.png"), 4 * 48, 0, 48, 48, 4, 0.1);
        this.run =  new Animator(ASSET_MANAGER.getAsset("./assets/HeavyBandit.png"), 0, 48, 48, 48, 8, 0.1);
        this.attack =  new Animator(ASSET_MANAGER.getAsset("./assets/HeavyBandit.png"), 0, 2 * 48, 48, 48, 8, 0.1, true);
        this.attackAgain =  new Animator(ASSET_MANAGER.getAsset("./assets/HeavyBandit.png"), 0, 2 * 48, 48, 48, 8, 0.15, true);
        this.damaged =  new Animator(ASSET_MANAGER.getAsset("./assets/HeavyBandit.png"), 0, 4 * 48, 48, 48, 3, 0.2, true);
        this.damagedAgain =  new Animator(ASSET_MANAGER.getAsset("./assets/HeavyBandit.png"), 0, 4 * 48, 48, 48, 3, 0.2, true);
        this.died =  new Animator(ASSET_MANAGER.getAsset("./assets/HeavyBandit.png"), 0, 4 * 48, 48, 48, 4, 0.2, true);
        

        this.x = 900;
        this.y = 440;
        this.speed = 125;
        this.current = this.idle;
        this.last = 0;

    }
    update(){

        if(this.game.state == 10){
            this.current = this.aggro;
        } else if(this.game.state == 11){
            
            if(this.last == 0)
                this.last = this.game.timer.lastTimestamp;
            if(this.game.timer.lastTimestamp - this.last >= 1000){
                this.last = 0;
                this.game.state++;
            }
        } else if(this.game.state == 12){
            this.current = this.run;
            this.x -= this.speed * this.game.clockTick;
            if(this.x <= 830){
                this.game.state++;
            }
        } else if(this.game.state == 13){
            this.current = this.attack;
            if(this.current.isDone()){
                this.game.state++;
            }
        } else if(this.game.state == 14){
            this.current = this.damaged;
            if(this.current.isDone())
                this.game.state++;
        } else  if(this.game.state == 15){
            this.current = this.damagedAgain;
            if(this.current.isDone())
                this.game.state++;
        } else if(this.game.state == 16){
            this.current = this.attackAgain;
            if(this.current.isDone()){
                this.game.state++;
            }
        } else if(this.game.state == 18){
            this.current = this.died;
        } else if(this.game.state > 10) {
            this.current = this.aggro;
        }
        console.log(this.game.state);
    }

    draw(ctx){
        this.current.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}
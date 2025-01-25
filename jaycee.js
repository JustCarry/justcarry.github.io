class JayCee {
    constructor(game) {
        this.game = game;
        
        this.idle =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 0, 0, 100, 55, 7, 0.1);
        this.walking =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 800, 0, 100, 55, 10, 0.1);
        this.jumping =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 0, 55, 100, 55, 3, 0.5);
        this.attack =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 700, 55, 100, 55, 6, 0.1);
        this.attack2 =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 1300, 55, 100, 55, 4, 0.1);
        this.attack3 =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 0, 3 * 55, 100, 55, 7, 0.1);
        this.block =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 600, 330, 100, 55, 5, 0.3);
        this.block2 =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 600, 330, 100, 55, 5, 0.3);
        this.roll =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 100, 385, 100, 55, 9, 0.18);
        this.ledge =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 0, 440, 100, 55, 5, 0.1, true);
        this.slide =  new Animator(ASSET_MANAGER.getAsset("./assets/HeroKnight.png"), 500, 440, 100, 55, 5, 0.1);
        this.slideDust =  new Animator(ASSET_MANAGER.getAsset("./assets/SlideDust.png"), 0, 0, 25, 32, 5, 0.1);
        

        this.x = 0;
        this.y = 615;
        this.speed = 135;
        this.current = this.idle;
        this.last = 0;
    }
    update(){
        if(this.game.state == 1){
            this.x += this.speed * this.game.clockTick;
            if(this.x >= 130){
                this.game.state ++;
            }
            this.current = this.walking;
        } else if(this.game.state == 2){
            this.x += this.speed * this.game.clockTick;
            if(this.x >= 265){
                this.game.state ++;
            }
            this.current = this.roll;
        } else if(this.game.state == 3){
            this.x +=  ( this.speed / 0.9 ) * this.game.clockTick;
            this.y -=  ( this.speed / 0.7 ) * this.game.clockTick;
            if(this.x >= 325){
                this.game.state ++;
            }
            this.current = this.jumping;
        } else if(this.game.state == 4){
            this.y +=  ( this.speed / 1.5 ) * this.game.clockTick;
            if(this.y >= 615){
                this.game.state ++;
            }
            this.current = this.slide;
        } else if(this.game.state == 5){
            this.x += this.speed * this.game.clockTick;
            if(this.x >= 470){
                this.game.state = 6;
            }
            this.current = this.walking;
        } else if(this.game.state == 6){
            this.x += this.speed * this.game.clockTick;
            this.y -= (this.speed / 5) * this.game.clockTick;
            if(this.y <= 595){
                this.game.state ++;
            }
            this.current = this.walking;
        } else if(this.game.state == 7){
            this.x += this.speed * this.game.clockTick;
            if(this.x >= 600){
                this.game.state ++;
            }
            this.current = this.walking;
        } else if(this.game.state == 8){
            this.x +=  ( this.speed / 0.9 ) * this.game.clockTick;
            this.y -=  ( this.speed / 0.8 ) * this.game.clockTick;
            if(this.y <= 490){
                this.y = 490;
            }
            if(this.x >= 680){
                this.game.state ++;
            }
            this.current = this.jumping;
        } else if(this.game.state == 9){
            this.current = this.ledge;
            if(this.last == 0)
                this.last = this.game.timer.lastTimestamp;
            if(this.game.timer.lastTimestamp - this.last >= 1000){
                this.game.state = 10; this.last = 0;
            }
        } else if(this.game.state == 10){
            this.x +=  ( this.speed / 2 ) * this.game.clockTick;
            this.y -=  ( this.speed / 0.3 ) * this.game.clockTick;
            if(this.y <= 430){
                this.y = 430;
            }
            if(this.x >= 730){
                this.game.state ++;
            }
            this.current = this.roll;
        } else if(this.game.state == 13){
            this.current = this.block;
            this.last = 0;
        } else if(this.game.state == 14){
            this.current = this.attack;
            
            if(this.last == 0)
                this.last = this.game.timer.lastTimestamp;
            if(this.game.timer.lastTimestamp - this.last >= 500){
                this.last = 0;
            }
            
        } else if(this.game.state == 15){
            this.current = this.attack2;
            
            if(this.last == 0)
                this.last = this.game.timer.lastTimestamp;
            if(this.game.timer.lastTimestamp - this.last >= 500){
                this.last = 0;
            }

        } else if(this.game.state == 16){
            this.current = this.block2;
            this.last = 0;
        } else if(this.game.state == 17){
            this.current = this.attack3;
            
            if(this.last == 0)
                this.last = this.game.timer.lastTimestamp;
            if(this.game.timer.lastTimestamp - this.last >= 200){
                this.last = 0;
                this.game.state++;
            }
        } else {
            if( this.current != this.idle)
                this.current = this.idle;
        }
    }

    draw(ctx){
        this.current.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if(this.current==this.slide){
            this.slideDust.drawFrame(this.game.clockTick, ctx, this.x+75, this.y-15);
        }
    }

    start(){
        this.game.state = 1;
    }
}
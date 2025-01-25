class Background {
    constructor(game) {
        this.game = game;
    }
    update(){

    }

    draw(ctx){
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/background.png"),
            0, 0,
            ctx.canvas.width, ctx.canvas.height );
    }
}
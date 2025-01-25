const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/background.png");
ASSET_MANAGER.queueDownload("./assets/SlideDust.png");
ASSET_MANAGER.queueDownload("./assets/HeroKnight.png");
ASSET_MANAGER.queueDownload("./assets/HeavyBandit.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const jaycee = new JayCee(gameEngine);

	gameEngine.addEntity(jaycee);

	gameEngine.addEntity(new Bandit(gameEngine));

	gameEngine.addEntity(new Background(gameEngine));

	gameEngine.init(ctx);

	gameEngine.start();


	setTimeout( () => {
		jaycee.start();
	}, 1000);
});

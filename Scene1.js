class Scene1 extends Phaser.Scene {
  constructor() {
    super("indexGame");
    this.yellow_piece1;
    this.yellow_piece2;
    this.yellow_piece3;
    this.yellow_piece4;
    this.green_piece1;
    this.green_piece2;
    this.green_piece3;
    this.green_piece4;
  }
  loadData() {
    this.load.image("bg", "ludo_image/ludo_bg.png");
    this.load.image("ludo", "ludo_image/bord_bg.png");
    this.load.image("blue", "ludo_image/b_dice.png");
    this.load.image("red", "ludo_image/r_dice.png");
    this.load.image("green", "ludo_image/g_dice.png");
    this.load.image("yellow", "ludo_image/y_dice.png");
    this.load.image("blue_piece", "spiritesheet/pecies/pieceBlue_border01.png");
    this.load.image("red_piece", "spiritesheet/pecies/pieceRed_border02.png");
    this.load.image(
      "yellow_piece",
      "spiritesheet/pecies/pieceYellow_border01.png"
    );
    this.load.image(
      "green_piece",
      "spiritesheet/pecies/pieceGreen_border02.png"
    );

    this.load.spritesheet(
      "dice",
      "kenney_boardgame-pack/Spritesheets/diceWhite.png",
      {
        frameWidth: 50, // Replace with actual frame width
        frameHeight: 50, // Replace with actual frame height
      }
    );
  }
  addPiecesAtDefault() {
    console.log(config.height / 15);
    this.yellow_piece1 = this.add
      .image(STEP_LENGTH_X * 13.45 - 15, STEP_LENGTH_Y * 3, "yellow_piece")
      .setDepth(2);
    this.yellow_piece2 = this.add
      .image(
        config.default_cords.yellow.piece2[0],
        config.default_cords.yellow.piece2[1],
        "yellow_piece"
      )
      .setDepth(2);
    this.yellow_piece3 = this.add
      .image(
        config.default_cords.yellow.piece3[0],
        config.default_cords.yellow.piece3[1],
        "yellow_piece"
      )
      .setDepth(2);
    this.yellow_piece4 = this.add
      .image(
        config.default_cords.yellow.piece4[0],
        config.default_cords.yellow.piece4[1],
        "yellow_piece"
      )
      .setDepth(2);
    this.green_piece1 = this.add
      .image(
        config.default_cords.green.piece1[0],
        config.default_cords.green.piece1[1],
        "green_piece"
      )
      .setDepth(2);
    this.green_piece2 = this.add
      .image(
        config.default_cords.green.piece2[0],
        config.default_cords.green.piece2[1],
        "green_piece"
      )
      .setDepth(2);
    this.green_piece3 = this.add
      .image(
        config.default_cords.green.piece3[0],
        config.default_cords.green.piece3[1],
        "green_piece"
      )
      .setDepth(2);
    this.green_piece4 = this.add
      .image(
        config.default_cords.green.piece4[0],
        config.default_cords.green.piece4[1],
        "green_piece"
      )
      .setDepth(2);
  }
  movePieceBySteps(piece, previousStep) {
    // console.log(previousStep, stepsToMove);
    const [targetX, targetY] = COORDINATES_MAP[previousStep];
    console.log(targetX, targetY);

    const tweenDuration = 100; // Duration of the tween
    const moveTween = this.tweens.add({
      targets: piece,
      x: targetX * STEP_LENGTH_X - 15,
      y: targetY * STEP_LENGTH_Y,
      duration: tweenDuration,
      ease: "Quad.easeInOut",
      onComplete: () => {
        // After reaching the target position, move to the next step
        // this.movePieceBySteps(piece, previousStep + 1, stepsToMove - 1);
      },
    });
  }

  changePosition(piece, previousStep, step) {
    const interval = setInterval(() => {
      this.movePieceBySteps(piece, previousStep);
      console.log("previousStep" + previousStep);
      previousStep++;
      step--;
      if (step < 0) {
        clearInterval(interval);
      }
    }, 200);
  }
  returnHome(piece) {
    console.log(BASE_POSITIONS.P1[0]);
    const homePosition = config.default_cords.yellow.piece1; // Replace with actual home position
    console.log("hello");
    const returnTween = this.tweens.add({
      targets: piece,
      x: homePosition[0],
      y: homePosition[1],
      duration: 300,
      ease: "Quad.easeInOut",
      onComplete: () => {
        // Additional actions after returning home, if needed
      },
    });
  }
  preload() {
    this.loadData();
  }
  create() {
    const dice = this.add.sprite(50, 20, "dice");
    const ludo = this.add.image(0, 90, "ludo");
    const red_side = this.add.image(50, 620, "red");
    const blue_side = this.add.image(450, 620, "blue");
    const green_side = this.add.image(50, 60, "green");
    const yellow_side = this.add.image(450, 60, "yellow");
    const blue_piece = this.add.image(750, 60, "blue_piece");
    this.addPiecesAtDefault();
    console.log((ludo.width / 15) * 2, "ludo height");
    this.changePosition(this.yellow_piece1, 0, 5);
    this.anims.create({
      key: "roll",
      frames: this.anims.generateFrameNumbers("dice", { start: 0, end: 20 }), // Replace with actual number of frames
      frameRate: 10, // Adjust the frame rate as needed
      repeat: 0, // Play the animation once
      // Optional: Add onComplete to trigger actions after the animation completes
    });
    // this.returnHome(this.yellow_piece1);
    dice.setDepth(5);
    dice.play("roll");
    blue_side.setScale(0.5);
    yellow_side.setScale(0.5);
    green_side.setScale(0.5);
    red_side.setScale(0.5);
    red_side.setDepth(2);
    ludo.setOrigin(0);
    ludo.setDepth(1);
    ludo.setScale(0.5);
    var socketObj = new SocketConnection(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVkZjJiZGFjNmVhZjM1YmJhNzQxZmEiLCJ1c2VyTmFtZSI6IjYzNTMwNzQ5NzEiLCJ1c2VyVHlwZSI6InVzZXIiLCJjdXJyZW50X3Rva2VuIjoxNzE1OTksImlhdCI6MTcwMjg5NTk4NCwiZXhwIjoxNzAyOTgyMzg0fQ.PWV6LEIruma-a-PCQBKnl0j269OTQMAwi7RkZy7PrVg",
      "2p"
    );
  }
}

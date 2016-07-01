// represents a Ball
function Ball(game, x, y, ballRef, nBoardWidth, nBoardHeight) {

    this.game = game;
    this.ballRef = ballRef;

    this.boardWidth = nBoardWidth;
    this.boardHeight = nBoardHeight;

    var random1 = Math.random();
    var random2 = Math.random();
    var ballXDirection = random1 < 0.5 ? -1 : 1;
    var ballYDirection = random2 < 0.5 ? -1 : 1;

    this.x = x;
    this.y = y;

    this.ballXDirection = ballXDirection;
    this.ballYDirection = ballYDirection;
}

// sets a reference to the game for the ball
Ball.prototype.setGame = function (game) {
    this.game = game;
};

Ball.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
};

// checks if the paddle hit the ball
Ball.prototype.checkCollision = function (paddle) {

    if (this.y >= paddle.y && this.y <= (paddle.y + paddle.size)) {
        return true;
    }
    return false;

};

// moves the ball one point in its current direction
Ball.prototype.move = function () {
    this.previousX = this.x;
    this.previousY = this.y;

    // checks if ball is moving to the right
    if (this.ballXDirection > 0) {

        // checks if ball is about to hit right paddle
        if (this.x + 1 * this.ballXDirection === this.boardWidth - 1) {

            // checks collision with right paddle
            if (this.checkCollision(this.game.rightPaddle)) {
                document.getElementById('pok').play();

                // sets ball direction to the left
                this.ballXDirection = -1;

            } else {

                document.getElementById('miss').play();

                // increases left player's score and starts new exchange
                this.game.leftPlayer.increaseScore();
                this.game.newExchange();
            }
        }
        this.x = this.x + 1 * this.ballXDirection;

    } else {
        // assumes ball is moving to the left

        // checks if ball is about to hit left paddle
        if (this.x + 1 * this.ballXDirection === 0) {

            // checks collision with left paddle
            if (this.checkCollision(this.game.leftPaddle)) {
                document.getElementById('pok').play();

                // sets ball direction to the right
                this.ballXDirection = 1;
            } else {

                document.getElementById('miss').play();

                // increases right player's score and starts new exchange
                this.game.rightPlayer.increaseScore();
                this.game.newExchange();
            }
        }
        this.x = this.x + 1 * this.ballXDirection;
    }

    if (this.ballYDirection > 0) {
        // checks if ball will exit board at bottom
        if (this.y + 1 * this.ballYDirection === this.boardHeight) {
            // sets ball direction upwards
            this.ballYDirection = -1;
        }
        this.y = this.y + 1 * this.ballYDirection;
    } else {
        // checks if ball will exit board at top
        if (this.y + 1 * this.ballYDirection === -1) {
            // sets ball direction downwards
            this.ballYDirection = 1;
        }
        // sets next ball position
        this.y = this.y + 1 * this.ballYDirection;
    }

    // persists the ball
    this.ballRef.set({ x: this.x, y: this.y, previousX: this.previousX, previousY: this.previousY });
};

// draws ball when its position changes
Ball.prototype.drawAtNewPosition = function (ballRef) {

    // erases previous position of the ball
    this.game.context.fillStyle = this.game.context.fillStyle = this.game.scoreLayer.fillStyleOfPoint(ballRef.previousX, ballRef.previousY);
    this.game.context.fillRect(ballRef.previousX * this.game.drawBlockSize, ballRef.previousY * this.game.drawBlockSize, this.game.drawBlockSize, this.game.drawBlockSize);

    if (this.game.isGameOn === true) {
        // draws new position of the ball
        this.game.context.fillStyle = 'white';
        this.game.context.fillRect(ballRef.x * this.game.drawBlockSize, ballRef.y * this.game.drawBlockSize, this.game.drawBlockSize, this.game.drawBlockSize);
    }

};

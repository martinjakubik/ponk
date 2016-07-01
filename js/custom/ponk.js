require(["canvasscript", "ball"], function(canvasscript, ball) {

  var DRAW_BLOCK_SIZE = 12 ;

  var PADDLE_SIZE = 4 ;

  var BOARD_WIDTH = 36 ;
  var BOARD_HEIGHT = 36 ;

  var LEFT_PADDLE = 0 ;
  var RIGHT_PADDLE = 1 ;

  var oCanvas = document.getElementById( "board" ) ;
  var nParentWidth = oCanvas.parentNode.clientWidth ;
  var nMarginSide = Math.floor(( nParentWidth - oCanvas.width ) / 2 ) ;
  var sMarginSide = nMarginSide + "px" ;
  var sMarginVertical = DRAW_BLOCK_SIZE * 4 + "px" ;

  oCanvas.style.marginLeft = sMarginSide ;
  oCanvas.style.marginRight = sMarginSide ;
  oCanvas.style.marginTop = sMarginVertical ;
  oCanvas.style.marginBottom = sMarginVertical ;

  function bind( scope, fn ) {
    return function() {
      return fn.apply( scope, arguments ) ;
    } ;
  }

  // represents a Ponk Player
  function PonkPlayer( game, paddle ) {
    this.game = game ;
    this.paddle = paddle ;
    this.score = 0 ;

    // tries to create a player
    // this.playerRef.set({ score: this.score }) ;
  }

  // increases the player's score
  PonkPlayer.prototype.increaseScore = function() {
    this.score = ( this.score + 1 ) % 10 ;
    
    if( this.score == 9 ) {
          this.game.stop() ;
    }
  } ;

  // represents a Ponk Board
  function PonkBoard( size ) {
    this.size = size ;
  }

  // gets the correct color at a point on the board
  PonkBoard.prototype.fillStyleOfPoint = function( x, y ) {
    return "black" ;
  } ;

  // represent a stack of layers, each of which can have a drawing
  function LayeredCompositeDrawing() {
  }

  // represents a view with a drawing on it
  function DrawingLayer( width, height ) {
    this.grid = new Array( width ) ;
    for( var x = 0 ; x < width ; x++) {
      this.grid[ x ] = new Array( height ) ;
      for( var y = 0 ; y < width ; y++ ) {
        this.grid[ x ][ y ] = 'black' ;
      }
    }
  }

  // gets the correct color at a point on the view, taking all visible layers into account
  LayeredCompositeDrawing.prototype.fillStyleOfPoint = function( x, y ) {
    // gets the color from the score layer
    // return scoreDrawingLayer.fillStyleOfPoint( x, y ) ;
    // return layers[ top ].fillStyleOfPoint( x, y ) ;
    // return this.topLayer.fillStyleOfPoint( x, y ) ;
  } ;

  // gets the correct color at a point on the board
  DrawingLayer.prototype.fillStyleOfPoint = function( x, y ) {

    return this.grid[ x ][ y ] ;
    
  } ;

  // represents a Game
  function Game( ballRef ) {

    this.isGameOn = true ;
    this.drawBlockSize = DRAW_BLOCK_SIZE;

    // makes the layers used for drawing
    this.boardLayer = new DrawingLayer( BOARD_WIDTH, BOARD_HEIGHT ) ;
    this.scoreLayer = new DrawingLayer( BOARD_WIDTH, BOARD_HEIGHT ) ;

    // makes a board
    this.board = new PonkBoard( BOARD_WIDTH ) ;

    // instantiates two paddles at either corner of the board
    this.rightPaddle = new Paddle( this, BOARD_WIDTH - 1, BOARD_HEIGHT - PADDLE_SIZE, RIGHT_PADDLE ) ;
    this.leftPaddle = new Paddle( this, 0, 0, LEFT_PADDLE ) ;

    // makes players
    this.rightPlayer = new PonkPlayer( this, this.rightPaddle ) ;
    this.leftPlayer = new PonkPlayer( this, this.leftPaddle ) ;

    // makes a ball
    var ballX = BOARD_WIDTH / 2 ;
    var ballY = BOARD_HEIGHT / 2 ;

    this.ball = new Ball( this, ballX, ballY, ballRef, BOARD_WIDTH, BOARD_HEIGHT) ;
    this.newExchange() ;

    document.addEventListener( "keydown", bind( this, this.keyDown ), false ) ;
  }

  // dispatches the keydown event to the correct handler
  Game.prototype.newExchange = function() {

    var ballX = BOARD_WIDTH / 2 ;
    var ballY = BOARD_HEIGHT / 2 ;

    this.context = oCanvas.getContext( "2d" ) ;

    // resets the position of the ball
    this.ball.setPosition( ballX, ballY ) ;

    // resets the direction of the ball
    var random1 = Math.random() ;
    var random2 = Math.random() ;
    var ballXDirection = random1 < .5 ? -1 : 1 ;
    var ballYDirection = random2 < .5 ? -1 : 1 ;

    this.ball.ballXDirection = ballXDirection ;
    this.ball.ballYDirection = ballYDirection ;

    // updates the scores
    drawScript( oCanvas, 25, 5, this.rightPlayer.score, this.scoreLayer, this.drawBlockSize ) ;
    drawScript( oCanvas, 8, 5, this.leftPlayer.score, this.scoreLayer, this.drawBlockSize ) ;
  }

  // dispatches the keydown event to the correct handler
  Game.prototype.keyDown = function( event ) {

    var keyCode = event.which ;
    var key = { up:38, down:40, w:87, s:83 } ;

    switch ( keyCode ) {
      case key.up:
      this.keyPressUpArrow() ;
      break ;
      case key.down:
      this.keyPressDownArrow() ;
      break ;
      case key.w:
      this.keyPressWASDDown() ;
      break ;
      case key.s:
      this.keyPressWASDUp() ;
      break ;
    }
  } ;

  // handles the up arrow
  Game.prototype.keyPressUpArrow = function() {

    // moves right paddle object up
    this.rightPaddle.move( -1 ) ;

  } ;

  // handles the down arrow
  Game.prototype.keyPressDownArrow = function() {

    // moves right paddle object down
    this.rightPaddle.move( 1 ) ;

  } ;

  // handles the r key
  Game.prototype.keyPressWASDUp = function() {

    // moves left paddle object up
    this.leftPaddle.move( -1 ) ;

  } ;

  // handles the f key
  Game.prototype.keyPressWASDDown = function() {

    // moves left paddle object down
    this.leftPaddle.move( 1 ) ;

  } ;

  // stores parent window
  Game.prototype.setParentWindow = function( oWindow )
  {
    this.parentWindow = oWindow ;
  } ;

  // sets the interval Id for the timer
  Game.prototype.setIntervalId = function( nId ) {
    this.intervalId = nId ;
  } ;

  // stops the game
  Game.prototype.stop = function() {

    this.parentWindow.clearInterval( this.intervalId ) ;

    this.isGameOn = false ;

    drawScript( oCanvas, 3, 18, 'v', this.scoreLayer, this.drawBlockSize ) ;
    drawScript( oCanvas, 7, 18, 'i', this.scoreLayer, this.drawBlockSize ) ;
    drawScript( oCanvas, 11, 18, 'c', this.scoreLayer, this.drawBlockSize ) ;
    drawScript( oCanvas, 15, 18, 't', this.scoreLayer, this.drawBlockSize ) ;
    drawScript( oCanvas, 19, 18, 'o', this.scoreLayer, this.drawBlockSize ) ;
    drawScript( oCanvas, 23, 18, 'i', this.scoreLayer, this.drawBlockSize ) ;
    drawScript( oCanvas, 27, 18, 'r', this.scoreLayer, this.drawBlockSize ) ;
    drawScript( oCanvas, 31, 18, 'e', this.scoreLayer, this.drawBlockSize ) ;
    document.getElementById( 'vic' ).play() ;

    // draws the ball at its current position
    this.context.fillStyle = this.context.fillStyle = this.scoreLayer.fillStyleOfPoint( this.ball.x, this.ball.y ) ;
    this.context.fillRect( this.ball.x * this.drawBlockSize, this.ball.y * this.drawBlockSize, this.drawBlockSize, this.drawBlockSize ) ;

  } ;


  // represents a Paddle
  function Paddle( game, x, y, nSide ) {

    this.game = game ;
    this.x = x ;
    this.y = y ;
    this.previousX = x ;
    this.previousY = -1 ;

    var sSide = nSide === LEFT_PADDLE ? "left" : "right" ;

    this.paddleRef = new Firebase( 'https://ponk.firebaseio.com/paddle/' + sSide ) ;
    this.size = PADDLE_SIZE ;
    this.context = oCanvas.getContext( "2d" ) ;

    var oThisPaddle = this ;

    // binds changes in the paddle's position to a handler method
    this.paddleRef.on( "value", function( snapshot ) {
      oThisPaddle.drawAtNewPosition( snapshot.val() ) ;
    }) ;

    // persists the object
    this.paddleRef.set({ x: this.x, y: this.y, previousX: this.previousX, previousY: this.previousY }) ;
  }

  // updates the position of the paddle from its previous Y-position to its new Y-position
  Paddle.prototype.move = function( vector ) {

    // finds the direction (1 or -1)
    var direction = ( vector > 0 ) ? 1 : -1 ;

    // finds the new Y co-ordinate
    var possibleOldY = this.y ;
    var possibleNewY = this.y + direction ;

    // checks if the new Y is within bounds
    if( possibleNewY >= 0 && ( possibleNewY + this.size ) <= BOARD_HEIGHT ) {
      // stores previous Y co-ordinate and updates to new Y co-ordinate
      this.previousY = possibleOldY ;
      this.y = possibleNewY ;

      // persists the object
      this.paddleRef.set({ x: this.x, y: this.y, previousX: this.previousX, previousY: this.previousY }) ;
    }
  } ;

  Paddle.prototype.drawAtNewPosition = function( paddleRef ) {

    // clears the paddle from its old position
    this.context.fillStyle = this.game.board.fillStyleOfPoint( paddleRef.previousX, paddleRef.previousY ) ;
    this.context.fillRect( paddleRef.previousX * DRAW_BLOCK_SIZE, paddleRef.previousY * DRAW_BLOCK_SIZE, DRAW_BLOCK_SIZE, PADDLE_SIZE * DRAW_BLOCK_SIZE ) ;

    // draws the paddle at its new position
    this.context.fillStyle = "white" ;
    this.context.fillRect( paddleRef.x * DRAW_BLOCK_SIZE, paddleRef.y * DRAW_BLOCK_SIZE, DRAW_BLOCK_SIZE, PADDLE_SIZE * DRAW_BLOCK_SIZE ) ;
  } ;

  // starts the game
  function startGame() {

    // draws the game board
    this.context = oCanvas.getContext( "2d" ) ;
    this.context.fillStyle = "black" ;
    this.context.fillRect( 0, 0, BOARD_WIDTH * DRAW_BLOCK_SIZE, BOARD_HEIGHT * DRAW_BLOCK_SIZE ) ;

    // creates the player list event
    var playerListRef = new Firebase( 'https://ponk.firebaseio.com/players' ) ;
    playerListRef.on( "value", function( snapshot ) {
      // checks if there is a free player
    }) ;

    // creates the ball event
    var ballRef = new Firebase( 'https://ponk.firebaseio.com/ball' ) ;

    // creates a game object and adds the ball event to it
    var game = new Game( ballRef ) ;
    game.newExchange() ;

    this.speedIntervalId = this.setInterval( function() {
      // moves the ball
      game.ball.move() ;
    }, 100 ) ;

    ballRef.on( "value", function( snapshot ) {
      game.ball.drawAtNewPosition( snapshot.val() ) ;
    }) ;

    game.setParentWindow( this ) ;
    game.setIntervalId( this.speedIntervalId ) ;
  }

  startGame() ;
});

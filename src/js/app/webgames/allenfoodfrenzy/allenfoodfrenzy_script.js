var allenFoodFrenzy = function() {
	var exports = {};
	var FPS = 30;
var SNAKE_BODY_INDEX = 3;
var BG_INDEX = 0;
var SNAKE_HEAD_INDEX = 2;
var BRICK_INDEX = 1;
var imageSourcesAr = new Array("/js/app/webgames/allenfoodfrenzy/images/background.png",
                               "/js/app/webgames/allenfoodfrenzy/images/brick.png",
							   "/js/app/webgames/allenfoodfrenzy/images/snakeHead.png",
							   "/js/app/webgames/allenfoodfrenzy/images/snakeBody.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_beercan.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_bread.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_cake.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_cookie.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_cottonCandy.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_egg.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_groceries.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_hotdog.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_milk.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_pie.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_pizza.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_pop.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_popcorn.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_rumroll.png",
							   "/js/app/webgames/allenfoodfrenzy/images/block_watermelon.png");
var WINDOW_WIDTH = 800;
var WINDOW_HEIGHT = 600;

var BLOCKS_ACROSS = 34;
var BLOCKS_DOWN = 25;
var BLOCK_WIDTH = 24;
var BLOCK_HEIGHT = 24;

var GAME_STATE_START = 0;
var GAME_STATE_PLAYING = 1;
var GAME_STATE_END = 2;
var GAME_STATE_INSTRUCTIONS = 3;

var DIRECTION_NONE = 0;
var DIRECTION_DOWN = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 3;
var DIRECTION_UP = 4;

var EMPTY_ID = 0;
var BRICK_ID = 1;
var SNAKE_HEAD_ID = 2;
var SNAKE_BODY_ID = 3;

var BLOCK_BEERCAN_ID = 4;
var BLOCK_BREAD_ID = 5;
var BLOCK_CAKE_ID = 6;
var BLOCK_COOKIE_ID = 7;
var BLOCK_COTTONCANDY_ID = 8
var BLOCK_EGG_ID = 9;
var BLOCK_GROCERIES_ID = 10;
var BLOCK_HOTDOG_ID = 11;
var BLOCK_MILK_ID = 12;
var BLOCK_PIE_ID = 13;
var BLOCK_PIZZA_ID = 14;
var BLOCK_POP_ID = 15;
var BLOCK_POPCORN_ID = 16;
var BLOCK_RUMROLL_ID = 17;
var BLOCK_WATERMELON_ID = 18;
//var APPLE_ID = 4;

var SNAKE_STARTING_LENGTH = 2;
var SNAKE_MAX_LENGTH = 20;
var SNAKE_STARTING_X = 12;
var SNAKE_STARTING_Y = 9;
var STARTING_DELAY = 10;
var MIN_DELAY = 2;

var STARTING_BRICKS = 1;

var canvas = null;
var context2D = null;

/*var bgImage = null;
var brickImage = null;
var snakeBodyImage = null;
var snakeHeadImage = null;
var beercanImage = null;
var breadImage = null;
var cakeImage = null;
var cookieImage = null;
var cottonCandyImage = null;
var eggImage = null;
var groceriesImage = null;
var hotdogImage = null;
var milkImage = null;
var pieImage = null;
var pizzaImage = null;
var popImage = null;
var popcornImage = null;
var rumrollImage = null;
var watermelonImage = null;*/
var imagesAr = null; // Array to hold all images, drawn based on image index

var snakeBody = null;
var snakeHead = null;
var apple = null;
var moveCounter = 0;
var moveDelay  = STARTING_DELAY;
var isMoving = false;
var snakeLength = SNAKE_STARTING_LENGTH;
var canChangeDirection = true; // set to false right after direction change, true when the first child has completed the pivot and is behind the head again.
var totalBricks = STARTING_BRICKS
var score = 0;
var isDying = false;
var dyingCounter = 0;
var dyingDelay = 5;
var isAppleReady = false;
var brickCount = 0;
var gameState = GAME_STATE_START;
var collectedAppleX = new Array();
var collectedAppleY = new Array();
var numberOfBricks = STARTING_BRICKS;

var board = new Array();	
board[0] =  [  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0  ];
board[1] =  [  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1  ];
board[2] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[3] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[4] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[5] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[6] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[7] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[8] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[9] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[10] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[11] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[12] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[13] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[14] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[15] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[16] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[17] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[18] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[19] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[20] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[21] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[22] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[23] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
board[24] = [  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1  ];

var intervalId = -1; // used to control if there is already an interval set or not.
var moveAppleIntervalId = -1;
var pointIncrementInterval = -1;

var keys = new Array();

var utilities = gameUtilities();

document.addEventListener('keydown',keyDown,true);
document.addEventListener('keyup',keyUp,true);
function keyDown(evt)
{
	keys[evt.keyCode] = true;
	evt.returnValue = false;
}
function keyUp(evt)
{
	keys[evt.keyCode] = false;
	evt.returnValue = false;
}

//window.onload = loadGame;

function Sprite(posX, posY, width, height, alive)
{
	this.x = posX;
	this.y = posY;
	this.pivotPointX = new Array();
	this.pivotPointY = new Array();
	this.pivotDirection = new Array();
	this.width = width;
	this.height = height;
	this.alive = alive;
	this.direction = DIRECTION_RIGHT;
} // end Sprite

function loadGameValues()
{
	moveCounter = 0;
	moveDelay  = STARTING_DELAY;
	isMoving = false;
	snakeLength = SNAKE_STARTING_LENGTH;
	canChangeDirection = true
	snakeHead.pivotPointX.length = 0;
	snakeHead.pivotPointY.length = 0;
	snakeHead.pivotDirection.length = 0;
	for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
	{
		snakeBody[i].pivotPointX.length = 0;
		snakeBody[i].pivotPointY.length = 0;
		snakeBody[i].pivotDirection.length = 0;
	}
	resetAppleInterval();
	if (pointIncrementInterval != -1)
		clearInterval(pointIncrementInterval);
	pointIncrementInterval = setInterval(incrementScore, 2000);
	totalBricks = STARTING_BRICKS
	score = 0;
	isDying = false;
	dyingCounter = 0;
	dyingDelay = 5;
	isAppleReady = false;
	brickCount = 0;
	collectedAppleX = new Array();
	collectedAppleY = new Array();
	numberOfBricks = STARTING_BRICKS;
	
	snakeHead.x = SNAKE_STARTING_X;
	snakeHead.y = SNAKE_STARTING_Y;
	snakeHead.direction = DIRECTION_RIGHT;
	
	for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
	{
		snakeBody[i].x = snakeHead.x-(i+1);
		snakeBody[i].y = snakeHead.y;
		snakeBody[i].direction = DIRECTION_RIGHT;
		snakeBody[i].alive = false;
	}
	for (var i = 0; i < SNAKE_STARTING_LENGTH; i++)
		snakeBody[i].alive = true;
	resetBoard();
	placeAllen();
	placeBricks();
	placeApple();
}

function placeAllen()
{
	board[snakeHead.y][snakeHead.x] = SNAKE_HEAD_ID;
	for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
	{
		if (snakeBody[i].alive == true)
			board[snakeBody[i].y][snakeBody[i].x] = SNAKE_BODY_ID;
	}
}

function placeBricks()
{
	var placeX = utilities.randomFromTo(1, BLOCKS_ACROSS-1);
	var placeY = utilities.randomFromTo(2, BLOCKS_DOWN-1);
	for (var i = 0; i < totalBricks; i++)
	{
		while (board[placeY][placeX] == BRICK_ID || board[placeY][placeX] == SNAKE_HEAD_ID || board[placeY][placeX] == SNAKE_BODY_ID)
		{
			placeX = utilities.randomFromTo(1, BLOCKS_ACROSS-1);
			placeY = utilities.randomFromTo(2, BLOCKS_DOWN-1);
		}
		board[placeY][placeX] = BRICK_ID;
	}
}

function setAppleMove()
{
	isAppleReady = true;
}

function incrementScore()
{
	if (isDying == false)
		score++;
}

function placeApple()
{
	if (isDying == false)
	{
		//if (board[apple.y][apple.x] == APPLE_ID)
		if (board[apple.y][apple.x] > 3)
			board[apple.y][apple.x] = EMPTY_ID
		var placeX = utilities.randomFromTo(1, BLOCKS_ACROSS-1);
		var placeY = utilities.randomFromTo(2, BLOCKS_DOWN-1);
		for (var i = 0; i < totalBricks; i++)
		{
			while (board[placeY][placeX] == BRICK_ID || board[placeY][placeX] == SNAKE_HEAD_ID || board[placeY][placeX] == SNAKE_BODY_ID)
			{
				placeX = utilities.randomFromTo(1, BLOCKS_ACROSS-1);
				placeY = utilities.randomFromTo(2, BLOCKS_DOWN-1);
			}
			apple.x = placeX;
			apple.y = placeY;
			board[placeY][placeX] = utilities.randomFromTo(4, 18);
		}
	}
}

function resetBoard()
{
	board[0] =  [  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0  ];
	board[1] =  [  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1  ];
	board[2] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[3] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[4] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[5] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[6] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[7] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[8] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[9] =  [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[10] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[11] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[12] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[13] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[14] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[15] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[16] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[17] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[18] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[19] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[20] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[21] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[22] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[23] = [  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1  ];
	board[24] = [  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1  ];
}

function resetAppleInterval()
{
	if (moveAppleIntervalId != -1)
		clearInterval(moveAppleIntervalId);
	moveAppleIntervalId = setInterval(setAppleMove, 10000);
}

exports.loadGame = function()
{
	canvas = document.getElementById('gameBoard');
	context2D = canvas.getContext('2d');
	imagesAr = new Array();
	for (var i = 0; i < imageSourcesAr.length; i++)
	{
		imagesAr[i] = new Image();
		imagesAr[i].src = imageSourcesAr[i];
	}
	//bgImage = new Image();
	//bgImage.src = SOURCE_BACKGROUND_IMAGE
	
//	snakeHeadImage = new Image();
//	snakeHeadImage.src = SOURCE_SNAKEHEAD_IMAGE;
	
//	snakeBodyImage = new Image();
//	snakeBodyImage.src = SOURCE_SNAKEBODY_IMAGE;
	
//	beercanImage = new Image():
//	beercanImage.src = SOURCE_BLOCK_BEERCAN_IMAGE;
	
	//appleImage = new Image();
	//appleImage.src = SOURCE_APPLE_IMAGE;
	
	snakeHead = new Sprite(SNAKE_STARTING_X, SNAKE_STARTING_Y, BLOCK_WIDTH, BLOCK_HEIGHT, true);
	
	snakeBody = new Array();
	for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
		snakeBody[i] = new Sprite(snakeHead.x-(i+1), snakeHead.y, BLOCK_WIDTH, BLOCK_HEIGHT, false);
	for (var i = 0; i < SNAKE_STARTING_LENGTH; i++)
		snakeBody[i].alive = true;
	
	apple = new Sprite(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT, true);
	
	//brickImage = new Image();
	//brickImage.src = './images/brick.png';
	
	if (intervalId != -1) // This means an interval has been set
		clearInterval(intervalId);
	intervalId = setInterval(mainLoop, 1000 / FPS);

	gameState = GAME_STATE_START;
} // end loadGame

function mainLoop()
{
	context2D.fillStyle="black";
	context2D.drawImage(imagesAr[BG_INDEX], 0, 0);
	
	getInput();
	if (gameState == GAME_STATE_START)
	{
		drawStartScreen();
	}
	
	else if (gameState == GAME_STATE_INSTRUCTIONS)
	{
		drawInstructionsScreen();
	}
	
	else if (gameState == GAME_STATE_PLAYING)
	{
		if (isDying == false)
		{
			if (isAppleReady == true)
			{
				placeApple();
				isAppleReady = false;
			}
			updateSnakeBody();
			if (isMoving == true)
			{
				if (++moveCounter > moveDelay)
				{
					moveSnake();
					moveSnakeBody();
					moveCounter = 0;
				}
			}
			
		}
		else
		{
			updateDyingSnake();
		}
		drawBoard();
		drawHeading();
		if (isDying == true)
		{
			context2D.save();
			context2D.fillStyle = "FF0000";
			context2D.globalAlpha = 0.4;
			context2D.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
			context2D.restore();
		}
	}
	else if (gameState == GAME_STATE_INSTRUCTIONS)
	{
	}
	else if (gameState == GAME_STATE_END)
	{
		drawEndScreen();
	}
}

function getInput()
{
	if (gameState == GAME_STATE_START)
    {
        if ((13 in keys && keys[13])) // enter key is pressed
        {
            gameState = GAME_STATE_PLAYING;
			loadGameValues();
        }
        if ((73 in keys && keys[73]) || (105 in keys && keys[105])) // I key is pressed
        {
            gameState = GAME_STATE_INSTRUCTIONS;
        }
    }
	
	else if (gameState == GAME_STATE_INSTRUCTIONS)
    {
        if ((66 in keys && keys[66]) || (98 in keys && keys[98])) // B key is pressed
        {
            gameState = GAME_STATE_START;
        }
    }
	
	else if (gameState == GAME_STATE_END)
	{
		if ((69 in keys && keys[69]) || (101 in keys && keys[101])) // E key is pressed
            gameState = GAME_STATE_START;
	}
	
	else if (gameState == GAME_STATE_PLAYING)
	{
		if (isDying == false)
		{
			if (canChangeDirection == true)
			{
				// Left
				if ((37 in keys && keys[37]) || (65 in keys && keys[65]))
				{
					if (snakeHead.direction == DIRECTION_UP || snakeHead.direction == DIRECTION_DOWN)
					{
						snakeHead.direction = DIRECTION_LEFT;
						for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
						{
							snakeBody[i].pivotPointX.push(snakeHead.x);
							snakeBody[i].pivotPointY.push(snakeHead.y);
							snakeBody[i].pivotDirection.push(snakeHead.direction);
						}
						canChangeDirection = false;
					}
				}
	
				// Right
				else if ((39 in keys && keys[39]) || (68 in keys && keys[68]))
				{ 
					if (isMoving == false)
						isMoving = true;
		
					if (snakeHead.direction == DIRECTION_UP || snakeHead.direction == DIRECTION_DOWN)
					{
						snakeHead.direction = DIRECTION_RIGHT;
						for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
						{
							snakeBody[i].pivotPointX.push(snakeHead.x);
							snakeBody[i].pivotPointY.push(snakeHead.y);
							snakeBody[i].pivotDirection.push(snakeHead.direction);
						}
						canChangeDirection = false;
					}
				}
	
				// Down
				else if ((40 in keys && keys[40]) || (83 in keys && keys[83]))
				{
					if (isMoving == false)
						isMoving = true;
		
					if (snakeHead.direction == DIRECTION_RIGHT || snakeHead.direction == DIRECTION_LEFT)
					{
						snakeHead.direction = DIRECTION_DOWN;
						for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
						{
							snakeBody[i].pivotPointX.push(snakeHead.x);
							snakeBody[i].pivotPointY.push(snakeHead.y);
							snakeBody[i].pivotDirection.push(snakeHead.direction);
						}
						canChangeDirection = false;
					}
				}
	
				// Up
				else if ((38 in keys && keys[38]) || (87 in keys && keys[87]))
				{
					if (isMoving == false)
						isMoving = true;
		
					if (snakeHead.direction == DIRECTION_RIGHT || snakeHead.direction == DIRECTION_LEFT)
					{
						snakeHead.direction = DIRECTION_UP;
						for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
						{
							snakeBody[i].pivotPointX.push(snakeHead.x);
							snakeBody[i].pivotPointY.push(snakeHead.y);
							snakeBody[i].pivotDirection.push(snakeHead.direction);
						}
						canChangeDirection = false;
					}
				}
			} // end if canMove
		} // end is not dying yet
	} // end playing state
} // end getInput

// Move the snake around the screen
function moveSnake()
{
   	if (snakeHead.direction == DIRECTION_UP)
	{
		board[snakeHead.y][snakeHead.x] = EMPTY_ID;
		snakeHead.y--;
		if (board[snakeHead.y][snakeHead.x] == BRICK_ID || board[snakeHead.y][snakeHead.x] == SNAKE_BODY_ID)
			isDying = true;
		
		else if (board[snakeHead.y][snakeHead.x] > 3)
		{
			if (snakeLength < SNAKE_MAX_LENGTH)
			{
				snakeLength++;
				snakeBody[snakeLength-1].alive = true;
			}
			if (moveDelay > MIN_DELAY)
			{
				moveDelay--;
			}
			score = score + (10*numberOfBricks);
			collectedAppleX.push(apple.x);
			collectedAppleY.push(apple.y);
			isAppleReady = true;
			resetAppleInterval();
		}
		board[snakeHead.y][snakeHead.x] = SNAKE_HEAD_ID;
	}
	if (snakeHead.direction == DIRECTION_RIGHT)
	{
		board[snakeHead.y][snakeHead.x] = EMPTY_ID;
		snakeHead.x++;
		if (board[snakeHead.y][snakeHead.x] == BRICK_ID || board[snakeHead.y][snakeHead.x] == SNAKE_BODY_ID)
			isDying = true;
		else if (board[snakeHead.y][snakeHead.x] > 3)
		{
			if (snakeLength < SNAKE_MAX_LENGTH)
			{
				snakeLength++;
				snakeBody[snakeLength-1].alive = true;
			}
			if (moveDelay > MIN_DELAY)
			{
				moveDelay--;
			}
			score = score + (10*numberOfBricks);
			collectedAppleX.push(apple.x);
			collectedAppleY.push(apple.y);
			isAppleReady = true;
			resetAppleInterval();
		}
		board[snakeHead.y][snakeHead.x] = SNAKE_HEAD_ID;
	}
	if (snakeHead.direction == DIRECTION_DOWN)
	{
		board[snakeHead.y][snakeHead.x] = EMPTY_ID;
		snakeHead.y++;
		if (board[snakeHead.y][snakeHead.x] == BRICK_ID || board[snakeHead.y][snakeHead.x] == SNAKE_BODY_ID)
			isDying = true;
		else if (board[snakeHead.y][snakeHead.x] > 3)
		{
			if (snakeLength < SNAKE_MAX_LENGTH)
			{
				snakeLength++;
				snakeBody[snakeLength-1].alive = true;
			}
			if (moveDelay > MIN_DELAY)
			{
				moveDelay--;
			}
			score = score + (10*numberOfBricks);
			collectedAppleX.push(apple.x);
			collectedAppleY.push(apple.y);
			isAppleReady = true;
			resetAppleInterval();
		}
		board[snakeHead.y][snakeHead.x] = SNAKE_HEAD_ID;
	}
	if (snakeHead.direction == DIRECTION_LEFT)
	{
		board[snakeHead.y][snakeHead.x] = EMPTY_ID;
		snakeHead.x--;
		if (board[snakeHead.y][snakeHead.x] == BRICK_ID || board[snakeHead.y][snakeHead.x] == SNAKE_BODY_ID)
			isDying = true;
		else if (board[snakeHead.y][snakeHead.x] > 3)
		{
			if (snakeLength < SNAKE_MAX_LENGTH)
			{
				snakeLength++;
				snakeBody[snakeLength-1].alive = true;
			}
			if (moveDelay > MIN_DELAY)
			{
				moveDelay--;
			}
			score = score + (10*numberOfBricks);
			collectedAppleX.push(apple.x);
			collectedAppleY.push(apple.y);
			isAppleReady = true;
			resetAppleInterval();
		}
		board[snakeHead.y][snakeHead.x] = SNAKE_HEAD_ID;
	}
} // moveSnake

// Move the snake body around the screen
function moveSnakeBody()
{
	for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
	{
		if (snakeBody[i].direction == DIRECTION_UP)
		{
			if (snakeBody[i].alive == true && board[snakeBody[i].y][snakeBody[i].x] != BRICK_ID && board[snakeBody[i].y][snakeBody[i].x] < 4)
				board[snakeBody[i].y][snakeBody[i].x] = EMPTY_ID;
			snakeBody[i].y--;
			if (snakeBody[i].alive == true)
				board[snakeBody[i].y][snakeBody[i].x] = SNAKE_BODY_ID;
		}
		if (snakeBody[i].direction == DIRECTION_RIGHT)
		{
			if (snakeBody[i].alive == true && board[snakeBody[i].y][snakeBody[i].x] != BRICK_ID && board[snakeBody[i].y][snakeBody[i].x] < 4)
				board[snakeBody[i].y][snakeBody[i].x] = EMPTY_ID;
			snakeBody[i].x++;
			if (snakeBody[i].alive == true)
				board[snakeBody[i].y][snakeBody[i].x] = SNAKE_BODY_ID;
		}
		if (snakeBody[i].direction == DIRECTION_DOWN)
		{
			if (snakeBody[i].alive == true && board[snakeBody[i].y][snakeBody[i].x] != BRICK_ID && board[snakeBody[i].y][snakeBody[i].x] < 4)
				board[snakeBody[i].y][snakeBody[i].x] = EMPTY_ID;
			snakeBody[i].y++;
			if (snakeBody[i].alive == true)
				board[snakeBody[i].y][snakeBody[i].x] = SNAKE_BODY_ID;
		}
		if (snakeBody[i].direction == DIRECTION_LEFT)
		{
			if (snakeBody[i].alive == true && board[snakeBody[i].y][snakeBody[i].x] != BRICK_ID && board[snakeBody[i].y][snakeBody[i].x] < 4)
				board[snakeBody[i].y][snakeBody[i].x] = EMPTY_ID;
			snakeBody[i].x--;
			if (snakeBody[i].alive == true)
				board[snakeBody[i].y][snakeBody[i].x] = SNAKE_BODY_ID;
		}
	}
	// Add brick to end of snake after an apple has been collected
	if (collectedAppleX.length > 0)
	{
		if (snakeBody[snakeLength-1].x == collectedAppleX[0] && snakeBody[snakeLength-1].y == collectedAppleY[0])
		{
			numberOfBricks++;
			board[collectedAppleY[0]][collectedAppleX[0]] = BRICK_ID;
			collectedAppleY.shift();
			collectedAppleX.shift();
		}
	}
} // moveSnakeBody

function updateDyingSnake()
{
	if (++dyingCounter > dyingDelay)
	{
		if (snakeLength > 0)
		{
			board[snakeBody[snakeLength-1].y][snakeBody[snakeLength-1].x] = EMPTY_ID;
			snakeLength--;
		}
		else
		{
			board[snakeHead.y][snakeHead.x] = EMPTY_ID;
			snakeHead.alive = false;
		}
		if (snakeLength <= 0 && snakeHead.alive == false)
			gameState = GAME_STATE_END;
		
		dyingCounter = 0;
	}
}

function updateSnakeBody()
{
	var index = 0;
	var valX;
	var valY;
	for (var i = 0; i < SNAKE_MAX_LENGTH; i++)
	{
		if (snakeBody[i].x == snakeBody[i].pivotPointX[0] && snakeBody[i].y == snakeBody[i].pivotPointY[0])
		{
			snakeBody[i].direction = snakeBody[i].pivotDirection[0];
			if (i == 0)
				canChangeDirection = true;
				
			snakeBody[i].pivotPointX.shift();
			snakeBody[i].pivotPointY.shift();
			snakeBody[i].pivotDirection.shift();
		
		}
	}
}

function drawBoard()
{
	for (var y = 0; y < BLOCKS_DOWN; y++)
	{
		for (var x = 0; x < BLOCKS_ACROSS; x++)
		{
			//context2D.drawImage(imagesAr[board[y][x]], x*BLOCK_WIDTH, y*BLOCK_HEIGHT);
			context2D.drawImage(imagesAr[board[y][x]], 0, 0, imagesAr[board[y][x]].width, imagesAr[board[y][x]].height, x*BLOCK_WIDTH, y*BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
			/*if (board[y][x] == BRICK_ID)
				context2D.drawImage(brickImage, x*BLOCK_WIDTH, y*BLOCK_HEIGHT);
				
			else if (board[y][x] == SNAKE_HEAD_ID)
				context2D.drawImage(snakeHeadImage, x*BLOCK_WIDTH, y*BLOCK_HEIGHT);
				
			else if (board[y][x] == SNAKE_BODY_ID)
				context2D.drawImage(snakeBodyImage, x*BLOCK_WIDTH, y*BLOCK_HEIGHT);
			else if (board[y][x] == APPLE_ID)
				context2D.drawImage(appleImage, x*BLOCK_WIDTH, y*BLOCK_WIDTH);
			*/
		}
	}
}

function drawStartScreen()
{
	context2D.filleStyle="black";
	context2D.fillRect(100, 100, 600, 400);
	utilities.drawCanvasText(context2D, "Allen's Food Frenzy", 300, 200, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "Press Enter to Start", 200, 300, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "Press I for Instructions", 420, 360, "white", "16px courier new");
	var startx = 268;
	var starty = 150;
	while (startx < 500)
	{
		context2D.drawImage(imagesAr[SNAKE_BODY_INDEX], startx+BLOCK_WIDTH, 150);
		startx += BLOCK_WIDTH;
	}
	while (starty < 300)
	{
		context2D.drawImage(imagesAr[SNAKE_BODY_INDEX], startx, starty+BLOCK_HEIGHT);
		starty += BLOCK_HEIGHT;
	}
	while (startx > 264)
	{
		context2D.drawImage(imagesAr[SNAKE_BODY_INDEX], startx-BLOCK_WIDTH, starty);
		startx -= BLOCK_WIDTH;
	}
	context2D.drawImage(imagesAr[SNAKE_HEAD_INDEX], startx-BLOCK_WIDTH, starty);
}

function drawEndScreen()
{
	context2D.filleStyle="black";
	context2D.fillRect(100, 100, 600, 400);
	utilities.drawCanvasText(context2D, "Thanks for Playing!", 300, 200, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "Final Score: "+score, 200, 300, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "Press E to end game", 420, 360, "white", "16px courier new");
	var startx = 268;
	var starty = 150;
	while (startx < 500)
	{
		context2D.drawImage(imagesAr[SNAKE_BODY_INDEX], startx+BLOCK_WIDTH, 150);
		startx += BLOCK_WIDTH;
	}
	while (starty < 300)
	{
		context2D.drawImage(imagesAr[SNAKE_BODY_INDEX], startx, starty+BLOCK_HEIGHT);
		starty += BLOCK_HEIGHT;
	}
	while (startx > 264)
	{
		context2D.drawImage(imagesAr[SNAKE_BODY_INDEX], startx-BLOCK_WIDTH, starty);
		startx -= BLOCK_WIDTH;
	}
	context2D.drawImage(imagesAr[SNAKE_HEAD_INDEX], startx-BLOCK_WIDTH, starty);
}

function drawInstructionsScreen()
{
	context2D.filleStyle="black";
	context2D.fillRect(100, 100, 600, 400);
	utilities.drawCanvasText(context2D, "Use the arrow keys to move Allen around the field", 114, 116, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "collecting food.", 114, 136, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "Be sure to avoid the bricks and yourself!", 114, 156, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "This sounds simple right...", 124, 196, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "Press B to go back", 450, 450, "white", "16px courier new");
	
	var startx = 140;
	var starty = 300;
	while (startx < 332)
	{
		context2D.drawImage(imagesAr[SNAKE_BODY_INDEX], startx+BLOCK_WIDTH, starty);
		startx += BLOCK_WIDTH;
	}
	context2D.drawImage(imagesAr[SNAKE_HEAD_INDEX], startx+BLOCK_WIDTH, starty);
	context2D.drawImage(imagesAr[BRICK_INDEX], startx+BLOCK_WIDTH, starty-(BLOCK_WIDTH*2));
	context2D.drawImage(imagesAr[BRICK_INDEX], startx+(BLOCK_WIDTH*3), starty);
	context2D.drawImage(imagesAr[BRICK_INDEX], startx-(BLOCK_WIDTH*3), starty+(BLOCK_WIDTH*3));
	context2D.drawImage(imagesAr[6], 0, 0, imagesAr[6].width, imagesAr[6].height, startx+(BLOCK_WIDTH*3), starty+(BLOCK_WIDTH*2), BLOCK_WIDTH, BLOCK_HEIGHT);
}

function drawHeading()
{
	context2D.fillStyle="black";
	context2D.fillRect(0, 0, WINDOW_WIDTH, BLOCK_HEIGHT);
	utilities.drawCanvasText(context2D, "Allen's Food Frenzy", 4, 20, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "Score: "+score, 400, 20, "white", "16px courier new");
} // end drawHeading

function printDebug()
{
	
	var startX = 10;
	var startY = 10;
	utilities.drawCanvasText(context2D, "Length: "+snakeLength, startX, startY, "white", "16px courier new");
	utilities.drawCanvasText(context2D, "Max Length: "+SNAKE_MAX_LENGTH, startX, startY+40, "white", "16px courier new");
}

// Takes 2 object references and assigns all values in rhs to lhs
// equivilent to saying lhs = rhs but sets VALUES, not reference.
function copyObject(lhs,rhs)
{
    var i;
    for (i in rhs)
	{
		lhs[i] = rhs[i];
	}
}
exports.title = "Allen Food Frenzy";
return exports;
}
var circusShooter = function() {
	var exports = {};
var SOURCE_BALL_IMAGE = '/js/app/webgames/circusshooter/images/sphere1.png';
var SOURCE_BG_IMAGE = '/js/app/webgames/circusshooter/images/bg2.png';
var SOURCE_DEAD_BALL_IMAGE = '/js/app/webgames/circusshooter/images/deadball.png';
var SOURCE_CROSSHAIR_IMAGE = '/js/app/webgames/circusshooter/images/crosshair3.png';

var SOURCE_BUTTON_PLAYGAME_DOWN = "/js/app/webgames/circusshooter/images/button_playgame_downstate.png";
var SOURCE_BUTTON_PLAYGAME_UP = "/js/app/webgames/circusshooter/images/button_playgame_upstate.png";
var SOURCE_BUTTON_INSTRUCTIONS_DOWN = "/js/app/webgames/circusshooter/images/button_instructions_downstate.png";
var SOURCE_BUTTON_INSTRUCTIONS_UP = "/js/app/webgames/circusshooter/images/button_instructions_upstate.png";
var SOURCE_BUTTON_BACK_DOWN = "/js/app/webgames/circusshooter/images/button_back_downstate.png";
var SOURCE_BUTTON_BACK_UP = "/js/app/webgames/circusshooter/images/button_back_upstate.png";
var SOURCE_BUTTON_END_DOWN = "/js/app/webgames/circusshooter/images/button_end_downstate.png";
var SOURCE_BUTTON_END_UP = "/js/app/webgames/circusshooter/images/button_end_upstate.png";

var FPS = 30;

var GAME_STATE_START = 0;
var GAME_STATE_PLAYING = 1;
var GAME_STATE_END = 2;
var GAME_STATE_INSTRUCTIONS = 3;

var CIRCUS_BALL_WIDTH = 64;
var CIRCUS_BALL_HEIGHT = 64;
var SPRITE_SHEET_WIDTH = 512;
var SPRITE_SHEET_HEIGHT = 256;

var MAX_TOTAL_BALLS = 2;
var MAX_SCALE_INCREMENT = 5;
var START_SCALE_INCREMENT = 2;
var MAX_SCALE = 192;
var BALL_DYING_VELOCITY = 50;
var BALL_DEFAULT_SCALE = 5;
var BALL_INCREASE_SCALE_INCREMENT = 5;

var SCORE_MULTIPLIER = 2;

var canvas = null;
var context2D = null;
var bgImage = null;

var balls = null;
var ballImage = null;
var deadBallImage = null;

var crosshairImage = null;

var livesLeft = 9;
var score = 0;
var totalBalls = 1;
var scaleIncrement = START_SCALE_INCREMENT;
var scoreBallsDestroyed = 0;
var ballsDestroyed = 0;
var gameState = GAME_STATE_START;

var intervalId = -1;

var button_Back = null
var button_BackDownStateImage = null;
var button_BackUpStateImage = null;
var button_End = null;
var button_EndDownStateImage = null;
var button_EndUpStateImage = null;
var button_Instructions = null;
var button_InstructionsDownStateImage = null;
var button_InstructionsUpStateImage = null;
var button_PlayGame = null;
var button_PlayGameDownStateImage = null;
var button_PlayGameUpStateImage = null;
var button_balls = null;

var mpressed = false;
var prev_mpressed = false;

//window.onload = loadGame;

var utilities = gameUtilities();

//window.addEventListener('mousemove', mouseMoved, true);
//window.addEventListener('mouseup', onMouseUp, true);
//window.addEventListener('mousedown', onMouseDown, true);
//window.addEventListener('click', clicked, true);
if ('ontouchstart' in document.documentElement)
{
	window.addEventListener("touchstart", onMouseDown, false);
}
else
{
	window.addEventListener('mousedown', onMouseDown, true);
}
if ('ontouchend' in document.documentElement)
{
	window.addEventListener("touchend", onMouseUp, false);
	window.addEventListener("touchend", clicked, false);
}
else
{
	window.addEventListener('mouseup', onMouseUp, true);
	window.addEventListener('click', clicked, true);
}
var mouseX = 0;
var mouseY = 0;
//var mouseImage = null;

function onMouseDown(e)
{
	if (e.changedTouches)
	{
		mouseX = e.changedTouches[0].pageX;
		mouseY = e.changedTouches[0].pageY;
		mouseX -= canvas.offsetLeft;
		mouseY -= canvas.offsetTop;
	}
	else
		mouseMoved(e);
	prev_mpressed = mpressed;
	mpressed = true;
} // end onMouseDown

function onMouseUp(e)
{
	if (e.changedTouches)
	{
		mouseX = e.changedTouches[0].pageX;
		mouseY = e.changedTouches[0].pageY;
		mouseX -= canvas.offsetLeft;
		mouseY -= canvas.offsetTop;
	}
	else
		mouseMoved(e);
	prev_mpressed = mpressed;
    mpressed = false;
} // end clicked

function mouseMoved(e)
{ 
	if (e.pageX || e.pageY)
	{ 
		mouseX = e.pageX;
		mouseY = e.pageY;
	}
	else
	{ 
		mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	mouseX -= canvas.offsetLeft;
	mouseY -= canvas.offsetTop;
} // end mouseMoved

function clicked(e)
{
	if (e.changedTouches)
	{
		mouseX = e.changedTouches[0].pageX;
		mouseY = e.changedTouches[0].pageY;
		mouseX -= canvas.offsetLeft;
		mouseY -= canvas.offsetTop;
	}
	else
		mouseMoved(e);
	
	var crosshairMiddleX = mouseX+(crosshairImage.width/2);
	var crosshairMiddleY = mouseY+(crosshairImage.height/2);
	for (var i = 0; i < totalBalls; i++)
	{
		if (balls[i].alive == true)
		{
			if (utilities.inside(crosshairMiddleX, crosshairMiddleY, balls[i].posX, balls[i].posY, balls[i].posX+balls[i].scaleX, balls[i].posY+balls[i].scaleY))
			{
				balls[i].alive = false;
				ballsDestroyed++;
				scoreBallsDestroyed++;
				score += SCORE_MULTIPLIER * scoreBallsDestroyed;
				
				// Check if balls destroyed is greater then threshold to do something
				if (ballsDestroyed >= BALL_INCREASE_SCALE_INCREMENT)
				{
					// if the scaleIncrement is less then the max, then just increment the scale.
					if (scaleIncrement < MAX_SCALE_INCREMENT)
					{
						scaleIncrement++;
						ballsDestroyed = 0;
					}
					else if (scaleIncrement >= MAX_SCALE_INCREMENT)
					{
						if (totalBalls < MAX_TOTAL_BALLS)
						{
							totalBalls++;
							ballsDestroyed = 0;
						}
						else if (totalBalls >= MAX_TOTAL_BALLS) // Even though the "max" has been hit, that's just the max for before there's 2 balls.
						{
							if (ballsDestroyed >= BALL_INCREASE_SCALE_INCREMENT*2) // Multiply it by 2 here because there's now 2 balls.
							{
								if (scaleIncrement < 9) // 9 is the ultimate max for scale speed.
								{
									scaleIncrement++;
								}
								ballsDestroyed = 0;
							}
						}
					} // end else the scaleIncrement is greater then the max.
				} // end is balls destroyed greater then threshold
				break; // Break so only 1 ball can be "shot" at a time.
			} // end is there a collision
		} // end is ball alive
	} // end loop through balls
} // end clicked


/*
window.addEventListener('mousemove', mouseMoved, true);
window.addEventListener('mouseup', onMouseUp, true);
window.addEventListener('mousedown', onMouseDown, true);
window.addEventListener('click', clicked, true);

var mouseX = 0;
var mouseY = 0;
//var mouseImage = null;

function onMouseDown(e)
{
	prev_mpressed = mpressed;
	mpressed = true;
} // end onMouseDown

function onMouseUp(e)
{
	prev_mpressed = mpressed;
    mpressed = false;
} // end clicked

function mouseMoved(e)
{ 
	if (e.pageX || e.pageY)
	{ 
		mouseX = e.pageX;
		mouseY = e.pageY;
	}
	else
	{ 
		mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	mouseX -= canvas.offsetLeft;
	mouseY -= canvas.offsetTop;
} // end mouseMoved

function clicked(e)
{
	var crosshairMiddleX = mouseX+(crosshairImage.width/2);
	var crosshairMiddleY = mouseY+(crosshairImage.height/2);
	for (var i = 0; i < totalBalls; i++)
	{
		if (balls[i].alive == true)
		{
			if (inside(crosshairMiddleX, crosshairMiddleY, balls[i].posX, balls[i].posY, balls[i].posX+balls[i].scaleX, balls[i].posY+balls[i].scaleY))
			{
				balls[i].alive = false;
				ballsDestroyed++;
				scoreBallsDestroyed++;
				score += SCORE_MULTIPLIER * scoreBallsDestroyed;
				
				// Check if balls destroyed is greater then threshold to do something
				if (ballsDestroyed >= BALL_INCREASE_SCALE_INCREMENT)
				{
					// if the scaleIncrement is less then the max, then just increment the scale.
					if (scaleIncrement < MAX_SCALE_INCREMENT)
					{
						scaleIncrement++;
						ballsDestroyed = 0;
					}
					else if (scaleIncrement >= MAX_SCALE_INCREMENT)
					{
						if (totalBalls < MAX_TOTAL_BALLS)
						{
							totalBalls++;
							ballsDestroyed = 0;
						}
						else if (totalBalls >= MAX_TOTAL_BALLS) // Even though the "max" has been hit, that's just the max for before there's 2 balls.
						{
							if (ballsDestroyed >= BALL_INCREASE_SCALE_INCREMENT*2) // Multiply it by 2 here because there's now 2 balls.
							{
								if (scaleIncrement < 9) // 9 is the ultimate max for scale speed.
								{
									scaleIncrement++;
								}
								ballsDestroyed = 0;
							}
						}
					} // end else the scaleIncrement is greater then the max.
				} // end is balls destroyed greater then threshold
				break; // Break so only 1 ball can be "shot" at a time.
			} // end is there a collision
		} // end is ball alive
	} // end loop through balls
} // end clicked
*/
function Ball(posX, posY, alive)
{
	this.posX = posX;
	this.posY = posY;
	this.alive = alive;
	this.frameX = 0;
	this.frameY = 0;
	this.scaleX = 5;
	this.scaleY = 5;
	this.velY = 0;
} // end Object Ball

exports.loadGame = function()
{
	canvas = document.getElementById('gameBoard');
	context2D = canvas.getContext('2d');
	bgImage = new Image();
	bgImage.src = SOURCE_BG_IMAGE;
	
	ballImage = new Image();
	ballImage.src = SOURCE_BALL_IMAGE;
	
	deadBallImage = new Image();
	deadBallImage.src = SOURCE_DEAD_BALL_IMAGE;
	
	crosshairImage = new Image();
	crosshairImage.src = SOURCE_CROSSHAIR_IMAGE;
	
	balls = new Array();
	balls[0] = new Ball(0, 0, false);
	balls[1] = new Ball(0, 0, false);
	ballVelY = 0;
	
	gameState = GAME_STATE_START;
	
	button_PlayGameDownStateImage = new Image();
	button_PlayGameDownStateImage.src = SOURCE_BUTTON_PLAYGAME_DOWN;
	button_PlayGameUpStateImage = new Image();
	button_PlayGameUpStateImage.src = SOURCE_BUTTON_PLAYGAME_UP;
	button_InstructionsDownStateImage = new Image();
	button_InstructionsDownStateImage.src = SOURCE_BUTTON_INSTRUCTIONS_DOWN;
	button_InstructionsUpStateImage = new Image();
	button_InstructionsUpStateImage.src = SOURCE_BUTTON_INSTRUCTIONS_UP;
	button_BackDownStateImage = new Image();
	button_BackDownStateImage.src = SOURCE_BUTTON_BACK_DOWN;
	button_BackUpStateImage = new Image();
	button_BackUpStateImage.src = SOURCE_BUTTON_BACK_UP;
	button_EndDownStateImage = new Image();
	button_EndDownStateImage.src = SOURCE_BUTTON_END_DOWN;
	button_EndUpStateImage = new Image();
	button_EndUpStateImage.src = SOURCE_BUTTON_END_UP;
	
	button_PlayGame = new Button(100, 200, 200, 75, button_PlayGameUpStateImage, button_PlayGameDownStateImage, false, true, STATE_UP);
	button_Instructions = new Button(80, 300, 300, 75, button_InstructionsUpStateImage, button_InstructionsDownStateImage, false, true, STATE_UP);
	button_Back = new Button(50, canvas.height-100, 200, 75, button_BackUpStateImage, button_BackDownStateImage, false, true, STATE_UP);
	button_End = new Button(50, canvas.height-100, 150, 75, button_EndUpStateImage, button_EndDownStateImage, false, true, STATE_UP);
	button_balls = new Array();
	button_balls[0] = new Ball(button_PlayGame.x, button_PlayGame.y+20, true);
	button_balls[1] = new Ball(button_PlayGame.x+button_PlayGame.width-30, button_PlayGame.y+20, true);
	button_balls[2] = new Ball(button_Instructions.x-40, button_Instructions.y+20, true);
	button_balls[3] = new Ball(button_Instructions.x+button_Instructions.width, button_Instructions.y+20, true);
	button_balls[4] = new Ball(button_Back.x-30, button_Back.y+20, true);
	button_balls[5] = new Ball(button_Back.x+button_Back.width, button_Back.y+20, true);
	button_balls[6] = new Ball(button_End.x-30, button_End.y+20, true);
	button_balls[7] = new Ball(button_End.x+button_End.width, button_End.y+20, true);
	
	if (intervalId != -1) // This means an interval has been set
		clearInterval(intervalId);
		
	intervalId = setInterval(mainLoop, 1000 / FPS);
} // end loadGame

function mainLoop()
{
	context2D.drawImage(bgImage, 0, 0);
	if (gameState == GAME_STATE_START)
	{
		// Update Objects
		button_PlayGame.update(mouseX, mouseY, mpressed, prev_mpressed);
		button_Instructions.update(mouseX, mouseY, mpressed, prev_mpressed);
		
		if (button_PlayGame.isPressed)
		{
			loadGameValues();
			gameState = GAME_STATE_PLAYING;
			button_PlayGame.isPressed = false;
		} // end button play game is pressed
		
		if (button_Instructions.isPressed)
		{
			gameState = GAME_STATE_INSTRUCTIONS;
			button_Instructions.isPressed = false;
		}
		updateButtonBallAnimation(0, 4);
		
		drawStart();
	} // end is game state start
	
	else if (gameState == GAME_STATE_INSTRUCTIONS)
	{
		button_Back.update(mouseX, mouseY, mpressed, prev_mpressed);
		if (button_Back.isPressed)
		{
			gameState = GAME_STATE_START;
			button_Back.isPressed = false;
		}
		updateButtonBallAnimation(4,2);
		drawInstructions();
	} // end is game state instructions
	
	else if (gameState == GAME_STATE_PLAYING)
	{
		updateBalls();
		updateBallAnimation();
		drawBall();
		drawHeading();
	} // end gameState is playing
	
	else if (gameState == GAME_STATE_END)
	{
		button_End.update(mouseX, mouseY, mpressed, prev_mpressed);
		if (button_End.isPressed)
		{
			gameState = GAME_STATE_START;
			button_End.isPressed = false;
		}
		updateButtonBallAnimation(6, 2);
		drawGameEnd();
	} // end is gameState end
} // end mainLoop

function updateBalls()
{
	for (var i = 0; i < totalBalls; i++)
	{
		if (balls[i].alive == true)
		{
			balls[i].scaleX += scaleIncrement;
			balls[i].scaleY += scaleIncrement;
			balls[i].posY += balls[i].velY;
			if (balls[i].scaleX >= MAX_SCALE)
			{
				balls[i].scaleX = MAX_SCALE;
				balls[i].scaleY = MAX_SCALE;
				balls[i].velY = BALL_DYING_VELOCITY;
			}
			if (balls[i].posY-MAX_SCALE > canvas.height)
			{
				balls[i].alive = false;
				livesLeft--;
				scoreBallsDestroyed = 0;
			}
		} // end is ball alive
		else // is ball not alive
			generateNextBall(i); // generate the next ball at the specified index
	} // end for total balls
	if (livesLeft < 1) // If lives left is less then 1, game over
	{
		gameState = GAME_STATE_END;
	}
} // end updateBalls

function updateBallAnimation()
{
	for (var i = 0; i < totalBalls; i++)
	{
		// Increment the X on the sprite sheet, when it hits the end, go down Y and reset X to 0
		balls[i].frameX += 64;
		if (balls[i].frameX == SPRITE_SHEET_WIDTH)
		{
			balls[i].frameY += 64;
			balls[i].frameX = 0;
		}
		// If it hits the bottom of the sprite sheet, that means its gone through all frames so start over again.
		if (balls[i].frameY == SPRITE_SHEET_HEIGHT)
		{
			balls[i].frameY = 0;
			balls[i].frameX = 0;
		}
	} // end for total balls
} // end updateBallAnimation

// Update the animations for the balls next to the buttons.
// The startIndex is the first ball that has to be updated,
// endLength is the length to go.
function updateButtonBallAnimation(startIndex, endLength)
{
	for (var i = 0; i < endLength; i++)
	{
		// Increment the X on the sprite sheet, when it hits the end, go down Y and reset X to 0
		button_balls[i+startIndex].frameX += 64;
		if (button_balls[i+startIndex].frameX == SPRITE_SHEET_WIDTH)
		{
			button_balls[i+startIndex].frameY += 64;
			button_balls[i+startIndex].frameX = 0;
		}
		// If it hits the bottom of the sprite sheet, that means its gone through all frames so start over again.
		if (button_balls[i+startIndex].frameY == SPRITE_SHEET_HEIGHT)
		{
			button_balls[i+startIndex].frameY = 0;
			button_balls[i+startIndex].frameX = 0;
		}
	} // end for total balls
} // end updateButtonBallAnimation

function generateNextBall(index)
{
	if (balls[index].alive == false)
	{
		balls[index].posX = utilities.randomFromTo(0, canvas.width-MAX_SCALE);
		balls[index].posY = utilities.randomFromTo(30, canvas.height-MAX_SCALE);
		balls[index].scaleX = BALL_DEFAULT_SCALE;
		balls[index].scaleY = BALL_DEFAULT_SCALE;
		balls[index].velY = 0;
		balls[index].frameX = 0;
		balls[index].frameY = 0;
		balls[index].alive = true;
	}
} // end generateNextBall

function drawBall()
{
	for (var i = 0; i < totalBalls; i++)
	{
		//drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
		context2D.drawImage(ballImage, balls[i].frameX, balls[i].frameY, CIRCUS_BALL_WIDTH, CIRCUS_BALL_HEIGHT, balls[i].posX, balls[i].posY, balls[i].scaleX, balls[i].scaleY);
		
		if (balls[i].scaleX >= MAX_SCALE) // if the ball is falling down to die.
			context2D.drawImage(deadBallImage, 0, 0, deadBallImage.width, deadBallImage.height, balls[i].posX, balls[i].posY, deadBallImage.width, deadBallImage.height);
	} // end for
} // end drawBall

function drawButtonBalls(startIndex, endLength)
{
	for (var i = 0; i < endLength; i++)
	{
		//drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
		context2D.drawImage(ballImage, button_balls[i+startIndex].frameX, button_balls[i+startIndex].frameY, CIRCUS_BALL_WIDTH, CIRCUS_BALL_HEIGHT, button_balls[i+startIndex].posX, button_balls[i+startIndex].posY, 32, 32);
	} // end for
} // end drawButtonBalls

function loadGameValues()
{
	balls[0].posX = utilities.randomFromTo(0, canvas.width-MAX_SCALE);
	balls[0].posY = utilities.randomFromTo(30, canvas.height-MAX_SCALE);
	balls[0].scaleX = BALL_DEFAULT_SCALE;
	balls[0].scaleY = BALL_DEFAULT_SCALE;
	balls[0].velY = 0;
	balls[0].frameX = 0;
	balls[0].frameY = 0;
	balls[0].alive = true;
	
	balls[1].posX = utilities.randomFromTo(0, canvas.width-MAX_SCALE);
	balls[1].posY = utilities.randomFromTo(30, canvas.height-MAX_SCALE);
	balls[1].scaleX = BALL_DEFAULT_SCALE;
	balls[1].scaleY = BALL_DEFAULT_SCALE;
	balls[1].velY = 0;
	balls[1].frameX = 0;
	balls[1].frameY = 0;
	balls[1].alive = true;
	
	livesLeft = 9;
	score = 0;
	totalBalls = 1;
	scaleIncrement = START_SCALE_INCREMENT;
	scoreBallsDestroyed = 0;
	ballsDestroyed = 0;
} // end loadGameValues

function drawHeading()
{
	context2D.fillStyle="black";
	context2D.fillRect(0, 0, canvas.width, 30);
	utilities.drawCanvasText(context2D, "Circus Shooter", 4, 20, "white", "14px Comic Sans MS");
	utilities.drawCanvasText(context2D, "Lives: "+livesLeft, 150, 20, "red", "14px comic sans ms");
	utilities.drawCanvasText(context2D, "Score: "+score, 250, 20, "orange", "14px comic sans ms");
	//drawCanvasText("Scale Velocity: "+scaleIncrement, 20, 300, "red", "14px courier new");
	//drawCanvasText("Balls Destroyed: "+ballsDestroyed, 20, 330, "red", "14px courier new");
	//drawCanvasText("Total Balls: "+totalBalls, 20, 360, "red", "14px courier new");
	context2D.fillStyle="white";
	context2D.fillRect(0,30,canvas.width,4);
} // end drawHeading

function drawStart()
{
	utilities.drawCanvasText(context2D, "Circus Shooter", 100, 100, "white", "38px Comic Sans MS");
	button_PlayGame.draw(context2D);
	button_Instructions.draw(context2D);
	drawButtonBalls(0, 4);
} // end drawStart

function drawInstructions()
{
	utilities.drawCanvasText(context2D, "Instructions:", 10, 30, "white", "26px Comic Sans MS");
	utilities.drawCanvasText(context2D, "Point and click to destroy the", 10, 70, "white", "26px Comic Sans MS");
    utilities.drawCanvasText(context2D, "attacking Circus Balls, while racking", 10, 110, "white", "26px Comic Sans MS");
    utilities.drawCanvasText(context2D, "up points. How many points can you", 10, 150, "white", "26px Comic Sans MS");
	utilities.drawCanvasText(context2D, "earn?", 10, 190, "white", "26px Comic Sans MS");
	button_Back.draw(context2D);
	drawButtonBalls(4, 2);
} // end drawInstructions

function drawGameEnd()
{
	utilities.drawCanvasText(context2D, "Circus Shooter", 100, 100, "white", "38px Comic Sans MS");
	utilities.drawCanvasText(context2D, "Thanks for Playing!", 10, 200, "white", "38px Comic Sans MS");
	utilities.drawCanvasText(context2D, "Score: "+score, 50, 280, "orange", "28px arial");
	button_End.draw(context2D);
	drawButtonBalls(6, 2);
} // end drawGameEnd
exports.title = "Circus Shooter";
return exports;
}
var asciiInvaders = function () {
var exports = {};
var FPS = 30;

var GAME_STATE_START = 0;
var GAME_STATE_PLAYING = 1;
var GAME_STATE_END = 2;
var GAME_STATE_INSTRUCTIONS = 3;

var DIRECTION_NONE = 0;
var DIRECTION_UP = 1;
var DIRECTION_RIGHT = 2;
var DIRECTION_DOWN = 3;
var DIRECTION_LEFT = 4;

var PLAYER_SHIP_WIDTH = 100;
var PLAYER_SHIP_HEIGHT = 60; // was 101 // make the image 40 x 50
var MAX_PLAYER_SHIP_VELOCITY = 8;
var MAX_LIVES = 5;

var ENEMY_ONE = 0;
var ENEMY_TWO = 1;
var ENEMY_THREE = 2;

var ENEMY_WIDTH = 38;
var ENEMY_HEIGHT = 48;

var PLAYER_BULLETS_WIDTH = 24;
var PLAYER_BULLETS_HEIGHT = 12;
var START_MAX_BULLETS = 1;
var MAX_BULLETS = 3;
var FIRE_DELAY = 5;

var TOTAL_COLS = 8;
var TOTAL_ROWS = 4;
var COL_BUFFER = 40;
var ROW_BUFFER = 34;
var START_ROW = 52;
var ENEMY_MOVEMENT_START_DELAY = 66; // 66
var INCREASE_ENEMY_MOVEMENT_INTERVAL = 5;
var ENEMY_MOVE_RIGHT_INDEX = 2;
var ENEMY_MOVE_DOWN_INDEX = 3;
var ENEMY_MOVE_LEFT_INDEX = 6;
var ENEMY_MOVEMENT_RIGHT_BOUNDRY = 736;
var ENEMY_MOVEMENT_LEFT_BOUNDRY = 4;
var ENEMY_X_MOVEMENT_VELOCITY = 15;
var ENEMY_Y_MOVEMENT_VELOCITY = 10;
var TOTAL_ENEMIES = TOTAL_COLS * TOTAL_ROWS;
var ENEMY_MOVEMENT_DOWN_BOUNDRY = 732;

var START_ENEMY_FIRE_DELAY = 10;
var START_MAX_ENEMY_FIRE = 3;
var START_ENEMY_BULLET_VEL = 3;
var IMAGE_CHEESE_HEAD_WIDTH = 20;
var IMAGE_CHEESE_HEAD_HEIGHT = 16;
var ENEMY_BULLETS_WIDTH = 32;
var ENEMY_BULLETS_HEIGHT = 12;	

var EXPLOSION_IMAGE_WIDTH = 32;
var EXPLOSION_IMAGE_HEIGHT = 32;

var BONUS_WIDTH = 36;
var BONUS_HEIGHT = 24;

var SCORE_MULTIPLIER = 2;

var canvas = null;
var context2D = null;

var playerFireRate = START_MAX_BULLETS;
var playerShip = null;

var playerBullets = new Array();

var enemies = null;
var enemyDirection = DIRECTION_RIGHT;
var previousEnemyDirection = enemyDirection;
var enemyMoveLeft = 0; // when this gets to ENEMY_MAX_MOVE_LEFT, time to go down.
var enemyMoveDown = 0; // when this gets to ENEMY_MAX_MOVE_DOWN, time to go right or left based on which way it was going before.
var enemyMoveRight = 0; // when this gets to ENEMY_MAX_MOVE_RIGHT, time to go down.
var increaseEnemyMovementThreshold = INCREASE_ENEMY_MOVEMENT_INTERVAL;
var enemyMovementCounter = 0;
var enemyFireCounter = 0;
var enemyMovementDelay = ENEMY_MOVEMENT_START_DELAY;
var enemyMovementDownCounter = 0;
var enemyMovementDownTotal = 1;
var enemiesKilled = 0;
var scoreEnemiesKilled = 0; // Keeps track of the number of blocks destroyed for each life, used for calculating scores.
var enemyFireDelay = START_ENEMY_FIRE_DELAY;
var maxEnemyFire = START_MAX_ENEMY_FIRE;
var enemyBulletVel = START_ENEMY_BULLET_VEL;
var enemyBullets = new Array();

var explosionText = null;
var explosion = null;

var bigExplosion = null;

var bonus = null;
var bonusPickupText = null;
var bonusPickup = null;

var score = 0;
var livesLeft = MAX_LIVES;
var fireCounter = 0;
var level = 1;
var gameState = GAME_STATE_START;

var isSpaceBarPressed = false;

var intervalId = -1;

var keys = new Array();

var utilities = gameUtilities();

document.addEventListener('keydown',keyDown,true);
document.addEventListener('keyup',keyUp,true);
function keyDown(evt){
 keys[evt.keyCode] = true;
 evt.returnValue = false;
}
function keyUp(evt){
 keys[evt.keyCode] = false;
 evt.returnValue = false;
}

//window.onload = loadGame;

function Sprite(posX, posY, alive)
{
    this.id = ENEMY_ONE;
	this.posX = posX;
	this.posY = posY;
	this.alive = alive;
	this.frameX = 0;
	this.frameY = 0;
	this.frameCounter = 0;
	this.frameDelay = 5;
	this.scaleX = 0;
	this.scaleY = 0;
	this.velX = 0;
	this.velY = 0;
	this.direction = DIRECTION_NONE;
    this.color = "white";
    this.text = "}{";
} // end Object Sprite

function loadEnemies()
{
	enemies = new Array();
	for (var i = 0; i < TOTAL_ROWS; i++)
	{
		enemies[i] = new Array(TOTAL_COLS);
	}
	
	for (var i = 0; i < TOTAL_ROWS; i++)
	{
		for (var j = 0; j < TOTAL_COLS; j++)
		{
			enemies[i][j] = new Sprite(0, 0, false);
		}
	} // end initialize all enemies
	
	resetEnemies();
} // end loadEnemies

function resetEnemies()
{
	enemiesKilled = 0;
	for (var i = 0; i < TOTAL_ROWS; i++)
	{
		for (var j = 0; j < TOTAL_COLS; j++)
		{
            enemies[i][j].id = utilities.randomFromTo(ENEMY_ONE, ENEMY_THREE);
            if (enemies[i][j].id == ENEMY_ONE)
            {
                enemies[i][j].color = "white";
                enemies[i][j].text = "} {";
            }
            
            else if (enemies[i][j].id == ENEMY_TWO)
            {
                enemies[i][j].color = "yellow";
                enemies[i][j].text = "] [";
            }
            
            else if (enemies[i][j].id == ENEMY_THREE)
            {
                enemies[i][j].color = "red";
                enemies[i][j].text = ") (";
            }
                
			enemies[i][j].posX = COL_BUFFER + (j*(ENEMY_WIDTH+COL_BUFFER));
			enemies[i][j].posY = START_ROW + (i*(ENEMY_HEIGHT+ROW_BUFFER));
			enemies[i][j].alive = true;
		}
	}
} // end resetEnemies
exports.title = "Ascii Invaders";
exports.loadGame = function()
{
	canvas = document.getElementById('gameBoard');
	context2D = canvas.getContext('2d');
	
    playerShip = new Sprite(200, 600-PLAYER_SHIP_HEIGHT-10, true);
	for (var i = 0; i < MAX_BULLETS; i++)
		playerBullets[i] = new Sprite(0, 0, false);

	for (var i = 0; i < maxEnemyFire; i++)
	{
		enemyBullets[i] = new Sprite(0, 0, false);
	}
    
    explosionText = new Array();
    explosionText[0] = new Array();
    explosionText[0][0] = "\\ /";
    explosionText[0][1] = "/ \\";
    
	explosion = new Sprite(0, 0, false);
	
	bigExplosion = new Sprite(0, 0, false);
	
	bonus = new Sprite(0, 0, false);

    bonusPickupText = new Array();
    bonusPickupText[0] = new Array();
    bonusPickupText[1] = new Array();
    bonusPickupText[2] = new Array();
    bonusPickupText[0][0] = "****";
    bonusPickupText[0][1] = "****";
    bonusPickupText[1][0] = "**  **";
    bonusPickupText[1][1] = "**  **";
    bonusPickupText[2][0] = "**    **";
    bonusPickupText[2][1] = "**    **";
    
	bonusPickup = new Sprite(0, 0, false);
    
	gameState = GAME_STATE_START;
	
	loadEnemies();
	
	if (intervalId != -1) // This means an interval has been set
		clearInterval(intervalId);
		
	intervalId = setInterval(mainLoop, 1000 / FPS);
} // end loadGame

function mainLoop()
{
	context2D.clearRect(0, 0, canvas.width, canvas.height); // Erase
	getInput();
	
	if (gameState == GAME_STATE_START)
	{	
		drawStart();
	} // end gameState is start
	
	else if (gameState == GAME_STATE_INSTRUCTIONS)
	{
		drawInstructions();
	} // end gameState is instructions
	
	else if (gameState == GAME_STATE_PLAYING)
	{
		updatePlayerShip();
		updateBonus();
        updatePlayerBullets();
		updateEnemies();
		updateEnemyBullets();
		enemyFire();
		updateExplosion();
		updateBigExplosion();
		updateBonusPickup();
		drawEnemies();
		drawPlayerShip();
		drawBonus();
		drawPlayerBullets();
		drawHeading();
		drawEnemyBullets();
		drawExplosion();
		drawBigExplosion();
		drawBonusPickup();
	
		if (enemiesKilled > increaseEnemyMovementThreshold)
		{
			enemyMovementDelay -= 5;
			if (enemyMovementDelay < 0)
				enemyMovementDelay = 0;
			increaseEnemyMovementThreshold += INCREASE_ENEMY_MOVEMENT_INTERVAL;
		}
	
		if (enemiesKilled >= TOTAL_ENEMIES)
			increaseLevel();
	
		fireCounter++;
	} // end gameState is playing
	
	else if (gameState == GAME_STATE_END)
	{
        drawGameEnd();
	} // end gameState is end
} // end main loop

function loadGameValues()
{
	// Player
	playerFireRate = START_MAX_BULLETS;
	
	// Player Bullets
	resetPlayerBullets();
	
	// Enemy Bullets
	resetEnemyBullets();
	
	// Enemies
	resetEnemies();
	enemyDirection = DIRECTION_RIGHT;
	previousEnemyDirection = enemyDirection;
	enemyMoveLeft = 0; // when this gets to ENEMY_MAX_MOVE_LEFT, time to go down.
	enemyMoveDown = 0; // when this gets to ENEMY_MAX_MOVE_DOWN, time to go right or left based on which way it was going before.
	enemyMoveRight = 0; // when this gets to ENEMY_MAX_MOVE_RIGHT, time to go down.
	increaseEnemyMovementThreshold = INCREASE_ENEMY_MOVEMENT_INTERVAL;
	enemyMovementCounter = 0;
	enemyFireCounter = 0;
	enemyMovementDelay = ENEMY_MOVEMENT_START_DELAY;
	enemyMovementDownCounter = 0;
	enemyMovementDownTotal = 1;
	enemyFireDelay = START_ENEMY_FIRE_DELAY;
	maxEnemyFire = START_MAX_ENEMY_FIRE;
	enemyBulletVel = START_ENEMY_BULLET_VEL;
	
	// Bonus
	resetBonus();
	bonusPickup.alive = false;
	
	// Explosions
	explosion.alive = false;
	bigExplosion.alive = false;
	
	// Game values
	enemiesKilled = 0;
	scoreEnemiesKilled = 0; // Keeps track of the number of blocks destroyed for each life, used for calculating scores.
	score = 0;
	livesLeft = MAX_LIVES;
	fireCounter = 0;
	level = 1;
} // end loadGameValues

function increaseLevel()
{
	increaseEnemyMovementThreshold = INCREASE_ENEMY_MOVEMENT_INTERVAL;
	enemyMovementDelay = ENEMY_MOVEMENT_START_DELAY - (5*level);
	enemyMovementDownTotal++;
	enemyMovementDownCounter = 0;
	
	if (enemyMovementDelay < 0)
		enemyMovementDelay = 0;
		
	maxEnemyFire += 3;
	resetEnemies();
	resetEnemyBullets();
	resetPlayerBullets();
	resetBonus();
	
	level++;
} // end increaseLevel

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

    else if (gameState == GAME_STATE_PLAYING)
    {
        if ((37 in keys && keys[37]) || (65 in keys && keys[65]))
        {
            // Left is pressed
            playerShip.velX += 2;
            if (playerShip.velX > MAX_PLAYER_SHIP_VELOCITY)
                playerShip.velX = MAX_PLAYER_SHIP_VELOCITY;
            playerShip.direction = DIRECTION_LEFT;
        } // end if left is pressed
	
        else if ((39 in keys && keys[39]) || (68 in keys && keys[68]))
        {
            // Right is pressed
            playerShip.velX += 2;
            if (playerShip.velX > MAX_PLAYER_SHIP_VELOCITY)
                playerShip.velX = MAX_PLAYER_SHIP_VELOCITY;
            playerShip.direction = DIRECTION_RIGHT;
        }
	
        if (32 in keys && keys[32] == true)
        {
            isSpaceBarPressed = true;
        } // end spacebar is pressed
	
        // friction
        playerShip.velX *= 0.85;
        if (playerShip.velX < 0.2 && playerShip.velX > -0.2)
        { // so that it leaves it as a clean zero when it gets to a stop.
            playerShip.velX = 0;
            playerShip.direction = DIRECTION_NONE;
        }
    } // end game state is playing
    else if (gameState == GAME_STATE_END)
    {
        if ((69 in keys && keys[69]) || (101 in keys && keys[101])) // E key is pressed
            gameState = GAME_STATE_START;
    } // end game state is end
} // end getInput

function updatePlayerShip()
{
	if (playerShip.posX < 0)
	{
		playerShip.posX = 0;
		playerShip.velX = 0;
		playerShip.direction = DIRECTION_NONE;
	}
	
	if (playerShip.posX > canvas.width - PLAYER_SHIP_WIDTH)
     {
        playerShip.posX = canvas.width - PLAYER_SHIP_WIDTH;
		playerShip.velX = 0;
		playerShip.direction = DIRECTION_NONE;
	}
	
	if (playerShip.direction == DIRECTION_LEFT)
	{
		playerShip.posX -= playerShip.velX;
	}
	else if (playerShip.direction == DIRECTION_RIGHT)
	{
		playerShip.posX += playerShip.velX;
	}
	
	if (isSpaceBarPressed) // If spacebar pressed, fire away
	{
		if (fireCounter > FIRE_DELAY)
		{
			fireCounter = 0;
			initiatePlayerBullet();
			isSpaceBarPressed = false;
		}
	} // end isSpaceBarPressed
	
	// Detect Collisions with enemy bullet
	for (var r = 0; r < maxEnemyFire; r++)
	{
		if (enemyBullets[r].alive)
		{
			var enemyBulletLeft = enemyBullets[r].posX;
			var enemyBulletRight = enemyBullets[r].posX + ENEMY_BULLETS_WIDTH;
			var enemyBulletMiddle = enemyBullets[r].posX + (ENEMY_BULLETS_WIDTH/2);
			var enemyBulletTop = enemyBullets[r].posY;
			var enemyBulletBottom = enemyBullets[r].posY + ENEMY_BULLETS_HEIGHT;
			//inside(x, y, left, top, right, bottom)
			if ((utilities.inside(enemyBulletLeft, enemyBulletTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH-22, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // left, top
				(utilities.inside(enemyBulletMiddle, enemyBulletTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH-22, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // middle, top
				(utilities.inside(enemyBulletRight, enemyBulletTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH-22, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // right, top
				(utilities.inside(enemyBulletLeft, enemyBulletBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH-22, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // left, bottom
				(utilities.inside(enemyBulletMiddle, enemyBulletBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH-22, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // middle, bottom
				(utilities.inside(enemyBulletRight, enemyBulletBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH-22, playerShip.posY+PLAYER_SHIP_HEIGHT))) // right, bottom
			{
				livesLeft--;
				if (livesLeft <= 0)
					gameState = GAME_STATE_END;
				enemyBullets[r].alive = false;
				playerFireRate = START_MAX_BULLETS;
				startBigExplosion(playerShip.posX+38, playerShip.posY);
				scoreEnemiesKilled = 0;
				break;
			}
		} // end enemyBullet is alive
	} // end enemyBullet loop
	
	// Detect Collisions with bonus
	if (bonus.alive)
	{
		var bonusLeft = bonus.posX;
		var bonusRight = bonus.posX + BONUS_WIDTH;
		var bonusMiddle = bonus.posX + (BONUS_WIDTH/2);
		var bonusTop = bonus.posY;
		var bonusBottom = bonus.posY + BONUS_HEIGHT;
		
		//inside(x, y, left, top, right, bottom)
		if ((utilities.inside(bonusLeft, bonusTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // left, top
			(utilities.inside(bonusMiddle, bonusTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // middle, top
			(utilities.inside(bonusRight, bonusTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // right, top
			(utilities.inside(bonusLeft, bonusBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // left, bottom
			(utilities.inside(bonusMiddle, bonusBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // middle, bottom
			(utilities.inside(bonusRight, bonusBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT))) // right, bottom
		{
			bonus.alive = false;
			playerFireRate++;
			if (playerFireRate > MAX_BULLETS)
			{
				playerFireRate = MAX_BULLETS;
				score += 200;
			}
			startBonusPickup(playerShip.posX, playerShip.posY);
		}
	} // end is bonus alive
	
} // end updatePlayerShip

function drawPlayerShip()
{
    utilities.drawCanvasText(context2D, "   ########", playerShip.posX, playerShip.posY, "white", "12px Courier new");
    utilities.drawCanvasText(context2D, "  #   ^^   #",playerShip.posX, playerShip.posY+12, "white", "12px Courier new");
    utilities.drawCanvasText(context2D, " #  -----   #",playerShip.posX, playerShip.posY+24, "white", "12px Courier new");
    utilities.drawCanvasText(context2D, "#    ZZZZ    #",playerShip.posX, playerShip.posY+36, "white", "12px Courier new");
    utilities.drawCanvasText(context2D, " ############", playerShip.posX, playerShip.posY+48, "white", "12px Courier new");
}

function initiateBonus(x,y)
{
	bonus.alive = true;
	bonus.posX = x;
	bonus.posY = y;
	bonus.velY = 4;
} // end initiateBonus

function updateBonus()
{
	if (bonus.alive)
	{
		bonus.posY += bonus.velY;
	} // end is bonus alive
	
	if (bonus.posY > 600)
	{
		bonus.alive = false;
		playerFireRate = START_MAX_BULLETS;
	}
} // end updateBonus

function drawBonus()
{
	if (bonus.alive)
    {
        utilities.drawCanvasText(context2D, "***", bonus.posX, bonus.posY, "yellow", "12px Courier new");
        utilities.drawCanvasText(context2D, "***", bonus.posX, bonus.posY+12, "yellow", "12px Courier new");
	}
} // end drawBonus

function resetBonus()
{
	if (bonus.alive)
	{
		bonus.posX = 0;
		bonus.posY = 0;
		bonus.alive = false;
		bonus.velY = 0;
		} // end is bonus alive
} // end resetBonus

function initiatePlayerBullet()
{
	for (var i = 0; i < playerFireRate; i++)
	{
		if (playerBullets[i].alive == false)
		{
			playerBullets[i].alive = true;
			playerBullets[i].posX = playerShip.posX+30;
			playerBullets[i].posY = playerShip.posY;
			playerBullets[i].velY = 8;
			break;
		}
	}
} // end initiatePlayerBullet

function updatePlayerBullets()
{
	for (var i = 0; i < MAX_BULLETS; i++)
	{
		if (playerBullets[i].alive)
		{
			playerBullets[i].posY -= playerBullets[i].velY;
			if (playerBullets[i].posY+PLAYER_BULLETS_HEIGHT <= 38)
				playerBullets[i].alive = false;
		} // end is bullet alive
	}
} // end updatePlayerBullets

function drawPlayerBullets()
{
	for (var i = 0; i < MAX_BULLETS; i++)
	{
		if (playerBullets[i].alive)
            utilities.drawCanvasText(context2D, "^ ^", playerBullets[i].posX+15, playerBullets[i].posY, "white", "12px Courier new");
	}
} // end drawPlayerBullets

function resetPlayerBullets()
{
	for (var i = 0; i < MAX_BULLETS; i++)
	{
		if (playerBullets[i].alive)
		{
			playerBullets[i].posX = 0;
			playerBullets[i].posY = 0;
			playerBullets[i].alive = false;
			playerBullets[i].velX = 0;
			playerBullets[i].velY = 0;
		} // end is enemy bullet alive
	} // end loop through enemyBullets
} // end resetPlayerBullets

function initiateEnemyBullet(enemyRowIndex, enemyColIndex)
{
	for (var i = 0; i < maxEnemyFire; i++)
	{
		if (enemyBullets[i].alive == false)
		{
			enemyBullets[i].alive = true;
			enemyBullets[i].posX = enemies[enemyRowIndex][enemyColIndex].posX+10;
			enemyBullets[i].posY = enemies[enemyRowIndex][enemyColIndex].posY+10;
            enemyBullets[i].color = enemies[enemyRowIndex][enemyColIndex].color;
            enemyBullets[i].text = enemies[enemyRowIndex][enemyColIndex].text;
			enemyBullets[i].velY = enemyBulletVel;
			break;
		}
	}
} // end initiateEnemyBullet

function updateEnemyBullets()
{
	for (var i = 0; i < maxEnemyFire; i++)
	{
		if (enemyBullets[i].alive)
		{
			enemyBullets[i].posY += enemyBullets[i].velY;
			if (enemyBullets[i].posY > 600)
				enemyBullets[i].alive = false;
				
			// Check collision with player bullets
			for (var r = 0; r < MAX_BULLETS; r++)
				{
					if (playerBullets[r].alive)
					{
						var enemyBulletLeft = enemyBullets[i].posX;
						var enemyBulletMiddle = enemyBullets[i].posX+(ENEMY_BULLETS_WIDTH/2);
						var enemyBulletRight = enemyBullets[i].posX+ENEMY_BULLETS_HEIGHT;
						var enemyBulletTop = enemyBullets[i].posY;
						var enemyBulletBottom = enemyBullets[i].posY+ENEMY_BULLETS_HEIGHT;
						
						var playerBulletLeft = playerBullets[r].posX;
						var playerBulletRight = playerBullets[r].posX + PLAYER_BULLETS_WIDTH;
						var playerBulletTop = playerBullets[r].posY;
						var playerBulletBottom = playerBullets[r].posY + PLAYER_BULLETS_HEIGHT;
				
						//inside(x, y, left, top, right, bottom)
						if ((utilities.inside(enemyBulletLeft, enemyBulletTop, playerBulletLeft, playerBulletTop, playerBulletRight, playerBulletBottom)) || // left, top
							(utilities.inside(enemyBulletMiddle, enemyBulletTop, playerBulletLeft, playerBulletTop, playerBulletRight, playerBulletBottom)) || // middle, top
							(utilities.inside(enemyBulletRight, enemyBulletTop, playerBulletLeft, playerBulletTop, playerBulletRight, playerBulletBottom)) || // right, top
							(utilities.inside(enemyBulletLeft, enemyBulletBottom, playerBulletLeft, playerBulletTop, playerBulletRight, playerBulletBottom)) || // left, bottom
							(utilities.inside(enemyBulletMiddle, enemyBulletBottom, playerBulletLeft, playerBulletTop, playerBulletRight, playerBulletBottom)) || // middle, bottom
							(utilities.inside(enemyBulletRight, enemyBulletBottom, playerBulletLeft, playerBulletTop, playerBulletRight, playerBulletBottom))) // right, bottom
						{
							enemyBullets[i].alive = false;
							playerBullets[r].alive = false;
							startExplosion(playerBullets[r].posX+20, playerBullets[r].posY);
							score++;
							break;
						}
					} // is player bullet alive
				} // loop through enemyBullets
		} // end is bullet alive
	}
} // end updateEnemyBullets

function resetEnemyBullets()
{
	for (var i = 0; i < maxEnemyFire; i++)
	{
		if (enemyBullets[i] === undefined)
		{
			enemyBullets[i] = new Sprite(0, 0, false);
		}
		else
		{
			if (enemyBullets[i].alive)
			{
				enemyBullets[i].posX = 0;
				enemyBullets[i].posY = 0;
				enemyBullets[i].alive = false;
				enemyBullets[i].velX = 0;
				enemyBullets[i].velY = 0;
			} // end is enemyBullet alive
		} // end else	
	} // end loop through enemyBullets
} // end resetEnemyBullets

function drawEnemyBullets()
{
	for (var i = 0; i < maxEnemyFire; i++)
	{
		if (enemyBullets[i].alive)
        {
            utilities.drawCanvasText(context2D, enemyBullets[i].text, enemyBullets[i].posX+15, enemyBullets[i].posY, enemyBullets[i].color, "12px Courier new");
        }
	}
} // end drawEnemyBullets

function enemyFire()
{
	if (enemyFireCounter > enemyFireDelay)
	{
		var selectedEnemyRow = utilities.randomFromTo(0, TOTAL_ROWS-1);
		var selectedEnemyCol = utilities.randomFromTo(0, TOTAL_COLS-1);
		if (enemies[selectedEnemyRow][selectedEnemyCol].alive == false) // If chosen enemy is not alive, find one that is
		{
			while (enemies[selectedEnemyRow][selectedEnemyCol].alive == false)
			{
				if (enemiesKilled == TOTAL_ENEMIES)
					return;
				selectedEnemyRow = utilities.randomFromTo(0, TOTAL_ROWS-1);
				selectedEnemyCol = utilities.randomFromTo(0, TOTAL_COLS-1);
			}
		}
		initiateEnemyBullet(selectedEnemyRow, selectedEnemyCol);
		enemyFireCounter = 0;
		enemyFireDelay = utilities.randomFromTo(4, 20);
	}
	else
		enemyFireCounter++;
} // end enemyFire

function updateExplosion()
{
	if (explosion.alive) // if the explosion is alive
	{
		if (explosion.frameCounter > explosion.frameDelay)
		{
            explosion.frameX++;
            if (explosion.frameX > 3)
			{
				explosion.alive = false;
				explosion.frameX = 0;
			}			
			explosion.frameCounter = 0;
		}
		else
			explosion.frameCounter++;
	} // end explosion is alive
} // end updateExplosion

function drawExplosion()
{
	if (explosion.alive)
    {
        for (var i = 0; i < explosionText[0].length; i++)
        {
            utilities.drawCanvasText(context2D, explosionText[0][i], explosion.posX, explosion.posY+(i*explosion.frameX*12), "orange", "12px Courier new");
        }
    }
} // end drawExplosion

function updateBigExplosion()
{
	if (bigExplosion.alive) // if the explosion is alive
	{
		if (bigExplosion.frameCounter > bigExplosion.frameDelay)
		{
            bigExplosion.frameX++;
            if (bigExplosion.frameX > 3)
			{
				bigExplosion.alive = false;
				bigExplosion.frameX = 0;
			}			
			bigExplosion.frameCounter = 0;
		}
		else
			bigExplosion.frameCounter++;
	} // end bigExplosion is alive
} // end updateBigExplosion

function drawBigExplosion()
{
	if (bigExplosion.alive)
    {
        for (var i = 0; i < explosionText[0].length; i++)
        {
            utilities.drawCanvasText(context2D, explosionText[0][i], bigExplosion.posX, bigExplosion.posY+(i*bigExplosion.frameX*16), "orange", "16px Courier new");
        }
    }
} // end drawBigExplosion

function startExplosion(contactX, contactY)
{
	explosion.alive = true;
	explosion.posX = contactX;
	explosion.posY = contactY;
	explosion.frameDelay = 0;
	explosion.frameX = 0;
} // end startExplosion

function startBigExplosion(contactX, contactY)
{
	bigExplosion.alive = true;
	bigExplosion.posX = contactX;
	bigExplosion.posY = contactY;
	bigExplosion.frameDelay = 0;
	bigExplosion.frameX = 0;
} // end startBigExplosion

function startBonusPickup(contactX, contactY)
{
	bonusPickup.alive = true;
	bonusPickup.posX = contactX;
	bonusPickup.posY = contactY;
	bonusPickup.frameDelay = 1;
	bonusPickup.frameX = 0;
	bonusPickup.velX = 2;
	bonusPickup.velY = 2;
} // end startBonusPickup

function updateBonusPickup()
{
	if (bonusPickup.alive) // if the explosion is alive
	{
		bonusPickup.posX += bonusPickup.velX;
		bonusPickup.posY += bonusPickup.velY;
		if (bonusPickup.frameCounter > bonusPickup.frameDelay)
		{
            bonusPickup.frameX++;
            if (bonusPickup.frameX > 2)
			{
				bonusPickup.alive = false;
				bonusPickup.frameX = 0;
			}			
			bonusPickup.frameCounter = 0;
		}
		else
			bonusPickup.frameCounter++;
	} // end bonusPickup is alive
} // end updateBonusPickup

function drawBonusPickup()
{
	if (bonusPickup.alive)
    {
        for (var l = 0; l < bonusPickupText[bonusPickup.frameX].length; l++)
        {
           utilities.drawCanvasText(context2D, bonusPickupText[bonusPickup.frameX][l], bonusPickup.posX, bonusPickup.posY+(l*14), "yellow", "14px Courier new");
        }
    }
} // end drawBonusPickup

function updateEnemies()
{
	var rightMostX = 0;
	var leftMostX = 450;
	var mostDown = 468;
	var lastRow = 0;
	
	if (enemyMovementCounter  > enemyMovementDelay) // time to move enemies
	{
		for (var i = 0; i < TOTAL_ROWS; i++)
		{
			for (var j = 0; j < TOTAL_COLS; j++)
			{
				if (enemies[i][j].alive)
				{
					if (enemies[i][j].posX > rightMostX)
						rightMostX = enemies[i][j].posX;
				}
			}
		}
		
		for (var i = 0; i < TOTAL_ROWS; i++)
		{
			for (var j = 0; j < TOTAL_COLS; j++)
			{
				if (enemies[i][j].alive == true)
				{
					if (enemies[i][j].posX < leftMostX)
						leftMostX = enemies[i][j].posX;
				}
			}
		}
		
		// Find last row with at least 1 enemy alive.
		for (var i = 0; i < TOTAL_ROWS; i++)
		{
			for (var j = 0; j < TOTAL_COLS; j++)
			{
				if (enemies[i][j].alive == true)
				{
					if (i > lastRow)
					{
						lastRow = i;
						break;
					}
				}
			}
		} // end find last row with an enemy alive loop
		
		
		if (enemyDirection == DIRECTION_RIGHT)
		{
			if (rightMostX < ENEMY_MOVEMENT_RIGHT_BOUNDRY) // Should move them right
			{
				for (var i = 0; i < TOTAL_ROWS; i++)
				{
					for (var j = 0; j < TOTAL_COLS; j++)
					{
						if (enemies[i][j].alive == true) // only update the enemy if its alive
						{
							enemies[i][j].posX += ENEMY_X_MOVEMENT_VELOCITY;
						}
					}
				}
			} // end should move right
			else
			{
				previousEnemyDirection = enemyDirection;
				enemyDirection = DIRECTION_DOWN;
			}
		} // end enemyDirection is right
		
		else if (enemyDirection == DIRECTION_DOWN)
		{
			if (enemyMovementDownCounter < enemyMovementDownTotal)
			{
				for (var i = 0; i < TOTAL_ROWS; i++)
				{
					for (var j = 0; j < TOTAL_COLS; j++)
					{
						if (enemies[lastRow][j].posY > mostDown)
							break;
						else
							enemies[i][j].posY += ENEMY_Y_MOVEMENT_VELOCITY;
					}
				}
				enemyMovementDownCounter++;
			} // end should move down
			
			else // moving down is over, find next direction
			{
				enemyMovementDownCounter = 0;
				if (previousEnemyDirection == DIRECTION_RIGHT)
				{
					previousEnemyDirection = enemyDirection;
					enemyDirection = DIRECTION_LEFT;
				}
				else if (previousEnemyDirection == DIRECTION_LEFT)
				{
					previousEnemyDirection = enemyDirection;
					enemyDirection = DIRECTION_RIGHT;
				}
			} // end else
		} // end enemyDirection is down
		
		else if (enemyDirection == DIRECTION_LEFT)
		{
			if (leftMostX > ENEMY_MOVEMENT_LEFT_BOUNDRY) // Should move them right
			{
				for (var i = 0; i < TOTAL_ROWS; i++)
				{
					for (var j = 0; j < TOTAL_COLS; j++)
					{
						if (enemies[i][j].alive == true) // only update the enemy if its alive
						{
							enemies[i][j].posX -= ENEMY_X_MOVEMENT_VELOCITY;
						}
					}
				}
			} // end should move right
			else
			{
				previousEnemyDirection = enemyDirection;
				enemyDirection = DIRECTION_DOWN
			}
		} // end enemyDirection is left
		enemyMovementCounter = 0;
	} // end enemy movement counter is up and the enemies can move
	
	else
		enemyMovementCounter++;
	
	// Check collisions with player bullets
	for (var i = 0; i < TOTAL_ROWS; i++)
	{
		for (var j = 0; j < TOTAL_COLS; j++)
		{
			if (enemies[i][j].alive) // Make sure enemy is alive
			{
				for (var r = 0; r < MAX_BULLETS; r++)
				{
					if (playerBullets[r].alive)
					{
						var playerBulletLeft = playerBullets[r].posX;
						var playerBulletRight = playerBullets[r].posX + PLAYER_BULLETS_WIDTH;
						var playerBulletMiddle = playerBullets[r].posX + (PLAYER_BULLETS_WIDTH/2);
						var playerBulletTop = playerBullets[r].posY;
						var playerBulletBottom = playerBullets[r].posY + PLAYER_BULLETS_HEIGHT;
				
						//inside(x, y, left, top, right, bottom)
						if ((utilities.inside(playerBulletLeft, playerBulletTop, enemies[i][j].posX, enemies[i][j].posY, enemies[i][j].posX+ENEMY_WIDTH, enemies[i][j].posY+ENEMY_HEIGHT)) || // left, top
							(utilities.inside(playerBulletMiddle, playerBulletTop, enemies[i][j].posX, enemies[i][j].posY, enemies[i][j].posX+ENEMY_WIDTH, enemies[i][j].posY+ENEMY_HEIGHT)) || // middle, top
							(utilities.inside(playerBulletRight, playerBulletTop, enemies[i][j].posX, enemies[i][j].posY, enemies[i][j].posX+ENEMY_WIDTH, enemies[i][j].posY+ENEMY_HEIGHT)) || // right, top
							(utilities.inside(playerBulletLeft, playerBulletBottom, enemies[i][j].posX, enemies[i][j].posY, enemies[i][j].posX+ENEMY_WIDTH, enemies[i][j].posY+ENEMY_HEIGHT)) || // left, bottom
							(utilities.inside(playerBulletMiddle, playerBulletBottom, enemies[i][j].posX, enemies[i][j].posY, enemies[i][j].posX+ENEMY_WIDTH, enemies[i][j].posY+ENEMY_HEIGHT)) || // middle, bottom
							(utilities.inside(playerBulletRight, playerBulletBottom, enemies[i][j].posX, enemies[i][j].posY, enemies[i][j].posX+ENEMY_WIDTH, enemies[i][j].posY+ENEMY_HEIGHT))) // right, bottom
						{
							enemies[i][j].alive = false;
							playerBullets[r].alive = false;
							startExplosion(enemies[i][j].posX+20, enemies[i][j].posY);
							enemiesKilled++;
							scoreEnemiesKilled++;
							score += SCORE_MULTIPLIER * scoreEnemiesKilled;
							
							if (!bonus.alive) // if the bonus currently isn't alive
							{
								if (utilities.randomFromTo(0, 2) == 1) // If 1 is returned, initiate a bonus
									initiateBonus(enemies[i][j].posX, enemies[i][j].posY);
							}
								
							break;
						}
					} // end player bullet is alive
				} // end playerBullets loop
			} // end is enemy alive
			
			if (enemies[i][j].alive)
			{
				// Check for collision with playerShip
				var enemyLeft = enemies[i][j].posX;
				var enemyMiddle = enemies[i][j].posX + (ENEMY_WIDTH/2);
				var enemyRight = enemies[i][j].posX + ENEMY_WIDTH;
				var enemyTop = enemies[i][j].posY;
				var enemyBottom = enemies[i][j].posY+ENEMY_HEIGHT;
				//inside(x, y, left, top, right, bottom)
				if ((utilities.inside(enemyLeft, enemyTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // left, top
					(utilities.inside(enemyMiddle, enemyTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // middle, top
					(utilities.inside(enemyRight, enemyTop, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // right, top
					(utilities.inside(enemyLeft, enemyBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // left, bottom
					(utilities.inside(enemyMiddle, enemyBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT)) || // middle, bottom
					(utilities.inside(enemyRight, enemyBottom, playerShip.posX, playerShip.posY, playerShip.posX+PLAYER_SHIP_WIDTH, playerShip.posY+PLAYER_SHIP_HEIGHT))) // right, bottom
				{
					enemies[i][j].alive = false;
					livesLeft--;
					if (livesLeft <= 0)
						gameState = GAME_STATE_END;
					enemiesKilled++;
					scoreEnemiesKilled = 0;
					playerFireRate = START_MAX_BULLETS;
					startBigExplosion(playerShip.posX+38, playerShip.posY);
				}
				
			} // end is enemy alive
		} // end columns of enemies
	} // end rows of enemies	
	
} // end updateEnemies

function drawEnemies()
{
	for (var i = 0; i < TOTAL_ROWS; i++)
	{
		for (var j = 0; j < TOTAL_COLS; j++)
		{
			if (enemies[i][j].alive == true) // only draw the enemy if its alive
			{
                if (enemies[i][j].id == ENEMY_ONE)
                {
                    utilities.drawCanvasText(context2D, " ------", enemies[i][j].posX, enemies[i][j].posY, "white", "12px Courier new");
                    utilities.drawCanvasText(context2D, " \\ {} /", enemies[i][j].posX, enemies[i][j].posY+12, "white", "12px Courier new");
                    utilities.drawCanvasText(context2D, " \\ {} /", enemies[i][j].posX, enemies[i][j].posY+24, "white", "12px Courier new");
                    utilities.drawCanvasText(context2D, "  \\--/", enemies[i][j].posX, enemies[i][j].posY+36, "white", "12px Courier new");
                }
                else if (enemies[i][j].id == ENEMY_TWO)
                {
                    utilities.drawCanvasText(context2D, " ------", enemies[i][j].posX, enemies[i][j].posY, "yellow", "12px Courier new");
                    utilities.drawCanvasText(context2D, " \\ [] /", enemies[i][j].posX, enemies[i][j].posY+12, "yellow", "12px Courier new");
                    utilities.drawCanvasText(context2D, " \\ [] /", enemies[i][j].posX, enemies[i][j].posY+24, "yellow", "12px Courier new");
                    utilities.drawCanvasText(context2D, "  \\--/", enemies[i][j].posX, enemies[i][j].posY+36, "yellow", "12px Courier new");
                }
                
                else if (enemies[i][j].id == ENEMY_THREE)
                {
                    utilities.drawCanvasText(context2D, " ------", enemies[i][j].posX, enemies[i][j].posY, "red", "12px Courier new");
                    utilities.drawCanvasText(context2D, " \\ () /", enemies[i][j].posX, enemies[i][j].posY+12, "red", "12px Courier new");
                    utilities.drawCanvasText(context2D, " \\ () /", enemies[i][j].posX, enemies[i][j].posY+24, "red", "12px Courier new");
                    utilities.drawCanvasText(context2D, "  \\--/", enemies[i][j].posX, enemies[i][j].posY+36, "red", "12px Courier new");
                }
			}
		}
	}
} // end drawEnemies


function drawHeading()
{
	context2D.fillStyle = "black";
	context2D.fillRect(0, 0, canvas.width, 38);
	utilities.drawCanvasText(context2D, "ASCII Invaders", 4, 20, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, "Lives: "+livesLeft, 450, 20, "red", "16px Courier new");
	utilities.drawCanvasText(context2D, "Score: "+score, 220, 20, "orange", "16px Courier new");
    utilities.drawCanvasText(context2D, "^ ^", 640, 25, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, " X "+playerFireRate, 670, 25, "white", "bold 16px Courier new");
	context2D.fillStyle="white";
	context2D.fillRect(4,34,canvas.width-8,4);
} // end drawHeading

function drawStart()
{
	context2D.fillStyle = "black";
	context2D.fillRect(15, 50, canvas.width-30, 400);
	context2D.fillStyle="white";
	context2D.fillRect(15,46,canvas.width-30,4); // Top
	context2D.fillRect(15,450,canvas.width-30,4); // Bottom
	context2D.fillRect(15,50,4,400); // Left
	context2D.fillRect(canvas.width-15,46,4,408); // Right
    utilities.drawCanvasText(context2D, "      --         -----   ----  -----  -----", 200, 80, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "     /  \\       |       |        |      |", 200, 96, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "    /    \\      |       |        |      |", 200, 112, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "   /      \\      ----   |        |      |", 200, 130, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "  /--------\\         |  |        |      |", 200, 146, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, " /          \\        |  |        |      |", 200, 162, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "/            \\  -----    ----  -----  -----", 200, 178, "white", "16px Courier new");
    
    utilities.drawCanvasText(context2D, "-----  |\\      |  \\            /  --        |--\\     |----  |----      -----", 70, 220, "white", "14px Courier new");  //N, V, D  Invaders E, R
    utilities.drawCanvasText(context2D, "  |    | \\     |   \\          /  /  \\       |   \\    |      |    \\    | ", 70, 236, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "  |    |  \\    |    \\        /  /    \\      |    \\   |      |     \\   | ", 70, 252, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "  |    |   \\   |     \\      /  /      \\     |     \\  |----  |------    ----", 70, 268, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "  |    |    \\  |      \\    /  /--------\\    |     /  |      |     \\        |", 70, 284, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "  |    |     \\ |       \\  /  /          \\   |    /   |      |      \\       |", 70, 300, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "-----  |      \\|        \\/  /            \\  |---/    |----  |       \\  -----" , 70, 316, "white", "14px Courier new");
    
    utilities.drawCanvasText(context2D, "Press Enter to Play", 100, 500, "white", "18px Courier new");
    utilities.drawCanvasText(context2D, "Press I for Instructions", 400, 500, "white", "18px Courier new");
} // end drawStart

function drawInstructions()
{
	context2D.fillStyle = "black";
	context2D.fillRect(15, 50, canvas.width-30, 400);
	context2D.fillStyle="white";
	context2D.fillRect(15,46,canvas.width-30,4); // Top
	context2D.fillRect(15,450,canvas.width-30,4); // Bottom
	context2D.fillRect(15,50,4,400); // Left
	context2D.fillRect(canvas.width-15,46,4,408); // Right
	utilities.drawCanvasText(context2D, "Instructions:", 30, 70, "white", "16px Arial");
	utilities.drawCanvasText(context2D, "Use the left and right arrow keys to move your ship.", 32, 100, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, "Hit the space bar to fire the cannon and destroy the invading enemy force.", 32, 130, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, "1 more thing... Be sure to collect ", 32, 160, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "***", 380, 160, "yellow", "12px Courier new");
    utilities.drawCanvasText(context2D, "***", 380, 172, "yellow", "12px Courier new");
    utilities.drawCanvasText(context2D, "for a special bonus!", 412, 160, "white", "16px Courier new");

    utilities.drawCanvasText(context2D, "Press B to go back", 100, 500, "white", "18px Courier new");
} // end drawInstructions

function drawGameEnd()
{
	context2D.fillStyle = "black";
	context2D.fillRect(15, 50, canvas.width-30, 400);
	context2D.fillStyle="white";
	context2D.fillRect(15,46,canvas.width-30,4); // Top
	context2D.fillRect(15,450,canvas.width-30,4); // Bottom
	context2D.fillRect(15,50,4,400); // Left
	context2D.fillRect(canvas.width-15,46,4,408); // Right
    utilities.drawCanvasText(context2D, "      --         -----   ----  -----  -----", 200, 80, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "     /  \\       |       |        |      |", 200, 96, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "    /    \\      |       |        |      |", 200, 112, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "   /      \\      ----   |        |      |", 200, 130, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "  /--------\\         |  |        |      |", 200, 146, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, " /          \\        |  |        |      |", 200, 162, "white", "16px Courier new");
    utilities.drawCanvasText(context2D, "/            \\  -----    ----  -----  -----", 200, 178, "white", "16px Courier new");
    
    utilities.drawCanvasText(context2D, "-----  |\\      |  \\            /  --        |--\\     |----  |----      -----", 70, 220, "white", "14px Courier new");  //N, V, D  Invaders E, R
    utilities.drawCanvasText(context2D, "  |    | \\     |   \\          /  /  \\       |   \\    |      |    \\    | ", 70, 236, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "  |    |  \\    |    \\        /  /    \\      |    \\   |      |     \\   | ", 70, 252, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "  |    |   \\   |     \\      /  /      \\     |     \\  |----  |------    ----", 70, 268, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "  |    |    \\  |      \\    /  /--------\\    |     /  |      |     \\        |", 70, 284, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "  |    |     \\ |       \\  /  /          \\   |    /   |      |      \\       |", 70, 300, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "-----  |      \\|        \\/  /            \\  |---/    |----  |       \\  -----" , 70, 316, "white", "14px Courier new");
    utilities.drawCanvasText(context2D, "Thanks for playing!", 300, 350, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, "Score: "+score, 300, 370, "white", "16px Courier new");
    
    utilities.drawCanvasText(context2D, "Press E to end game", 100, 500, "white", "18px Courier New");
} // end drawGameEnd
return exports;
}
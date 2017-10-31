var dodgeball = function() {
	var exports ={};
var FPS = 30;

var BG_IMG_1 = "/js/app/webgames/dodgeball/images/bg_1.png";
var BG_IMG_2 = "/js/app/webgames/dodgeball/images/bg_2.png";
var PLAYER_IMG = "/js/app/webgames/dodgeball/images/player_ship.png";
var BULLET_IMG = "/js/app/webgames/dodgeball/images/bullet.png";
var HEALTH_METER_IMG = "/js/app/webgames/dodgeball/images/empty_meter.png";
var HEALTH_METER_INC_IMG = "/js/app/webgames/dodgeball/images/meter_increment.png";
var DODGEBALL_TYPE_1_IMG = "/js/app/webgames/dodgeball/images/dodgeball_type1.png";
var DODGEBALL_TYPE_2_IMG = "/js/app/webgames/dodgeball/images/dodgeball_type2.png";
var EXPLOSION_IMG = "/js/app/webgames/dodgeball/images/explosion.png";
var POWERUP_IMG = "/js/app/webgames/dodgeball/images/powerup.png";
var POWERUP_EXPLOSION_IMG = "/js/app/webgames/dodgeball/images/powerup_explosion.png";

var WINDOW_WIDTH = 800;
var WINDOW_HEIGHT = 600;
var HEADING_BUFFER = 42;

var GAME_STATE_START = 0;
var GAME_STATE_PLAYING = 1;
var GAME_STATE_END = 2;
var GAME_STATE_INSTRUCTIONS = 3;

var DIRECTION_LEFT = -1;
var DIRECTION_RIGHT = 1;
var DIRECTION_UP = -1;
var DIRECTION_DOWN = 1;
var DIRECTION_NONE = 0;

var PLAYER_HEALTH = 18;
var STARTING_X = 350;
var STARTING_Y = 400;
var PLAYER_SPEED = 8;
var MAX_BULLETS = 9;
var FIRE_DELAY = 5;

var MAX_ENEMIES = 100;
var ENEMY_TYPE_1 = 0;
var ENEMY_TYPE_2 = 1;
var ENEMY_TYPE_1_HEALTH = 1;
var ENEMY_TYPE_2_HEALTH = 2;
var ENEMY_TYPE_1_POINTS = 10;
var ENEMY_TYPE_2_POINTS = 20;
var ENEMY_WIDTH = 32;
var ENEMY_HEIGHT = 32;
var ENEMY_TYPE_1_MIN_VEL = 4;
var ENEMY_TYPE_1_MAX_VEL = 10;
var ENEMY_TYPE_2_MIN_VEL = 5;
var ENEMY_TYPE_2_MAX_VEL = 12;
var ENEMY_MIN_STARTING_Y = 400;

var EXPLOSION_WIDTH = 32;
var EXPLOSION_HEIGHT = 32;

var POWERUP_WIDTH = 24;
var POWERUP_HEIGHT = 25;

var canvas = null;
var context2D = null;

var bgSprAr = null; // Array to hold scrolling background
var bgSprAr2 = null; // Array to hold 2nd set of scrolling background, this is for parallax scrolling

var playerShip = null;
var bullets = null; // Array of bullets the player fires
var fireCounter;
var currentBullets;
var score;

var enemies = null; // Array to hold enemies
var currentEnemies;
var enemyType1Img = null;
var enemyType2Img = null;

var explosion = null;
var powerup = null;
var powerupExplosion = null;
var healthMeterSpr = null;
var healthMeterImg = null;
var healthMeterIncImg = null;
var bulletImg = null;

var scoreCounter;
var currentEnemiesCounter;

var gameState;
var intervalId = -1; // used to control if there is already an interval set or not.
var timeIntervalId = -1;

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

exports.loadGame = function()
{
	canvas = document.getElementById('gameBoard');
	context2D = canvas.getContext('2d');

	healthMeterImg = new Image();
	healthMeterImg.src = HEALTH_METER_IMG;
	healthMeterIncImg = new Image();
	healthMeterIncImg.src = HEALTH_METER_INC_IMG;
	bulletImg = new Image();
	bulletImg.src = BULLET_IMG;
	
	bgSprAr = new Array();
	bgSprAr[0] = new Sprite(BG_IMG_1, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT, 0, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, true, DIRECTION_NONE, DIRECTION_DOWN);
	bgSprAr[1] = new Sprite(BG_IMG_1, 0, -600, WINDOW_WIDTH, WINDOW_HEIGHT, 0, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, true, DIRECTION_NONE, DIRECTION_DOWN);
	bgSprAr[2] = new Sprite(BG_IMG_1, 0, -1200, WINDOW_WIDTH, WINDOW_HEIGHT, 0, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, true, DIRECTION_NONE, DIRECTION_DOWN);
	bgSprAr2 = new Array();
	bgSprAr2[0] = new Sprite(BG_IMG_2, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT, 0, 4, 0, 0, 0, 1, 1, 1, 0, 0, 0, true, DIRECTION_NONE, DIRECTION_DOWN);
	bgSprAr2[1] = new Sprite(BG_IMG_2, 0, -600, WINDOW_WIDTH, WINDOW_HEIGHT, 0, 4, 0, 0, 0, 1, 1, 1, 0, 0, 0, true, DIRECTION_NONE, DIRECTION_DOWN);
	bgSprAr2[2] = new Sprite(BG_IMG_2, 0, -1200, WINDOW_WIDTH, WINDOW_HEIGHT, 0, 4, 0, 0, 0, 1, 1, 1, 0, 0, 0, true, DIRECTION_NONE, DIRECTION_DOWN);
	playerShip = new Sprite(PLAYER_IMG, STARTING_X, STARTING_Y, 57, 42, 0, 0, 0, 0, 0, 3, 3, 1, 0, PLAYER_HEALTH, 0, true, DIRECTION_NONE, DIRECTION_NONE);
	
	// These are the variables that need to be reset to play again
	/**************************************************************/
	currentBullets = 1;
	fireCounter = 0;
	score = 0;
	currentEnemies = 10;
	currentEnemyCounter = 0;
	currentScoreCounter = 0;
	gameState = GAME_STATE_START;
	/**************************************************************/
	
	bullets = new Array()
	for (var i = 0; i < MAX_BULLETS; i++)
	{
		bullets[i] = new Sprite(BULLET_IMG, 0, 0, 15, 15, 0, 12, 12, 0, 0, 1, 1, 1, 0, 0, 0, false, DIRECTION_NONE, DIRECTION_UP);
	}
	
	enemies = new Array();
	enemyType1Img = new Image();
	enemyType1Img.src = DODGEBALL_TYPE_1_IMG;
	enemyType2Img = new Image();
	enemyType2Img.src = DODGEBALL_TYPE_2_IMG
	for (var i = 0; i < MAX_ENEMIES; i++)
	{
		enemies[i] = new Sprite(DODGEBALL_TYPE_1_IMG, 0, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, 0, 0, 0, 0, 32, 8, 1, 0, 0, 0, false, DIRECTION_NONE, DIRECTION_NONE);
	}
	
	explosion = new Sprite(EXPLOSION_IMG, 0, 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, 0, 0, 0, 0, 0, 6, 6, 1, 0, 0, 0, false, DIRECTION_NONE, DIRECTION_NONE);
	//Sprite(imageFileName, x, y, width, height, xVel, yVel, maxVel, xDelay, yDelay, totalFrames, frameCols, animDir, frameDelay, health, damage, alive, xDirection, yDirection)	
	
	powerup = new Sprite(POWERUP_IMG, 0, 0, POWERUP_WIDTH, POWERUP_HEIGHT, 0, 5, 5, 0, 0, 1, 1, 1, 0, 0, 0, false, DIRECTION_NONE, DIRECTION_DOWN);
	powerupExplosion = new Sprite(POWERUP_EXPLOSION_IMG, 0, 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, 0, 0, 0, 0, 0, 6, 6, 1, 0, 0, 0, false, DIRECTION_NONE, DIRECTION_NONE);
	
	if (intervalId != -1) // This means an interval has been set
		clearInterval(intervalId);
	intervalId = setInterval(mainLoop, 1000 / FPS);
}

function loadGameValues()
{
	if (timeIntervalId != -1)
		clearInterval(timeIntervalId);
	timeIntervalId = setInterval(countSeconds, 1000);
		
	currentBullets = 1;
	fireCounter = 0;
	score = 0;
	currentEnemies = 10;
	currentEnemyCounter = 0;
	currentScoreCounter = 0;
	
	for (var i = 0; i < bullets.length; i++)
	{
		bullets[i].alive = false;
	}
	for (var i = 0; i < enemies.length; i++)
	{
		enemies[i].alive = false;
	}
	explosion.alive = false;
	powerup.alive = false;
	powerupExplosion.alive = false;
	playerShip.x = STARTING_X;
	playerShip.y = STARTING_Y;
	playerShip.health = PLAYER_HEALTH;
	placeEnemies();
}

function countSeconds()
{
	currentEnemyCounter++;
	currentScoreCounter++;
}

function mainLoop()
{
	context2D.clearRect(0, 0, canvas.width, canvas.height); // Erase
	getInput();
	updateBackground();
	drawBackground();
	if (gameState == GAME_STATE_START)
	{
		drawStart();
	}
	else if (gameState == GAME_STATE_PLAYING)
	{
		placeEnemies();
		incrementScore();
		incrementEnemies();
		updatePlayerShip();
		playerShip.updateAnimation();
		updateBullets();
		updateEnemies();
		updateExplosion();
		updatePowerup();
		updatePowerupExplosion();
	
		// Draw components
		drawEnemies();
		drawBullets();
		powerup.drawFrame(context2D);
		playerShip.drawFrame(context2D);
		explosion.drawFrame(context2D);
		powerupExplosion.drawFrame(context2D);
		drawHeading(); // Always draw last
		//drawDebug();
	
		fireCounter++;
	}
	else if (gameState == GAME_STATE_INSTRUCTIONS)
	{
		drawInstructions();
	}
	else if (gameState == GAME_STATE_END)
	{
		drawEnd();
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
		// Left is pressed
		if ((37 in keys && keys[37]) || (65 in keys && keys[65]))// && !isKeyPressed)
		{
			playerShip.x -= PLAYER_SPEED;
		} // end left is pressed
	
		// Right is pressed
		if ((39 in keys && keys[39]) || (68 in keys && keys[68]))// && !isKeyPressed)
		{
			playerShip.x += PLAYER_SPEED;
		} // end right is pressed
	
		// Down is pressed
		if ((40 in keys && keys[40]) || (83 in keys && keys[83]))// && !isKeyPressed)
		{
			playerShip.y += PLAYER_SPEED;
		} // end else if down is pressed
	
		// Up is pressed
		if ((38 in keys && keys[38]) || (87 in keys && keys[87]))// && !isKeyPressed)	
		{
			playerShip.y -= PLAYER_SPEED;
		} // end else if up is pressed
	
		// Spacebar pressed
		if (32 in keys && keys[32] == true)
		{
			if (fireCounter > FIRE_DELAY)
			{
				fireCounter = 0;
				fireBullet();
			}
		} // end spacebar is pressed
	} // end playing game state
} // end getInput

function updateBackground()
{
	for (var i = 0; i < bgSprAr.length; i++)
	{
		bgSprAr[i].updatePosition();
		if (bgSprAr[i].y > WINDOW_HEIGHT)
			bgSprAr[i].y = -1200;
	}
	for (var i = 0; i < bgSprAr2.length; i++)
	{
		bgSprAr2[i].updatePosition();
		if (bgSprAr2[i].y > WINDOW_HEIGHT)
			bgSprAr2[i].y = -1200;
	}
}

function drawBackground()
{
	for (var i = 0; i < bgSprAr.length; i++)
		bgSprAr[i].drawFrame(context2D);
	for (var i = 0; i < bgSprAr2.length; i++)
		bgSprAr2[i].drawFrame(context2D);
}

function updatePlayerShip()
{
	playerShip.updatePosition();
	if (playerShip.x < 0)
		playerShip.x = 2;
	if (playerShip.x + playerShip.width > WINDOW_WIDTH)
	{
		playerShip.x = WINDOW_WIDTH - playerShip.width - 2;
	}
	if (playerShip.y < HEADING_BUFFER)
	{
		playerShip.y = HEADING_BUFFER + 2;
	}
	if (playerShip.y + playerShip.height > WINDOW_HEIGHT)
	{
		playerShip.y = WINDOW_HEIGHT - playerShip.height - 2;
	}
	for (var i = 0; i < currentEnemies; i++)
	{
		if (enemies[i].alive)
		{
			if (playerShip.collided(enemies[i]))
			{
				enemies[i].alive = false;
				explosion.x = playerShip.x+(playerShip.width/4);
				explosion.y = playerShip.y+(playerShip.height/4);
				explosion.alive = true;
				playerShip.health--;
				if (playerShip.health == 0)
				{
					gameState = GAME_STATE_END;
					break;
				}
				currentBullets--;
				if (currentBullets < 1)
					currentBullets = 1;
			}
		}
	}
	if (powerup.alive)
	{
		if (powerup.collided(playerShip))
		{
			powerup.alive = false;
			currentBullets++;
			if (currentBullets > MAX_BULLETS)
				currentBullets = MAX_BULLETS;
			if (currentBullets == MAX_BULLETS)
				score += 100;
			powerupExplosion.x = playerShip.x+(playerShip.width/4);
			powerupExplosion.y = playerShip.y+(playerShip.height/4);
			powerupExplosion.alive = true;
		}
	}
}

function fireBullet()
{
	for (var i = 0; i < currentBullets; i++)
	{
		if (bullets[i].alive == false) // only create 1 bullet at a time
		{
			bullets[i].x = playerShip.x+(playerShip.width/3);
			bullets[i].y = playerShip.y+(playerShip.height/4);
			bullets[i].alive = true;
			break;
		}
	}
}

function updateBullets()
{
	for (var i = 0; i < currentBullets; i++)
	{
		bullets[i].updatePosition();
		if (bullets[i].x < 0 || bullets[i].x > WINDOW_WIDTH || bullets[i].y+bullets[i].width < HEADING_BUFFER || bullets[i].y > WINDOW_HEIGHT)
			bullets[i].alive = false;
	}
}

function drawBullets()
{
	for (var i = 0; i < currentBullets; i++)
	{
		bullets[i].drawFrame(context2D);
	}
}

function placeEnemies()
{
	for (var i = 0; i < currentEnemies; i++)
	{
		if (!enemies[i].alive)
			placeEnemy(enemies[i]);
	}
}

function placeEnemy(enemy)
{
	enemy.x = utilities.randomFromTo(2, WINDOW_WIDTH-enemy.width-2);		
	enemy.y = utilities.randomFromTo(0, ENEMY_MIN_STARTING_Y);
	enemy.y *= -1;
	enemy.type = utilities.randomFromTo(0, 1);
	if (enemy.type == ENEMY_TYPE_1)
	{
		enemy.health = ENEMY_TYPE_1_HEALTH;
		enemy.points = ENEMY_TYPE_1_POINTS;
		enemy.yVel = utilities.randomFromTo(ENEMY_TYPE_1_MIN_VEL, ENEMY_TYPE_1_MAX_VEL);
		enemy.yDirection = DIRECTION_DOWN;
		enemy.alive = true;
	}
	else
	{
		enemy.health = ENEMY_TYPE_2_HEALTH;
		enemy.points = ENEMY_TYPE_2_POINTS;
		enemy.yVel = utilities.randomFromTo(ENEMY_TYPE_2_MIN_VEL, ENEMY_TYPE_2_MAX_VEL);
		enemy.yDirection = DIRECTION_DOWN;
		enemy.xVel = utilities.randomFromTo(0, 5);
		if (enemy.x > playerShip.x) // enemy must be to the right of the player, so move him left
			enemy.xDirection = DIRECTION_LEFT;
		if (enemy.x < playerShip.x) // enemy must be to the left of the player, so move him right
			enemy.xDirection = DIRECTION_RIGHT;
		enemy.alive = true;
	}
}

function updateEnemies()
{
	for (var i = 0; i < currentEnemies; i++)
	{
		enemies[i].updateAnimation();
		enemies[i].updatePosition();
		if (enemies[i].x+enemies[i].width < 0 || enemies[i].x > WINDOW_WIDTH || enemies[i].y > WINDOW_HEIGHT)
		{
			enemies[i].alive = false;
		}
		if (enemies[i].alive)
		{
			for (var j = 0; j < currentBullets; j++)
			{
				if (bullets[j].alive)
				{
					if (bullets[j].collided(enemies[i]))
					{
						enemies[i].health--;
						bullets[j].alive = false;
						explosion.x = enemies[i].x+(enemies[i].width/4);
						explosion.y = enemies[i].y+(enemies[i].height/4);
						explosion.alive = true;
						if (enemies[i].health <= 0)
						{
							enemies[i].alive = false;
							if (!powerup.alive)
							{
								powerup.x = enemies[i].x+(enemies[i].width/4);
								powerup.y = enemies[i].y+(enemies[i].height/4);
								powerup.alive = true;
							}
							if (enemies[i].type == ENEMY_TYPE_1)
							{
								score += ENEMY_TYPE_1_POINTS;
							}
							else
							{
								score += ENEMY_TYPE_2_POINTS;
							}
							//placeEnemy(enemies[i]);
						}
					}
				}
			}
		}
	}
}

function drawEnemies()
{
	for (var i = 0; i < currentEnemies; i++)
	{
		if (enemies[i].type == ENEMY_TYPE_1)
			enemies[i].drawFrame1(context2D, enemyType1Img);
		else
			enemies[i].drawFrame1(context2D, enemyType2Img);
	}
}

function drawHeading()
{
	context2D.fillStyle = "black";
	context2D.fillRect(0, 0, canvas.width, HEADING_BUFFER);
	utilities.drawCanvasText(context2D, "Dodgeball", 4, 20, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, "Score: "+score, 220, 20, "orange", "16px Courier new");
	context2D.drawImage(bulletImg, 600, 10);
	utilities.drawCanvasText(context2D, " X: "+ currentBullets, 625, 20, "white", "16px Courier new");
	context2D.fillStyle="white";
	context2D.fillRect(4,34,canvas.width-8,4);
	drawHealth();
}

function drawStart()
{
	utilities.drawCanvasText(context2D, "Dodgeball", 300, 250, "white", "32px Courier new");
	utilities.drawCanvasText(context2D, "Press Enter To Start", 225, 300, "white", "28px Courier new");
	utilities.drawCanvasText(context2D, "Press I For Instructions", 200, 350, "white", "28px Courier new");
}

function drawInstructions()
{
	utilities.drawCanvasText(context2D, "Dodge and destroy in this fast paced, vertical scrolling, arcade shooter!", 50, 100, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, "Use the arrow keys to move and the spacebar to shoot as you blast", 50, 140, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, "your way through endless waves of enemies.", 50, 180, "white", "16px Courier new");
	utilities.drawCanvasText(context2D, "Dodge, Duck, Dip, Dive, and Dodge!", 175, 280, "white", "22 Courier new");
	utilities.drawCanvasText(context2D, "Press B to go back", 250, 400, "white", "22 Courier new");
}

function drawEnd()
{
	utilities.drawCanvasText(context2D, "Thanks for Playing!", 200, 250, "white", "32px Courier new");
	utilities.drawCanvasText(context2D, "Final Score: "+score, 275, 300, "white", "22px Courier new");
	utilities.drawCanvasText(context2D, "Press E to end game", 250, 350, "white", "22 Courier new");
}

function drawHealth()
{
	context2D.drawImage(healthMeterImg, 400, 10);
	var startX = 402;
	for (i = playerShip.health; i > 0; i--)
		context2D.drawImage(healthMeterIncImg, 528-i*healthMeterIncImg.width, healthMeterIncImg.height+2);
}

function updateExplosion()
{
	if (explosion.alive)
	{
		//update frame based on animdir
		if (++explosion.frameCounter > explosion.frameDelay)
		{
			explosion.frameCounter = 0;
			explosion.curFrame += explosion.animDir;

			if (explosion.curFrame < 0)
			{
				explosion.curFrame = explosion.totalFrames-1;
			}
			if (explosion.curFrame > explosion.totalFrames-1)
			{
				explosion.curFrame = 0;
				explosion.alive = false;
			}
		}
	} // end is alive
}

function updatePowerupExplosion()
{
	if (powerupExplosion.alive)
	{
		//update frame based on animdir
		if (++powerupExplosion.frameCounter > powerupExplosion.frameDelay)
		{
			powerupExplosion.frameCounter = 0;
			powerupExplosion.curFrame += powerupExplosion.animDir;

			if (powerupExplosion.curFrame < 0)
			{
				powerupExplosion.curFrame = powerupExplosion.totalFrames-1;
			}
			if (powerupExplosion.curFrame > powerupExplosion.totalFrames-1)
			{
				powerupExplosion.curFrame = 0;
				powerupExplosion.alive = false;
			}
		}
	}
}

function updatePowerup()
{
	powerup.updatePosition();
	if (powerup.y > WINDOW_HEIGHT)
	{
		if (powerup.alive)
		{
			currentBullets--;
			if (currentBullets < 1)
				currentBullets = 1;
		}
		powerup.alive = false;
	}
}

function incrementScore()
{
	if (gameState == GAME_STATE_PLAYING)
	{
		if (currentScoreCounter >= 2)
		{
			score++;
			currentScoreCounter = 0;
		}
	}
}

function incrementEnemies()
{
	if (gameState == GAME_STATE_PLAYING)
	{
		if (currentEnemyCounter >= 60)
		{
			currentEnemies *= 2;
			if (currentEnemies > MAX_ENEMIES)
				currentEnemies = MAX_ENEMIES;
			currentEnemyCounter = 0;
		}
	}
}

function drawDebug()
{
	utilities.drawCanvasText(context2D, "Score Counter "+currentScoreCounter, 5, 120, "white", "10px Courier new");
	utilities.drawCanvasText(context2D, "Current Enemies Counter "+currentEnemyCounter, 5, 140, "white", "10px Courier new");
	utilities.drawCanvasText(context2D, "powerup alive: " + powerup.alive, 5, 180, "white", "10px Courier new");
	utilities.drawCanvasText(context2D, "Total Enemies: " + currentEnemies, 5, 200, "white", "10px Courier new");
	
}
exports.title = "Dodgeball";
return exports;
}
var foodFrenzySlot = function() {
	var exports = {};
var FPS = 30;

var SOURCE_TITLE_SECTION_IMAGE = "/js/app/webgames/foodfrenzyslot/images/titleSection.png";
var SOURCE_BODY_SECTION_IMAGE = "/js/app/webgames/foodfrenzyslot/images/bodySection.png";
var SOURCE_BUTTON_SECTION_IMAGE = "/js/app/webgames/foodfrenzyslot/images/buttonSection.png";
var SOURCE_BETTING_AREA_BACKGROUND_IMAGE = "/js/app/webgames/foodfrenzyslot/images/BettingAreaBackground.png";

var SOURCE_BUTTON_LINES_1_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_1_up.png";
var SOURCE_BUTTON_LINES_1_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_1_down.png";
var SOURCE_BUTTON_LINES_5_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_5_up.png";
var SOURCE_BUTTON_LINES_5_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_5_down.png";
var SOURCE_BUTTON_LINES_10_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_10_up.png";
var SOURCE_BUTTON_LINES_10_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_10_down.png";
var SOURCE_BUTTON_LINES_20_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_20_up.png";
var SOURCE_BUTTON_LINES_20_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_20_down.png";
var SOURCE_BUTTON_LINES_1_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_1_pressed.png";
var SOURCE_BUTTON_LINES_5_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_5_pressed.png";
var SOURCE_BUTTON_LINES_10_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_10_pressed.png";
var SOURCE_BUTTON_LINES_20_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_lines_20_pressed.png";
var SOURCE_PLAYAGAIN_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_playagain_up.png";
var SOURCE_PLAYAGAIN_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_playagain_down.png";

var SOURCE_BUTTON_BET_1_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_1_up.png";
var SOURCE_BUTTON_BET_1_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_1_down.png";
var SOURCE_BUTTON_BET_1_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_1_pressed.png";
var SOURCE_BUTTON_BET_5_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_5_up.png";
var SOURCE_BUTTON_BET_5_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_5_down.png";
var SOURCE_BUTTON_BET_5_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_5_pressed.png";
var SOURCE_BUTTON_BET_10_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_10_up.png";
var SOURCE_BUTTON_BET_10_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_10_down.png";
var SOURCE_BUTTON_BET_10_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_10_pressed.png";
var SOURCE_BUTTON_BET_15_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_15_up.png";
var SOURCE_BUTTON_BET_15_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_15_down.png";
var SOURCE_BUTTON_BET_15_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_15_pressed.png";
var SOURCE_BUTTON_BET_25_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_25_up.png";
var SOURCE_BUTTON_BET_25_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_25_down.png";
var SOURCE_BUTTON_BET_25_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_25_pressed.png";
var SOURCE_BUTTON_BET_MAX_UP_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_max_up.png";
var SOURCE_BUTTON_BET_MAX_DOWN_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_max_down.png";
var SOURCE_BUTTON_BET_MAX_PRESSED_IMAGE = "/js/app/webgames/foodfrenzyslot/images/button_bet_max_pressed.png";

var SOURCE_BUTTON_NEXT_THEME_IMAGE_UP = "/js/app/webgames/foodfrenzyslot/images/button_next_theme_up.png";
var SOURCE_BUTTON_NEXT_THEME_IMAGE_DOWN = "/js/app/webgames/foodfrenzyslot/images/button_next_theme_down.png";
var SOURCE_BUTTON_CLOSE_IMAGE_UP = "/js/app/webgames/foodfrenzyslot/images/button_close_up.png";
var SOURCE_BUTTON_CLOSE_IMAGE_DOWN = "/js/app/webgames/foodfrenzyslot/images/button_close_down.png";
var SOURCE_BUTTON_CHANGE_THEME_UP = "/js/app/webgames/foodfrenzyslot/images/button_change_theme_up.png";
var SOURCE_BUTTON_CHANGE_THEME_DOWN = "/js/app/webgames/foodfrenzyslot/images/button_change_theme_down.png";

var THEME_CONCESSION_STAND = 0;
var THEME_GROCERY_STORE = 1;
var THEME_BAKERY = 2;

var BLOCK_1 = 0;
var BLOCK_2 = 1;
var BLOCK_3 = 2;
var BLOCK_4 = 3;
var BLOCK_5 = 4;
var TOTAL_BLOCKS = 5;

var BLOCK_IMAGE_SOURCES = new Array();
// bread, cookie, rumroll, pie, cake
// 1, 3, 13, 9, 2
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_beercan.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_bread.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_cake.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_cookie.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_cottonCandy.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_egg.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_groceries.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_hotdog.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_milk.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_pie.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_pizza.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_pop.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_popcorn.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_rumroll.png");
BLOCK_IMAGE_SOURCES.push("/js/app/webgames/foodfrenzyslot/images/blocks/block_watermelon.png");

var TOTAL_COLS = 5;
var TOTAL_ROWS = 4;
var COL_BUFFER = 80;
var ROW_BUFFER = 40;

var STARTING_X = 50;
var STARTING_Y = 62;

var ROW_1_Y = STARTING_Y+(1*(72+ROW_BUFFER));
var ROW_2_Y = STARTING_Y+(2*(72+ROW_BUFFER));
var ROW_3_Y = STARTING_Y+(3*(72+ROW_BUFFER));

var STARTING_CREDITS = 10000;

var LINE_BET_1_INDEX = 0;
var LINE_BET_5_INDEX = 1;
var LINE_BET_10_INDEX = 2;
var LINE_BET_20_INDEX = 3;

var BET_1_INDEX = 0;
var BET_5_INDEX = 1;
var BET_10_INDEX = 2;
var BET_15_INDEX = 3;
var BET_25_INDEX = 4;
var BET_MAX_INDEX = 5;

var COUNT_THRESHOLD_START = 200;
var MAX_COUNTING_RATE = 30;

var canvas = null;
var context2D = null;

var titleSectionImage = null;
var bodySectionImage = null;
var buttonSectionImage = null;
var bettingAreaBackgroundImage = null;

// Line button images
var button_lines1_image_up = null;
var button_lines1_image_down = null;
var button_lines5_image_up = null;
var button_lines5_image_down = null;
var button_lines10_image_up = null;
var button_lines10_image_down = null;
var button_lines20_image_up = null;
var button_lines20_image_down = null;

var button_bet1_image_up = null;
var button_bet1_image_down = null;
var button_bet5_image_up = null;
var button_bet5_image_down = null;
var button_bet10_image_up = null;
var button_bet10_image_down = null;
var button_bet15_image_up = null;
var button_bet15_image_down = null;
var button_bet25_image_up = null;
var button_bet25_image_down = null;
var button_betmax_image_up = null;
var button_betmax_image_down = null;
var button_playagain_image_up = null;
var button_playagain_image_down = null;

var blockImages = null; // array to hold block images
var blockImagesDef = null;

var betButtons = null;
var lineButtons = null;
var betButtonPressedImages = null;
var lineButtonPressedImages = null;
var playAgainButton = null;

var button_next_theme_image_up = null;
var button_next_theme_image_down = null;
var button_next_theme = null;
var button_close_image_up = null;
var button_close_image_down = null;
var button_close = null;
var button_change_theme_image_up = null;
var button_change_theme_image_down = null;
var button_change_theme = null;

var blocks = null; // 2d array to hold all the blocks

var spinSpeed = null; // array to hold spin speeds for each column

var stoppedCols = null; // array to hold the columns as they stop

var winningLines = null; // 3d array to hold the winning combos
var winningLinesColors = null; // Array to hold colors for each block type highlighted

var remainingCredits;
var winAmount;
var totalBet;
var lineBet;
var linesPlayed;
var isLinesPlayedSelected;
var isBetSelected;
var isSpinning;
var foundWinnings;
var totalWonInRound; // Keeps track of how much was won for a round so speed of incrementing can increase if its a lot
var originalWonInRound; // Keeps track of the original total amount won for 1 spin
var lineCredits; // Array to keep track of what each line is worth

var spinDuration;
var spinCounter;
var countingRateThreshold;
var countingRate;
var highlightCounter;
var highlightDelay;
var highlightedLine;
var linesWon;
var linesWonAr = null;

var insufficientFundsFl;
var insufficientFundsCounter;
var unsufficientFundsDelay;

var isLastSpin;
var isGameOver;

var lineCredits = new Array(1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5);
var blockCredits = new Array(
								1, 1, 1, 2, 2
						       );
var isWinCounting = false;
var currentTheme;
var mpressed = false;
var prev_mpressed = false;
var isThemeChange = true;

var intervalId = -1;

var keys = new Array();

var utilities = gameUtilities();

window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);
function keyDown(evt){
 keys[evt.keyCode] = true;
 evt.returnValue = false;
}
function keyUp(evt){
 keys[evt.keyCode] = false;
 evt.returnValue = false;
}

//window.onload = loadGame;

window.addEventListener('mousemove', mouseMoved, true);
window.addEventListener('mouseup', onMouseUp, true);
window.addEventListener('mousedown', onMouseDown, true);
var mouseX = 0;
var mouseY = 0;

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

function onMouseDown(e)
{
	prev_mpressed = mpressed;
	mpressed = true;
} // end onMouseDown

function onMouseUp(e)
{
	prev_mpressed = mpressed;
    mpressed = false;
} // end onMouseUp

function Sprite(posX, posY, alive, id)
{
    this.id = id;
	this.posX = posX;
	this.posY = posY;
	this.alive = alive;
	this.frameX = 0;
	this.frameY = 0;
	this.spinCounter = 0;
	this.spinDelay = 0;
	this.scaleX = 0;
	this.scaleY = 0;
	this.velX = 0;
	this.velY = 0;
	this.row = 0;
	this.col = 0;
} // end Object Sprite

exports.loadGame = function()
{
	canvas = document.getElementById('gameBoard');
	context2D = canvas.getContext('2d');
    
    // Load slot machine chrome
    titleSectionImage = new Image();
    titleSectionImage.src = SOURCE_TITLE_SECTION_IMAGE;
    bodySectionImage = new Image();
    bodySectionImage.src = SOURCE_BODY_SECTION_IMAGE;
    buttonSectionImage = new Image();
    buttonSectionImage.src = SOURCE_BUTTON_SECTION_IMAGE;
    bettingAreaBackgroundImage = new Image();
    bettingAreaBackgroundImage.src = SOURCE_BETTING_AREA_BACKGROUND_IMAGE;
	
	button_next_theme_image_up = new Image();
	button_next_theme_image_up.src = SOURCE_BUTTON_NEXT_THEME_IMAGE_UP;
	button_next_theme_image_down = new Image();
	button_next_theme_image_down.src = SOURCE_BUTTON_NEXT_THEME_IMAGE_DOWN;
	button_next_theme = new Button(((canvas.width/2)-200)+10, 125, 80, 40, button_next_theme_image_up, button_next_theme_image_down, false, true, STATE_UP);
	
	button_close_image_up = new Image();
	button_close_image_up.src = SOURCE_BUTTON_CLOSE_IMAGE_UP;
	button_close_image_down = new Image();
	button_close_image_down.src = SOURCE_BUTTON_CLOSE_IMAGE_DOWN;
	button_close = new Button(500, 250, 80, 40, button_close_image_up, button_close_image_down, false, true, STATE_UP);
	
	button_change_theme_image_up = new Image();
	button_change_theme_image_up.src = SOURCE_BUTTON_CHANGE_THEME_UP;
	button_change_theme_image_down = new Image();
	button_change_theme_image_down.src = SOURCE_BUTTON_CHANGE_THEME_DOWN;
	button_change_theme = new Button(700, 40, 80, 40, button_change_theme_image_up, button_change_theme_image_down, false, true, STATE_UP);
	
    // lines button images
    button_lines1_image_up = new Image();
    button_lines1_image_up.src = SOURCE_BUTTON_LINES_1_UP_IMAGE;
    button_lines1_image_down = new Image();
    button_lines1_image_down.src = SOURCE_BUTTON_LINES_1_DOWN_IMAGE;
    
    button_lines5_image_up = new Image();
    button_lines5_image_up.src = SOURCE_BUTTON_LINES_5_UP_IMAGE;
    button_lines5_image_down = new Image();
    button_lines5_image_down.src = SOURCE_BUTTON_LINES_5_DOWN_IMAGE;
    
    button_lines10_image_up = new Image();
    button_lines10_image_up.src = SOURCE_BUTTON_LINES_10_UP_IMAGE;
    button_lines10_image_down = new Image();
    button_lines10_image_down.src = SOURCE_BUTTON_LINES_10_DOWN_IMAGE;
    
    button_lines20_image_up = new Image();
    button_lines20_image_up.src = SOURCE_BUTTON_LINES_20_UP_IMAGE;
    button_lines20_image_down = new Image();
    button_lines20_image_down.src = SOURCE_BUTTON_LINES_20_DOWN_IMAGE;
    
    button_bet1_image_up = new Image();
    button_bet1_image_up.src = SOURCE_BUTTON_BET_1_UP_IMAGE;
    button_bet1_image_down = new Image();
    button_bet1_image_down.src = SOURCE_BUTTON_BET_1_DOWN_IMAGE;
    button_bet5_image_up = new Image();
    button_bet5_image_up.src = SOURCE_BUTTON_BET_5_UP_IMAGE;
    button_bet5_image_down = new Image();
    button_bet5_image_down.src = SOURCE_BUTTON_BET_5_DOWN_IMAGE;
    button_bet10_image_up = new Image();
    button_bet10_image_up.src = SOURCE_BUTTON_BET_10_UP_IMAGE;
    button_bet10_image_down = new Image();
    button_bet10_image_down.src = SOURCE_BUTTON_BET_10_DOWN_IMAGE;
    button_bet15_image_up = new Image();
    button_bet15_image_up.src = SOURCE_BUTTON_BET_15_UP_IMAGE;
    button_bet15_image_down = new Image();
    button_bet15_image_down.src = SOURCE_BUTTON_BET_15_DOWN_IMAGE;
    button_bet25_image_up = new Image();
    button_bet25_image_up.src = SOURCE_BUTTON_BET_25_UP_IMAGE;
    button_bet25_image_down = new Image();
    button_bet25_image_down.src = SOURCE_BUTTON_BET_25_DOWN_IMAGE;
    button_betmax_image_up = new Image();
    button_betmax_image_up.src = SOURCE_BUTTON_BET_MAX_UP_IMAGE;
    button_betmax_image_down = new Image();
    button_betmax_image_down.src = SOURCE_BUTTON_BET_MAX_DOWN_IMAGE;
    
	button_playagain_up_image = new Image();
	button_playagain_up_image.src = SOURCE_PLAYAGAIN_UP_IMAGE;
	button_playagain_down_image = new Image();
	button_playagain_down_image.src = SOURCE_PLAYAGAIN_DOWN_IMAGE;
	playAgainButton = new Button(320, 300, 160, 80, button_playagain_up_image, button_playagain_down_image, false, true, STATE_UP);
	
    // Button Objects
    lineButtons = new Array();
    betButtons = new Array();
    lineButtons[0] = new Button(15, 510, 80, 40, button_lines1_image_up, button_lines1_image_down, false, true, STATE_UP);
    lineButtons[1] = new Button(105, 510, 80, 40, button_lines5_image_up, button_lines5_image_down, false, true, STATE_UP);
    lineButtons[2] = new Button(195, 510, 80, 40, button_lines10_image_up, button_lines10_image_down, false, true, STATE_UP);
    lineButtons[3] = new Button(285, 510, 80, 40, button_lines20_image_up, button_lines20_image_down, false, true, STATE_UP);
    
    lineButtonPressedImages = new Array();
    lineButtonPressedImages[0] = new Image();
    lineButtonPressedImages[0].src = SOURCE_BUTTON_LINES_1_PRESSED_IMAGE;
    lineButtonPressedImages[1] = new Image();
    lineButtonPressedImages[1].src = SOURCE_BUTTON_LINES_5_PRESSED_IMAGE;
    lineButtonPressedImages[2] = new Image();
    lineButtonPressedImages[2].src = SOURCE_BUTTON_LINES_10_PRESSED_IMAGE;
    lineButtonPressedImages[3] = new Image();
    lineButtonPressedImages[3].src = SOURCE_BUTTON_LINES_20_PRESSED_IMAGE;
    
    betButtons[0] = new Button(15, 555, 80, 40, button_bet1_image_up, button_bet1_image_down, false, true, STATE_UP);
    betButtons[1] = new Button(105, 555, 80, 40, button_bet5_image_up, button_bet5_image_down, false, true, STATE_UP);
    betButtons[2] = new Button(195, 555, 80, 40, button_bet10_image_up, button_bet10_image_down, false, true, STATE_UP);
    betButtons[3] = new Button(285, 555, 80, 40, button_bet15_image_up, button_bet15_image_down, false, true, STATE_UP);
    betButtons[4] = new Button(375, 555, 80, 40, button_bet25_image_up, button_bet25_image_down, false, true, STATE_UP);
    betButtons[5] = new Button(375, 510, 80, 40, button_betmax_image_up, button_betmax_image_down, false, true, STATE_UP);
    
    betButtonPressedImages = new Array();
    betButtonPressedImages[0] = new Image();
    betButtonPressedImages[0].src = SOURCE_BUTTON_BET_1_PRESSED_IMAGE;
    betButtonPressedImages[1] = new Image();
    betButtonPressedImages[1].src = SOURCE_BUTTON_BET_5_PRESSED_IMAGE;
    betButtonPressedImages[2] = new Image();
    betButtonPressedImages[2].src = SOURCE_BUTTON_BET_10_PRESSED_IMAGE;
    betButtonPressedImages[3] = new Image();
    betButtonPressedImages[3].src = SOURCE_BUTTON_BET_15_PRESSED_IMAGE;
    betButtonPressedImages[4] = new Image();
    betButtonPressedImages[4].src = SOURCE_BUTTON_BET_25_PRESSED_IMAGE;
    betButtonPressedImages[5] = new Image();
    betButtonPressedImages[5].src = SOURCE_BUTTON_BET_MAX_PRESSED_IMAGE;
    
    blockImagesDef = new Array();
    for (var i = 0; i < BLOCK_IMAGE_SOURCES.length; i++)
    {
        blockImagesDef[i] = new Image();
        blockImagesDef[i].src = BLOCK_IMAGE_SOURCES[i];
    }
    blockImages = new Array();
	for (var i = 0; i < TOTAL_BLOCKS; i++)
		blockImages[i] = new Image();
	// 4, 7, 10, 12, 0
	//blockImages[0] = blockImagesDef[4];
	//blockImages[1] = blockImagesDef[7];
	//blockImages[2] = blockImagesDef[10];
	//blockImages[3] = blockImagesDef[12];
	//blockImages[4] = blockImagesDef[0];
	
    blocks = new Array();
    for (var i = 0; i < TOTAL_ROWS; i++)
        blocks[i] = new Array();
    for (var row = 0; row < TOTAL_ROWS; row++)
    {
        for (var col = 0; col < TOTAL_COLS; col++)
            blocks[row][col] = new Sprite(0, 0, false, -1);
    }
    
    spinSpeed = new Array();
    for (var i = 0; i < TOTAL_COLS; i++)
        spinSpeed[i] = 0;
    
    loadGameValues();
	
	if (intervalId != -1) // This means an interval has been set
		clearInterval(intervalId);
		
	intervalId = setInterval(mainLoop, 1000 / FPS);
} // end loadGame

function mainLoop()
{
	context2D.clearRect(0, 0, canvas.width, canvas.height); // Erase
	if (!isThemeChange)
	{
		if (!isGameOver)
		{
			// Update stuff
			if ((isLinesPlayedSelected == false || isBetSelected == false) && isSpinning == false)
			{
				for (var i = 0; i < lineButtons.length; i++)
				{
					lineButtons[i].update(mouseX, mouseY, mpressed, prev_mpressed);
					if (lineButtons[i].isPressed == true)
					{
						selectLineButton(i);
					}
				}
        
				for (var i = 0; i < betButtons.length; i++)
				{
					betButtons[i].update(mouseX, mouseY, mpressed, prev_mpressed);
					if (betButtons[i].isPressed == true)
					{
						selectBetButton(i);
					}
				}
			}
			if (isLinesPlayedSelected == true && isBetSelected == true && isSpinning == false) // If ready to spin
			{
				resetWinningLines();
				linesPlayed = 0;
				lineBet = 0;
				totalWonInRound = 0;
				totalBet = linesPlayed*lineBet;
				winAmount = 0;
				originalWonInRound = 0;
				linesWon = 0;
				linesWonAr = null;
				linesWonAr = new Array();
				for (var i = 0; i < lineButtons.length; i++)
				{
					lineButtons[i].update(mouseX, mouseY, mpressed, prev_mpressed);
					if (lineButtons[i].isPressed == true)
					{
						playLines(i);
					}
				}
        
				for (var i = 0; i < betButtons.length; i++)
				{
					betButtons[i].update(mouseX, mouseY, mpressed, prev_mpressed);
					if (betButtons[i].isPressed == true)
					{
						placePerLineBet(i);
					}
				}
				if (remainingCredits >= totalBet)
				{
					spin();
					remainingCredits -= totalBet;
					if (remainingCredits == 0)
						isLastSpin = true;
				}
				else
				{
					for (var k = 0; k < lineButtons.length; k++)
						lineButtons[k].isPressed = false;
					for (var k = 0; k < betButtons.length; k++)
						betButtons[k].isPressed = false;
					isLinesPlayedSelected = false;
					isBetSelected = false;
					linesPlayed = 0;
					lineBet = 0;
					totalBet = linesPlayed*lineBet;	
					insufficientFundsFl = true;
				}
			} // end is ready to spin
        
			updateBlocks();
			button_change_theme.update(mouseX, mouseY, mpressed, prev_mpressed);
			if (button_change_theme.isPressed)
			{
				isThemeChange = true;
				button_change_theme.isPressed = false;
				button_change_theme.currentState = 1;
			}
		} // end is not game over yet
		else // is game over
		{
			// update game over, probably just a button that reloads the page
			playAgainButton.update(mouseX, mouseY, mpressed, prev_mpressed);
			if (playAgainButton.isPressed)
			{
				location.reload();
				playAgainButton.isPressed = false;
			}
		}
	} // end isThemeChange is false
	//if (isThemeChange)
	else // isThemeChange is true
	{
		button_next_theme.update(mouseX, mouseY, mpressed, prev_mpressed);
		if(button_next_theme.isPressed)
		{
			
			currentTheme = (currentTheme+1) % 3
			button_next_theme.isPressed = false;
			button_next_theme.currentState = 1; // UP
		}
		button_close.update(mouseX, mouseY, mpressed, prev_mpressed);
		if (button_close.isPressed)
		{
			// 4, 7, 10, 12, 0
			// cotton candy, hotdog, pizza, popcorn, beercan
			if (currentTheme == THEME_CONCESSION_STAND)
			{
				// Concession Stand
				blockImages[0] = blockImagesDef[4]; // cotton candy
				blockImages[1] = blockImagesDef[7]; // hotdog
				blockImages[2] = blockImagesDef[12]; // popcorn
				blockImages[3] = blockImagesDef[10]; // pizza
				blockImages[4] = blockImagesDef[0]; // beercan
				winningItemColors[BLOCK_1] = "F28832";
				winningItemColors[BLOCK_2] = "0BA14B";
				winningItemColors[BLOCK_3] = "00A0E5"; 
				winningItemColors[BLOCK_4] = "9768AC"; 
				winningItemColors[BLOCK_5] = "E61A2D";
			}
			else if (currentTheme == THEME_GROCERY_STORE)
			{
				// 14, 9, 5, 11, 6
				blockImages[0] = blockImagesDef[14]; // watermelon
				blockImages[1] = blockImagesDef[8]; // milk
				blockImages[2] = blockImagesDef[5]; // egg
				blockImages[3] = blockImagesDef[11]; // pop
				blockImages[4] = blockImagesDef[6]; // groceries
				winningItemColors[BLOCK_1] = "FCEB86"
				winningItemColors[BLOCK_2] = "0FA34B";
				winningItemColors[BLOCK_3] = "B388E0";
				winningItemColors[BLOCK_4] = "D22233";
				winningItemColors[BLOCK_5] = "FF54B7";
			}
			// bread, cookie, rumroll, pie, cake
			// 1, 3, 13, 9, 2
			else if (currentTheme == THEME_BAKERY)
			{
				blockImages[0] = blockImagesDef[1]; // bread
				blockImages[1] = blockImagesDef[3]; // cookie
				blockImages[2] = blockImagesDef[13]; // rumroll
				blockImages[3] = blockImagesDef[9]; // pie
				blockImages[4] = blockImagesDef[2]; // cake
				winningItemColors[BLOCK_1] = "92278F"
				winningItemColors[BLOCK_2] = "2C3E97";
				winningItemColors[BLOCK_3] = "D22233";
				winningItemColors[BLOCK_4] = "0089C8";
				winningItemColors[BLOCK_5] = "F9A874";
			}
		
			isThemeChange = false;
			button_close.isPressed = false;
			button_close.currentState = 1; // UP
		} // end is button_close pressed
	} // end isChangeTheme true
    // Draw Body Chrome
    context2D.drawImage(bodySectionImage, 0, titleSectionImage.height);
    drawBlocks();
    // Draw Button Chrome
    context2D.drawImage(buttonSectionImage, 0, titleSectionImage.height+bodySectionImage.height);
	if (linesWon > 0 && areBlocksDoneSpinning())
		drawWinningBorders();
     // Draw items here
    for (var i = 0; i < lineButtons.length; i++)
    {
		if (lineButtons[i].isPressed == true)
            context2D.drawImage(lineButtonPressedImages[i], lineButtons[i].x, lineButtons[i].y, lineButtons[i].width, lineButtons[i].height);
        else
			lineButtons[i].draw(context2D);
    }
        
    for (var i = 0; i < betButtons.length; i++)
    {
        if (betButtons[i].isPressed == true)
            context2D.drawImage(betButtonPressedImages[i], betButtons[i].x, betButtons[i].y, betButtons[i].width, betButtons[i].height);
        else
            betButtons[i].draw(context2D);
    }
	context2D.lineWidth = 4;
	context2D.strokeStyle = "808080";
	context2D.beginPath();
	context2D.moveTo(0, 506);
	context2D.lineTo(0, 506);
	context2D.lineTo(476, 506);
	context2D.closePath();
	context2D.stroke();
	context2D.beginPath();
	context2D.moveTo(473, 506);
	context2D.lineTo(473, 506);
	context2D.lineTo(473, 600);
	context2D.closePath();
	context2D.stroke();
    // Draw Title Chrome
    context2D.drawImage(titleSectionImage, 0, 0);
    // Draw betting area
    context2D.drawImage(bettingAreaBackgroundImage, 475, 504, 335, 96);
    drawBettingArea();
	button_change_theme.draw(context2D);
	if (isThemeChange == false)
	{
		var curTheme;
		if (currentTheme == THEME_CONCESSION_STAND)
			curTheme = "Concession Stand";
		else if(currentTheme == THEME_GROCERY_STORE)
			curTheme = "Grocery Store";
		else if (currentTheme == THEME_BAKERY)
			curTheme = "Bakery";
		utilities.drawCanvasText(context2D, "Current Theme: "+curTheme, ((canvas.width/2)-200)+10, 30, "yellow", "14px Courier new");
	}
	if (isThemeChange)
	{
		drawChangeTheme();
		button_next_theme.draw(context2D);
		button_close.draw(context2D);
	}
//drawBlocks();
	if (isGameOver)
	{
		context2D.save();
		context2D.fillStyle = "rgba(0, 0, 0, 0.7)";
		context2D.fillRect(0, 0, 800, 600);
		context2D.restore();
		utilities.drawCanvasText(context2D, "Thanks For Playing!", 280, 250, "White", "34px Arial");
		playAgainButton.draw(context2D);
	}
} // end main loop

function selectLineButton(index)
{
    for (var i = 0; i < lineButtons.length; i++)
        lineButtons[i].isPressed = false;
    
    if (betButtons[BET_MAX_INDEX].isPressed == true) // max bet is pressed, so unselect it when choosing a line button
    {
        betButtons[BET_MAX_INDEX].isPressed = false;
        lineBet = 0;
        linesPlayed = 0;
    }

    lineButtons[index].isPressed = true;
    isLinesPlayedSelected = true;
} // end selectLineButton

function selectBetButton(index)
{
    if (betButtons[BET_MAX_INDEX].isPressed == true) // max bet is pressed, so unselect it when choosing a bet button
    {
        betButtons[BET_MAX_INDEX].isPressed = false;
        lineBet = 0;
        linesPlayed = 0;
    }
    for (var i = 0 ; i < betButtons.length; i++)
        betButtons[i].isPressed = false;
    
    if (index == BET_MAX_INDEX) // max bet index so unselect any line buttons
    {
        isLinesPlayedSelected = true;
        for (var i = 0; i < lineButtons.length; i++)
            lineButtons[i].isPressed = false;
    }
    betButtons[index].isPressed = true;
    isBetSelected = true;
} // end selectBetButton

function playLines(index)
{
    if (index == LINE_BET_1_INDEX)
        linesPlayed = 1;
    else if (index == LINE_BET_5_INDEX)
        linesPlayed = 5;
    else if (index == LINE_BET_10_INDEX)
        linesPlayed = 10;
    else if (index == LINE_BET_20_INDEX)
        linesPlayed = 20;
    
    totalBet = linesPlayed*lineBet;
} // end playLines

function placePerLineBet(index)
{
    if (index == BET_1_INDEX)
        lineBet = 1;
    else if (index == BET_5_INDEX)
        lineBet = 5;
    else if (index == BET_10_INDEX)
        lineBet = 10;
    else if (index == BET_15_INDEX)
        lineBet = 15;
    else if (index == BET_25_INDEX)
        lineBet = 25;
    else if (index == BET_MAX_INDEX)
    {
        linesPlayed = 20;
        lineBet = 25;
    }
    totalBet = linesPlayed*lineBet;
} // end placePerLineBet

// Returns a dollar amount as a string with , separators
function amountToString(amount)
{
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function drawBettingArea()
{
	utilities.drawCanvasText(context2D, "Credits: "+remainingCredits, 480, 525, "yellow", "14px Courier new");
    utilities.drawCanvasText(context2D, "Bet: "+totalBet, 650, 525, "yellow", "14px Courier new");
	if (winAmount > 0)
		utilities.drawCanvasText(context2D, "Win: "+winAmount, 480, 575, "yellow", "14px Courier new");
	else
		utilities.drawCanvasText(context2D, "Win: "+originalWonInRound, 480, 575, "yellow", "14px Courier new");
    utilities.drawCanvasText(context2D, "Line Bet: "+lineBet, 650, 575, "yellow", "14px Courier new");
	if (insufficientFundsFl)
	{
		utilities.drawCanvasText(context2D, "Insufficient Credits!", 500, 550, "red", "18px Courier new");
		if (insufficientFundsCounter > insufficientFundsDelay)
		{
			insufficientFundsCounter = 0;
			insufficientFundsFl = false;
		}
		else
			insufficientFundsCounter++;
	}
} // end drawBettingArea

// Update the blocks during spin, increase speed, detect when a column is done spinning, detect when all columns are done spinning
// and do winning and reset everything for next round.
function updateBlocks()
{
    for (var c = 0; c < TOTAL_COLS; c++)
    {
        if (spinCounter[c] > spinDuration[c])
        {
            if (!isColStopped(c))
            {
                stoppedCols.push(c);
				// Reset blocks to the correct row height
                blocks[2][c].posY = ROW_1_Y;
                blocks[3][c].posY = ROW_2_Y;
                blocks[0][c].posY = ROW_3_Y;
                for (var r = 0; r < TOTAL_ROWS; r++)
                {
                    blocks[r][c].velY = 0;
                }
            }
            if (stoppedCols.length == TOTAL_COLS)
            {
			// cotton candy, hotdog, pizza, popcorn, beercan
			//	blocks[2][0].id = BLOCK_5;
	        //    blocks[2][1].id = BLOCK_5;
	        //    blocks[2][2].id = BLOCK_5;
	        //    blocks[2][3].id = BLOCK_5;
                if (isSpinning == true)
                {
				    if (foundWinnings == false)
						findWinningLines();
					if (winAmount > 0)
					{
						addWinnings();
					}
					else
					{
						for (var k = 0; k < lineButtons.length; k++)
							lineButtons[k].isPressed = false;
						for (var k = 0; k < betButtons.length; k++)
							betButtons[k].isPressed = false;
						for(var k = 0; k < lineButtons.length; k++)
							lineButtons[k].isActive = true;
						for(var k = 0; k < betButtons.length; k++)
							betButtons[k].isActive = true;    
                    
						isLinesPlayedSelected = false;
						isBetSelected = false;
						isSpinning = false;
						countingRateThreshold = COUNT_THRESHOLD_START;
						countingRate = 1;
						prev_mpressed = false;
						resetSpinCounter();
						stoppedCols = null;
						stoppedCols = new Array();
						foundWinnings = false;
						if (isLastSpin)
						{
							if (originalWonInRound > 0)
								isLastSpin = false;
							else
								isGameOver = true;
						}
					}
                    return;
                } // end isSpinning is true
            } // end all cols are stopped
            else // all cols not stopped
            {
                // Find a column to increase speed
                var rand = utilities.randomFromTo(0, TOTAL_COLS-1);
                while (isColStopped(rand))
                {
                    rand = utilities.randomFromTo(0, TOTAL_COLS-1);
                }
                for (var r = 0; r < TOTAL_ROWS; r++)
                {
                    blocks[r][rand].velY *= 2;
                    if (blocks[r][rand].velY > 50)
                        blocks[r][rand].velY = 50;
                }
            } // end else
            
        } // end stop the current column
        else
        {
            for (var r = 0; r < TOTAL_ROWS; r++)
            {
                blocks[r][c].posY += blocks[r][c].velY;
                if (blocks[r][c].posY > 504) // bottom edge
                {
                    blocks[r][c].id = utilities.randomFromTo(0, TOTAL_BLOCKS-1);
                    blocks[r][c].posY = STARTING_Y;
                    if (r == 1) // its the first row so increment it
                        spinCounter[c]++;
                }
            }
        if (spinCounter[c] > 5)
        {
            for (var r = 0; r < TOTAL_ROWS; r++)
            {
                blocks[r][c].velY += 10;
                if (blocks[r][c].velY > 50)
                    blocks[r][c].velY = 50;
            }
        }
        }
    } // end loop through columns
} // end updateBlocks

// Return true if the col passed in is done spinning, false otherwise.
function isColStopped(col)
{
    for (var i = 0; i < stoppedCols.length; i++)
    {
        if (stoppedCols[i] == col)
            return true;
    }
    return false;
} // end isColStopped

// Return true if all blocks are done spinning, false otherwise
function areBlocksDoneSpinning()
{
    for (var i = 0; i < TOTAL_ROWS; i++)
    {
        for (var j = 0; j < TOTAL_COLS; j++)
        {
            if (blocks[i][j].velY > 0)
                return false;
        }
    }
    return true;
} // end areBlocksDoneSpinning

// Reset the spin counter and duration for each column
function resetSpinCounter()
{
    for (var i = 0; i < TOTAL_COLS; i++)
    {
        spinDuration[i] = 0;
        spinCounter[i] = 0;
    }
} // end resetSpinCounter

// Draw the blocks
function drawBlocks()
{
    for (var i = 0; i < TOTAL_ROWS; i++)
    {
        for (var j = 0; j < TOTAL_COLS; j++)
        {
            context2D.drawImage(blockImages[blocks[i][j].id], blocks[i][j].posX, blocks[i][j].posY);
        }
    }
} // end drawBlocks

// Set the speed and duration of each column to spin.
// Deactivate the buttons so they can't be pressed during a round.
function spin()
{
    isSpinning = true;
    var colSpeed = new Array();
	
    for (var i = 0; i < TOTAL_COLS; i++)
    {
       if (i == 0)
            colSpeed[i] = utilities.randomFromTo(15, 30);
        else
            colSpeed[i] = utilities.randomFromTo(spinSpeed[i-1]+5, 30);
    }
       
    for (var i = 0; i < TOTAL_COLS; i++)
    {
        if (i == 0)
            spinDuration[i] = utilities.randomFromTo(3, 10);
        else       
            spinDuration[i] = utilities.randomFromTo(spinDuration[i-1]+1, 15);
    }

    for (var row = 0; row < TOTAL_ROWS; row++)
    {
        for (var col = 0; col < TOTAL_COLS; col++)
        {
            blocks[row][col].velY = colSpeed[col];
        }
    }
   
    for(var i = 0; i < lineButtons.length; i++)
        lineButtons[i].isActive = false;
    for(var i = 0; i < betButtons.length; i++)
        betButtons[i].isActive = false;
} // end spin

// Loop through winning line combos and determine any winning lines.
// When a winning line is found, set its win number and add the winnings to the overall win amount for the round.
function findWinningLines()
{
    var winningBlockId = -1;
    var winningBlockCounter = 0;
	var winsFound = false;
	// Loop through winning lines
	for (var i = 0; i < linesPlayed; i++)
	{
		winningBlockId = -1;
	    winningBlockCounter = 0;
	    for (var j = 0; j < winningLines[i].length-1; j++)
	    {
			if (winningBlockId == -1) // Winning block hasn't been set yet.
			{
				winningBlockId = blocks[winningLines[i][j][0]][winningLines[i][j][1]].id;
				winningBlockCounter++;
			}
			else
			{
				if (winningBlockId == blocks[winningLines[i][j][0]][winningLines[i][j][1]].id)
				{
					winningBlockCounter++;
				}
				else
				{
					break;
				}
			}	
		} // end loop through 1 winning block
		if (winningBlockCounter >= 3) // win!
		{
			var remainderOver = winningBlockCounter-3+1;
			winAmount = winAmount + ((lineCredits[i]*(blockCredits[winningBlockId]*winningBlockCounter))*lineBet*remainderOver);
			originalWonInRound = winAmount;
			linesWon++;
			linesWonAr.push(i);	
	    
			// set winning line's last values from -1 to 1 to show that line won
			winningLines[i][winningLines[i].length-1][0] = winningBlockCounter;
			winsFound = true;
		}
	} // end loop through winning lines
	if (winsFound)
	{
		//if(this.g.isSoundOn)
	//	{
	//		this.g.SfxSlotPayout.loop(Constants.SLOT_PAYOUT_VOLUMN);	    	
		//}
	    isWinCounting = true;
	}
	foundWinnings = true;
} // end findWinningLines

// When a line is determined to be won, the last index in the line is set to how many blocks were won.
// This function resets that for the next round.
function resetWinningLines()
{
    for (var i = 0; i < linesPlayed; i++)
    {
        winningLines[i][winningLines[i].length-1][0] = -1;
    }
}

// Define the winning lines combinations
function defineWinningLines()
{
    winningLines = new Array(20);
    for (var i = 0; i < winningLines.length; i++)
        winningLines[i] = new Array();
    
   winningLines[1] = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [-1, -1]];
   winningLines[0] = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [-1, -1]];
   winningLines[2] = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [-1, -1]];
   winningLines[3] = [[2, 0], [3, 1], [2, 2], [2, 3], [2, 4], [-1, -1]];
   winningLines[4] = [[3, 0], [2, 1], [3, 2], [0, 3], [0, 4], [-1, -1]];
   winningLines[5] = [[2, 0], [2, 1], [3, 2], [3, 3], [3, 4], [-1, -1]];
   winningLines[6] = [[0, 0], [0, 1], [3, 2], [0, 3], [0, 4], [-1, -1]];
   winningLines[7] = [[2, 0], [3, 1], [0, 2], [3, 3], [2, 4], [-1, -1]];
   winningLines[8] = [[3, 0], [0, 0], [3, 1], [3, 2], [2, 3], [3, 4], [-1, -1]]; 
   winningLines[9] = [[2, 0], [3, 0], [3, 1], [3, 2], [0, 3], [0, 4], [-1, -1]];
   winningLines[10] = [[3, 0], [0, 1], [0, 2], [3, 3], [2, 4], [-1, -1]];
   winningLines[11] = [[0, 0], [3, 1], [0, 2], [3, 3], [0, 4], [-1, -1]];
   winningLines[12] = [[3, 0], [2, 1], [3, 1], [0, 2], [0, 3], [3, 4], [-1, -1]];
   winningLines[13] = [[2, 0], [3, 1], [3, 2], [3, 3], [2, 4], [-1, -1]];
   winningLines[14] = [[0, 0], [3, 1], [3, 2], [3, 3], [0, 4], [-1, -1]];
   winningLines[15] = [[0, 0], [0, 1], [3, 1], [3, 2], [3, 3], [3, 4], [-1, -1]];
   winningLines[16] = [[3, 0], [0, 1], [3, 2], [2, 3], [3, 4], [-1, -1]];
   winningLines[17] = [[0, 0], [3, 1], [2, 1], [2, 2], [3, 3], [2, 4], [-1, -1]];
   winningLines[18] = [[3, 0], [2, 1], [2, 2], [3, 3], [3, 4], [-1, -1]];
   winningLines[19] = [[3, 0], [2, 0], [2, 1], [3, 2], [3, 3], [0, 4], [-1, -1]];
   
   linesWonAr = new Array();
   
   // Define line credits
   lineCredits = new Array();
   lineCredits[0] = 5;
   lineCredits[1] = 5;
   lineCredits[2] = 4;
   lineCredits[3] = 2;
   lineCredits[4] = 15;
   lineCredits[5] = 5;
   lineCredits[6] = 6;
   lineCredits[7] = 5;
   lineCredits[8] = 10;
   lineCredits[9] = 15;
   lineCredits[10] = 5;
   lineCredits[11] = 6;
   lineCredits[12] = 8;
   lineCredits[13] = 5;
   lineCredits[14] = 5;
   lineCredits[15] = 10;
   lineCredits[16] = 5;
   lineCredits[17] = 5;
   lineCredits[18] = 15;
   lineCredits[19] = 500;
} // end defineWinningLines

function addWinnings()
{
	if (totalWonInRound > countingRateThreshold)
	{
		countingRate*=2;
		countingRateThreshold += COUNT_THRESHOLD_START;
	}
	if (countingRate > MAX_COUNTING_RATE)
		countingRate = MAX_COUNTING_RATE;
	if (winAmount >= countingRate)
	{
		remainingCredits+=countingRate;
		winAmount-=countingRate;
		totalWonInRound+=countingRate;	
	}
	else
	{
		remainingCredits+=winAmount;
		winAmount-=winAmount;
		totalWonInRound+=winAmount;
	}
} // end addWinnings

/*
	function drawWinningBorders()
	{
	    var i = linesWonAr.get(highlightedLine%linesWon);
		// Draw rectangle borders around each winning block
		for (var j = 0; j < winningLines[i][winningLines[i].length-1][0]; j++)
		{
			Gdx.gl.glEnable(GL10.GL_BLEND);
			Gdx.gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
			Gdx.gl.glLineWidth(this.g.convertToActualX(8));
			this.shapeRenderer.begin(ShapeType.Rectangle);
			if (blocks[winningLines[i][j][0]][winningLines[i][j][1]].isRotating)
			{
				blocks[winningLines[i][j][0]][winningLines[i][j][1]].isRotating = false;
				blocks[winningLines[i][j][0]][winningLines[i][j][1]].resetRotation();
			}
			this.shapeRenderer.setColor(winningItemColors[blocks[winningLines[i][j][0]][winningLines[i][j][1]].id]);
		//	this.shapeRenderer.identity();
	//		this.shapeRenderer.translate(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX, blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY, 0);
	//		this.shapeRenderer.rotate(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX, blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX, 0, blocks[winningLines[i][j][0]][winningLines[i][j][1]].rotation);
			//this.shapeRenderer.line(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX, blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY, blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX*blocks[winningLines[i][j][0]][winningLines[i][j][1]].rotation)+this.g.convertToActualX(VIRT_BLOCK_SIZE), blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY*blocks[winningLines[i][j][0]][winningLines[i][j][1]].rotation));
			
			this.shapeRenderer.rect(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX, blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY, (float)g.convertToActualX(VIRT_BLOCK_SIZE), (float)g.convertToActualY(VIRT_BLOCK_SIZE));
		//	this.shapeRenderer.rect(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX, blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY, (float)g.convertToActualX(VIRT_BLOCK_SIZE), (float)g.convertToActualY(VIRT_BLOCK_SIZE), (float)this.g.convertToActualX(VIRT_BLOCK_SIZE)/2, (float)this.g.convertToActualY(VIRT_BLOCK_SIZE)/2, blocks[winningLines[i][j][0]][winningLines[i][j][1]].rotation);
			this.shapeRenderer.end();
			Gdx.gl.glDisable(GL10.GL_BLEND);
		} // loop through all spots in the line
		// Draw lines connecting the winning blocks
		//for (int j = 0; j < winningLines[i].length-1; j++)
		for (int j = 0; j < winningLines[i][winningLines[i].length-1][0]-1; j++)
		{
			if (j < winningLines[i].length-2) // skip the last one. which is -2 because the last 1 in the array is used to number of blocks won, so 2nd to last is last block in the line
			{
			    if (j == 0) // first 1
				{
					// draw line connecting current winning block to next winning block
			    	Gdx.gl.glEnable(GL10.GL_BLEND);
			    	Gdx.gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
			    	Gdx.gl.glLineWidth(this.g.convertToActualX(8));
			    	this.shapeRenderer.begin(ShapeType.Line);
			    	this.shapeRenderer.setColor(new Color(1.0f, 0.039f, 0.18f, 1.0f));
			    	this.shapeRenderer.line(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX,blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2),
			    			blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+(this.g.convertToActualX(VIRT_BLOCK_SIZE)/2),blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2));
			    	this.shapeRenderer.end();
			    	Gdx.gl.glDisable(GL10.GL_BLEND);
				}
				else if (j == winningLines[i].length-3) // last 1
				{
					// draw line connecting current winning block to next winning block
					Gdx.gl.glEnable(GL10.GL_BLEND);
			    	Gdx.gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
			    	Gdx.gl.glLineWidth(this.g.convertToActualX(8));
			    	this.shapeRenderer.begin(ShapeType.Line);
			    	this.shapeRenderer.setColor(new Color(1.0f, 0.039f, 0.18f, 1.0f));
			    	this.shapeRenderer.line(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(this.g.convertToActualX(VIRT_BLOCK_SIZE)/2),blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2),
			    			blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+this.g.convertToActualX(VIRT_BLOCK_SIZE),blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2));
			    	this.shapeRenderer.end();
			    	Gdx.gl.glDisable(GL10.GL_BLEND);
				}
				else
				{
					Gdx.gl.glEnable(GL10.GL_BLEND);
			    	Gdx.gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
			    	Gdx.gl.glLineWidth(this.g.convertToActualX(8));
			    	this.shapeRenderer.begin(ShapeType.Line);
			    	this.shapeRenderer.setColor(new Color(1.0f, 0.039f, 0.18f, 1.0f));
			    	this.shapeRenderer.line(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(this.g.convertToActualX(VIRT_BLOCK_SIZE)/2),blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2),
			    			blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+(this.g.convertToActualX(VIRT_BLOCK_SIZE)/2),blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2));
			    	this.shapeRenderer.end();
			    	Gdx.gl.glDisable(GL10.GL_BLEND);
				}
			}
		}
		if (!this.isPaused)
		{
			if (highlightCounter > highlightDelay)
			{
				highlightCounter = 0;
				highlightedLine++;
			}
			else
				highlightCounter += Gdx.graphics.getDeltaTime();
		}
	} // end drawWinningBorders
*/
function drawWinningBorders()
{
    var i = linesWonAr[highlightedLine%linesWon];
	// Draw rectangle borders around each winning block
	for (var j = 0; j < winningLines[i][winningLines[i].length-1][0]; j++)
	{
		context2D.lineWidth=8;
		context2D.strokeStyle = winningItemColors[blocks[winningLines[i][j][0]][winningLines[i][j][1]].id];
		//this.shapeRenderer.rect(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX, blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY, (float)g.convertToActualX(VIRT_BLOCK_SIZE), (float)g.convertToActualY(VIRT_BLOCK_SIZE));
		context2D.strokeRect(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX, blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY,72,72);
	} // loop through all spots in the line
	// Draw lines connecting the winning blocks
	//for (var j = 0; j < winningLines[i].length-1; j++)
	for (var j = 0; j < winningLines[i][winningLines[i].length-1][0]-1; j++)
	{
		if (j < winningLines[i].length-2) // skip the last one. which is -2 because the last 1 in the array is used to number of blocks won, so 2nd to last is last block in the line
		{
		    if (j == 0) // first 1
			{
			//this.shapeRenderer.setColor(new Color(1.0f, 0.039f, 0.18f, 1.0f));
			//    	this.shapeRenderer.line(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX,blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2),
			//    			blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+(this.g.convertToActualX(VIRT_BLOCK_SIZE)/2),blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2));
			
				// draw line connecting current winning block to next winning block
				context2D.strokeStyle = "FF0A2E";
				context2D.beginPath();
				context2D.moveTo(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX,blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(72/2));
				context2D.lineTo(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX,blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(72/2));
				context2D.lineTo(blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+(72/2),blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(72/2));
				context2D.closePath();
				context2D.stroke();
			}
			else if (j == winningLines[i].length-3) // last 1
			{
			//this.shapeRenderer.setColor(new Color(1.0f, 0.039f, 0.18f, 1.0f));
			//    	this.shapeRenderer.line(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(this.g.convertToActualX(VIRT_BLOCK_SIZE)/2),blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2),
			//    			blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+this.g.convertToActualX(VIRT_BLOCK_SIZE),blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2));
			    	
				// draw line connecting current winning block to next winning block
				context2D.strokeStyle = "FF0A2E";
				context2D.beginPath();
				context2D.moveTo(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(72/2),blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(72/2));
				context2D.lineTo(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(72/2),blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(72/2));
				context2D.lineTo(blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+72,blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(72/2));
				context2D.closePath();
				context2D.stroke();
			}
			else
			{
			//this.shapeRenderer.begin(ShapeType.Line);
			//    	this.shapeRenderer.setColor(new Color(1.0f, 0.039f, 0.18f, 1.0f));
			 //   	this.shapeRenderer.line(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(this.g.convertToActualX(VIRT_BLOCK_SIZE)/2),blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2),
			  //  			blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+(this.g.convertToActualX(VIRT_BLOCK_SIZE)/2),blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(this.g.convertToActualY(VIRT_BLOCK_SIZE)/2));
			    	
				// draw line connecting current winning block to next winning block
				context2D.strokeStyle = "FF0A2E";
				context2D.beginPath();
				context2D.moveTo(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(72/2),blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(72/2));
				context2D.lineTo(blocks[winningLines[i][j][0]][winningLines[i][j][1]].posX+(72/2),blocks[winningLines[i][j][0]][winningLines[i][j][1]].posY+(72/2));
				context2D.lineTo(blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posX+(72/2),blocks[winningLines[i][j+1][0]][winningLines[i][j+1][1]].posY+(72/2));
				context2D.closePath();
				context2D.stroke();
			}
		}
	}
	if (highlightCounter > highlightDelay)
	{
		highlightCounter = 0;
		highlightedLine++;
	}
	else
		highlightCounter++;
} // end drawWinningBorders

// Load game values.  This is called when the game loads
function loadGameValues()
{
	currentTheme = THEME_BAKERY;
    for (var row = 0; row < TOTAL_ROWS; row++)
    {
        for (var col = 0; col < TOTAL_COLS; col++)
        {
            blocks[row][col].posX = STARTING_X+(col*(72+COL_BUFFER));
            blocks[row][col].posY = STARTING_Y+(row*(72+ROW_BUFFER));
            blocks[row][col].id = utilities.randomFromTo(0, TOTAL_BLOCKS-1);
			blocks[row][col].row = row;
        }
    }
    
    remainingCredits = STARTING_CREDITS;
    winAmount = 0;
	originalWonInRound = winAmount;
    totalBet = 0;
    lineBet = 0;
    linesPlayed = 0;
    isLinesPlayedSelected = false;
    isBetSelected = false;
    isSpinning = false;
	foundWinnings = false;
	totalWonInRound = 0;
	countingRateThreshold = COUNT_THRESHOLD_START;
	countingRate = 1;
    
    spinDuration = new Array();
    spinCounter = new Array();
    for (var i = 0; i < TOTAL_COLS; i++)
    {
        spinDuration[i] = utilities.randomFromTo(1, 10);
        spinCounter[i] = 0;
    }
    stoppedCols = new Array();
    
    defineWinningLines();
	
	winningItemColors = new Array();
	//winningItemColors[BLOCK_1] = new Color(0.949f, 0.533f, 0.196f, 1.0f);
	//winningItemColors[BLOCK_2] = new Color(0.0f, 0.627f, 0.898f, 1.0f);
	//winningItemColors[BLOCK_3] = new Color(0.043f, 0.631f, 0.294f, 1.0f);
//	winningItemColors[BLOCK_4] = new Color(0.592f, 0.408f, 0.675f, 1.0f);
//	winningItemColors[BLOCK_5] = new Color(0.902f, 0.102f, 0.176f, 1.0f);
//	winningItemColors[BLOCK_1] = "5B9BFF";
	//winningItemColors[BLOCK_2] = "919191";
	//winningItemColors[BLOCK_3] = "B356FF";
	//winningItemColors[BLOCK_4] = "FFA72A";
	//winningItemColors[BLOCK_5] = "26D500";

	// 4, 7, 10, 12, 0
	// cotton candy, hotdog, pizza, popcorn, beercan
	if (currentTheme == THEME_CONCESSION_STAND)
	{
		// Concession Stand
		blockImages[0] = blockImagesDef[4]; // cotton candy
		blockImages[1] = blockImagesDef[7]; // hotdog
		blockImages[2] = blockImagesDef[12]; // popcorn
		blockImages[3] = blockImagesDef[10]; // pizza
		blockImages[4] = blockImagesDef[0]; // beercan
		winningItemColors[BLOCK_1] = "F28832";
		winningItemColors[BLOCK_2] = "0BA14B";
		winningItemColors[BLOCK_3] = "00A0E5"; 
		winningItemColors[BLOCK_4] = "9768AC"; 
		winningItemColors[BLOCK_5] = "E61A2D";
	}
	else if (currentTheme == THEME_GROCERY_STORE)
	{
	// 14, 9, 5, 11, 6
		blockImages[0] = blockImagesDef[14]; // watermelon
		blockImages[1] = blockImagesDef[8]; // milk
		blockImages[2] = blockImagesDef[5]; // egg
		blockImages[3] = blockImagesDef[11]; // pop
		blockImages[4] = blockImagesDef[6]; // groceries
		winningItemColors[BLOCK_1] = "FCEB86"
		winningItemColors[BLOCK_2] = "0FA34B";
		winningItemColors[BLOCK_3] = "B388E0";
		winningItemColors[BLOCK_4] = "D22233";
		winningItemColors[BLOCK_5] = "FF54B7";
		//winningItemColors[BLOCK_1] = new Color(0.988f, 0.922f, 0.525f, 1.0f);
		//winningItemColors[BLOCK_2] = new Color(0.702f, 0.533f, 0.878f, 1.0f);
		//winningItemColors[BLOCK_3] = new Color(0.059f, 0.639f, 0.294f, 1.0f);
		//winningItemColors[BLOCK_4] = new Color(0.824f, 0.133f, 0.2f, 1.0f);
		//winningItemColors[BLOCK_5] = new Color(1.0f, 0.329f, 0.718f, 1.0f);
	}
	// bread, cookie, rumroll, pie, cake
	// 1, 3, 13, 9, 2
	else if (currentTheme == THEME_BAKERY)
	{
		blockImages[0] = blockImagesDef[1]; // bread
		blockImages[1] = blockImagesDef[3]; // cookie
		blockImages[2] = blockImagesDef[13]; // rumroll
		blockImages[3] = blockImagesDef[9]; // pie
		blockImages[4] = blockImagesDef[2]; // cake
		winningItemColors[BLOCK_1] = "92278F"
		winningItemColors[BLOCK_2] = "2C3E97";
		winningItemColors[BLOCK_3] = "D22233";
		winningItemColors[BLOCK_4] = "0089C8";
		winningItemColors[BLOCK_5] = "F9A874";
		
		//winningItemColors[BLOCK_1] = new Color(0.573f, 0.153f, 0.561f, 1.0f);
		//winningItemColors[BLOCK_2] = new Color(0.173f, 0.243f, 0.592f, 1.0f);
		//winningItemColors[BLOCK_3] = new Color(0.824f, 0.133f, 0.2f, 1.0f);
		//winningItemColors[BLOCK_4] = new Color(0.0f, 0.537f, 0.784f, 1.0f);
		//winningItemColors[BLOCK_5] = new Color(0.976f, 0.659f, 0.455f, 1.0f);
	}
	
	highlightCounter = 0;
	highlightDelay = 30;
	highlightedLine = 0;
	linesWon = 0;
	
	insufficientFundsFl = false;
	insufficientFundsCounter = 0;
	insufficientFundsDelay = 30;
	
	isGameOver = false;
	isLastSpin = false;
} // end loadGameValues

function drawChangeTheme()
{
	var curTheme;
	if (currentTheme == THEME_CONCESSION_STAND)
		curTheme = "Concession Stand";
	else if(currentTheme == THEME_GROCERY_STORE)
		curTheme = "Grocery Store";
	else if (currentTheme == THEME_BAKERY)
		curTheme = "Bakery";
	context2D.fillStyle="black";
	context2D.fillRect((canvas.width/2)-200,30, 400, 300);
	utilities.drawCanvasText(context2D, "Current Theme: "+curTheme, ((canvas.width/2)-200)+10, 100, "yellow", "14px Courier new");
	//drawCanvasText("Concession Stand", ((canvas.width/2)-200)+10, 150, "yellow", "14px Courier new");
	//drawCanvasText("Grocery Store", ((canvas.width/2)-200)+10, 200, "yellow", "14px Courier new");
	//drawCanvasText("Bakery", ((canvas.width/2)-200)+10, 250, "yellow", "14px Courier new");
	
} // end drawHeading
exports.title = "Food Frenzy Slot";
return exports;
}
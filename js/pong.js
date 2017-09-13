/** DJ Pong
by Michael Gibbes **/

var canvas = document.getElementById("PongBreaker");
var ctx = canvas.getContext("2d");


/** KEY HANDLING **/

var wPressed = false;
var sPressed = false;
var iPressed = false;
var kPressed = false;
var dPressed = false;
var jPressed = false;
function keyPressHandler(e) {
	"use strict";
	
	if (e.keyCode === 87) {
		wPressed = true;
	}
	else if (e.keyCode === 83) {
		sPressed = true;
	}
	else if (e.keyCode === 73) {
		iPressed = true;
	}
	else if (e.keyCode === 75) {
		kPressed = true;
	}
	else if (e.keyCode === 68) {
		dPressed = true;
	}
	else if (e.keyCode === 74) {
		jPressed = true;
	}
}
function keyReleaseHandler(e) {
	"use strict";
	
	if (e.keyCode === 87) {
		wPressed = false;
	}
	else if (e.keyCode === 83) {
		sPressed = false;
	}
	else if (e.keyCode === 73) {
		iPressed = false;
	}
	else if (e.keyCode === 75) {
		kPressed = false;
	}
	else if (e.keyCode === 68) {
		dPressed = false;
	}
	else if (e.keyCode === 74) {
		jPressed = false;
	}
}
document.addEventListener("keydown", keyPressHandler, false);
document.addEventListener("keyup", keyReleaseHandler, false);


/** VARIABLE VALUES **/

var ball1X = canvas.width * (1 / 4); 
var ball1Y = canvas.height / 2;
var ball1Fill = "#ff7630";
var dx1 = -1; 
var dy1 = 0;
var ball2X = canvas.width * (3 / 4);
var ball2Y = canvas.height / 2;
var ball2Fill = "#ff7630";
var dx2 = 1;
var dy2 = 0;
function initBall1() {
	"use strict";
	
	ball1X = canvas.width * (1 / 4); 
	ball1Y = canvas.height / 2;
	ball1Fill = "#ff7630";
	dx1 = -1; 
	dy1 = 0;
}
function initBall2() {
	"use strict";
	
	ball2X = canvas.width * (3 / 4);
	ball2Y = canvas.height / 2;
	ball2Fill = "#ff7630";
	dx2 = 1;
	dy2 = 0;
}
initBall1();
initBall2();
var ballRadius = 10;
var paddleWidth = 10;
var paddleHeight = 75;
var paddle1Y = (canvas.height - paddleHeight) / 2;
var paddle2Y = (canvas.height - paddleHeight) / 2;
var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 20;
var brickHeight = 75;
var brickPadding = 10;
var brickOffsetTop = (canvas.height / 2) - (brickHeight + brickPadding) * (brickRowCount / 2) + (brickPadding / 2);
var brickOffsetLeft = (canvas.width / 2) - (brickWidth + brickPadding) * (brickColumnCount / 2) + (brickPadding / 2);
var bricks = [];
var brickCount = 25;
function initBricks() {
	"use strict";
	
	for (var c = 0; c < brickColumnCount; c++) {
		bricks[c] = [];
		for (var r = 0; r < brickRowCount; r++) {
			bricks[c][r] = [0, 0, 1];
		}
	brickCount = 25;
}
}
initBricks();
var player1Lives = 3;
var player2Lives = 3;


/** DRAW FUNCTIONS. **/

function drawBalls() {
	"use strict";
	
	ctx.beginPath();
	ctx.arc(ball1X, ball1Y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ball1Fill;
	ctx.fill();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.arc(ball2X, ball2Y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ball2Fill;
	ctx.fill();
	ctx.closePath();
}
function drawPaddle(x, y) {
	"use strict";
	
	ctx.beginPath();
	ctx.rect(x, y, paddleWidth, paddleHeight);
	ctx.fillStyle = "#ff7630";
	ctx.fill();
	ctx.closePath();
}
/** Displays current matrix of bricks. **/
function drawBricks() {
	"use strict";
	
	for (var c = 0; c < brickColumnCount; c++) {
		for (var r = 0; r < brickRowCount; r++) {
			if (bricks[c][r][2]) {
				var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
				var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
				bricks[c][r][0] = brickX;
				bricks[c][r][1] = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#ff7630";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
/** Draws the score and hint letters. **/
function drawText() {
	"use strict";
	
	ctx.font = "16px Arial";
	ctx.fillStyle = "#ff9966";
	if (!wPressed) {
		ctx.fillText("w", 0, paddle1Y - 20);
	}
	if (!sPressed) {
		ctx.fillText("s", 0, paddle1Y + paddleHeight + 26);
	}
	if (!iPressed) {
		ctx.fillText("i", canvas.width - 8, paddle2Y - 20);
	}
	if (!kPressed) {
		ctx.fillText("k", canvas.width - 8, paddle2Y + paddleHeight + 30);
	}
	if (!dPressed) {
		ctx.fillStyle = "#ff7575";
		ctx.fillText("D", 20, paddle1Y + paddleHeight / 2 + 5);
	}
	if (!jPressed) {
		ctx.fillStyle = "#7282ff";
		ctx.fillText("J", canvas.width - 28, paddle2Y + paddleHeight / 2 + 5);
	}
	ctx.fillStyle = "#ffcc99";
	ctx.font = "75px Arial";
	ctx.fillText(brickCount, 60, 100);
	ctx.fillText(brickCount, canvas.width - 150, 100);
}
/** Handles the logic behind brick hit/progression. **/
function detectBrickCollision() {
	"use strict";
	
	for (var c = 0; c < brickColumnCount; c++) {
		for (var r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r];
			if (ball1X > b[0] && ball1X < b[0] + brickWidth && ball1Y > b[1] && ball1Y < b[1] + brickHeight && b[2]) {
				dx1 = -dx1;
				b[2] = 0;
				brickCount--;
			}
			if (ball2X > b[0] && ball2X < b[0] + brickWidth && ball2Y > b[1] && ball2Y < b[1] + brickHeight && b[2]) {
				dx2 = -dx2;
				b[2] = 0;
				brickCount--;
			}
		}
	}
}
/** Takes care of paddle hits and player depth. Also changes the color/speed of the ball if D or J is pressed. **/
function detectBallCollision() {
	"use strict";
	
	if (ball1Y + dy1 > canvas.height - ballRadius || ball1Y + dy1 < ballRadius) {
		dy1 = -dy1;
	}
	if (ball2Y + dy2 > canvas.height - ballRadius || ball2Y + dy2 < ballRadius) {
		dy2 = -dy2;
	}
	
	if (ball1X + dx1 < ballRadius) {
		if (ball1Y > paddle1Y - 10 && ball1Y < paddle1Y + paddleHeight + 10) {
			dx1 = -dx1;
			dy1 = (-(paddle1Y + paddleHeight / 2) + ball1Y) / (paddleHeight / 2);
			if (dPressed) {
				dx1 *= 1.5;
				ball1Fill = "#f44242";
			}
		}
		else {
			player1Lives--;
			reset("d_die");
		}
	}
	else if (ball2X + dx2 < ballRadius) {
		if (ball2Y > paddle1Y - 10 && ball2Y < paddle1Y + paddleHeight + 10) {
			dx2 = -dx2;
			dy2 = (-(paddle1Y + paddleHeight / 2) + ball2Y) / (paddleHeight / 2);
			if (dPressed) {
				dx2 *= 1.5;
				ball2Fill = "#f44242";
			}
		}
		else {
			player1Lives--;
			reset("d_die");
		}
	}
	
	if (ball1X + dx1 > canvas.width - ballRadius) {
		if (ball1Y > paddle2Y - 10 && ball1Y < paddle2Y + paddleHeight + 10) {
			dx1 = -dx1;
			dy1 = (-(paddle2Y + paddleHeight / 2) + ball1Y) / (paddleHeight / 2);
			if (jPressed) {
				dx1 *= 1.5;
				ball1Fill = "#4256f4";
			}
		}
		else {
			player2Lives--;
			reset("j_die");
		}
	}
	else if (ball2X + dx2 > canvas.width - ballRadius) {
		if (ball2Y > paddle2Y - 10 && ball2Y < paddle2Y + paddleHeight + 10) {
			dx2 = -dx2;
			dy2 = (-(paddle2Y + paddleHeight / 2) + ball2Y) / (paddleHeight / 2);
			if (jPressed) {
				dx2 *= 1.5;
				ball2Fill = "#4256f4";
			}
		}
		else {
			player2Lives--;
			reset("j_die");
		}
	}
}
/** Calls all helper draws -- the one draw to end them all. **/
function draw() {
	"use strict";
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawText();
	detectBrickCollision();
	drawBricks();
	drawBalls();
	drawPaddle(0, paddle1Y);
	drawPaddle(canvas.width - paddleWidth, paddle2Y);
	
	if (!brickCount) {
		reset("win");
	}
	detectBallCollision();
	
	ball1X += dx1;
	ball1Y += dy1;
	ball2X += dx2;
	ball2Y += dy2;
	
	if (wPressed && paddle1Y > 0) {
		paddle1Y -= 5;
	}
	else if (sPressed && paddle1Y < canvas.height - paddleHeight) {
		paddle1Y += 5;
	}
	if (iPressed && paddle2Y > 0) {
		paddle2Y -= 5;
	}
	else if (kPressed && paddle2Y < canvas.height - paddleHeight) {
		paddle2Y += 5;
	}
}


/** INIT/TRANSITION HANDLING **/

var darkCount = 0;
var ascending = true;
/** Draws a scintillating title screen with instructions for starting the game. **/
function writeTitle() {
	"use strict";
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "150px Arial";
	ctx.fillStyle = "#f44242";
	ctx.fillText("D", 20, 200);
	ctx.fillStyle = "#4256f4";
	ctx.fillText("J", 100, 200);
	ctx.fillStyle = "#ff9966";
	ctx.fillText("PONG", 200, 200);
	ctx.fillStyle = "#ff7630";
	switch(darkCount) {
		case 0:
			ctx.fillText("P", 200, 200);
			break;
		case 1:
			ctx.fillText("O", 300, 200);
			break;
		case 2:
			ctx.fillText("N", 417, 200);
			break;
		case 3:
			ctx.fillText("G", 525, 200);
	}
	if (ascending) {
		darkCount++;
	} else {
		darkCount--;
	}
	if (darkCount === 0 || darkCount === 3) {
		ascending = !ascending;
	}
	ctx.font = "30px Arial";
	ctx.fillText("Press D and J to begin!", 20, 300);
}
/** Displays a short message and then returns the game to title/with everything reset. **/
/** Waits for input from both the D and J keys. **/
function waitForDJ() {
	"use strict";
	
	if (dPressed && jPressed) {
		clearInterval(drawInterval);
		drawInterval = setInterval(draw, 10);
	}
	else {
		setTimeout(waitForDJ, 100);
	}
}
var drawInterval = 0;
/** Initializes state. **/
function beginTitle() {
	"use strict";
	
	writeTitle();
	drawInterval = setInterval(writeTitle, 100);
	waitForDJ();
}
beginTitle();
function reset(msg) {
	"use strict";
	
	clearInterval(drawInterval);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	initBall1();
	initBall2();
	initBricks();
	player1Lives = 3;
	player2Lives = 3;
	paddle1Y = (canvas.height - paddleHeight) / 2;
	paddle2Y = (canvas.height - paddleHeight) / 2;
	ctx.font = "30px Arial";
	ctx.fillStyle = "#ff7630";
	switch(msg) {
		case "d_die":
			ctx.fillText("Player J wins!", 20, 300);
			break;
		case "j_die":
			ctx.fillText("Player D wins!", 20, 300);
			break;
		case "win":
			ctx.fillText("Player D and Player J both win.", 20, 300);
	}
	setTimeout(beginTitle, 2000);
}

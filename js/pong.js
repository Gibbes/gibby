/** PONG IMPLEMENTATION:
by Michael Gibbes */

var canvas = document.getElementById("PongBreaker");
var ctx = canvas.getContext("2d");

/** KEY HANDLING */
var wPressed = false;
var sPressed = false;
var iPressed = false;
var kPressed = false;
var dPressed = false;
var jPressed = false;
var spacePressed = false;
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
	else if (e.keyCode === 32) {
		spacePressed = true;
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
	else if (e.keyCode === 32) {
		spacePressed = false;
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

/** VARIABLE VALUES */
var ball1X = canvas.width * (1 / 4); 
var ball1Y = canvas.height / 2;
var ball2X = canvas.width * (3 / 4);
var ball2Y = canvas.height / 2;
var dx1 = 1; 
var dy1 = Math.random() * 2 - 1;
var dx2 = -1;
var dy2 = Math.random() * 2 - 1;
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
for (var c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (var r = 0; r < brickRowCount; r++) {
		bricks[c][r] = [0, 0, 1];
	}
}
var brickCount = 25;

/** DRAW FUNCTIONS */
function drawBalls() {
	"use strict";
	
	ctx.beginPath();
	ctx.arc(ball1X, ball1Y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#ff7630";
	ctx.fill();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.arc(ball2X, ball2Y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#ff7630";
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
	ctx.fillText(brickCount, 8, 20);
	ctx.fillText(brickCount, canvas.width - 25, 20);
	if (!dPressed) {
		ctx.fillText("D", 20, paddle1Y + paddleHeight / 2 + 5);
	}
	if (!jPressed) {
		ctx.fillText("J", canvas.width - 28, paddle2Y + paddleHeight / 2 + 5);
	}
}
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
			}
		}
		else {
			alert("PRISONER D DIED");
			document.location.reload();
		}
	}
	if (ball2X + dx2 < ballRadius) {
		if (ball2Y > paddle1Y - 10 && ball2Y < paddle1Y + paddleHeight + 10) {
			dx2 = -dx2;
			dy2 = (-(paddle1Y + paddleHeight / 2) + ball2Y) / (paddleHeight / 2);
			if (dPressed) {
				dx2 *= 1.5;
			}
		}
		else {
			alert("PRISONER D DIED");
			document.location.reload();
		}
	}
	
	if (ball1X + dx1 > canvas.width - ballRadius) {
		if (ball1Y > paddle2Y - 10 && ball1Y < paddle2Y + paddleHeight + 10) {
			dx1 = -dx1;
			dy1 = (-(paddle2Y + paddleHeight / 2) + ball1Y) / (paddleHeight / 2);
			if (jPressed) {
				dx1 *= 1.5;
			}
		}
		else {
			alert("PRISONER J DIED");
			document.location.reload();
		}
	}
	if (ball2X + dx2 > canvas.width - ballRadius) {
		if (ball2Y > paddle2Y - 10 && ball2Y < paddle2Y + paddleHeight + 10) {
			dx2 = -dx2;
			dy2 = (-(paddle2Y + paddleHeight / 2) + ball2Y) / (paddleHeight / 2);
			if (jPressed) {
				dx2 *= 1.5;
			}
		}
		else {
			alert("PRISONER J DIED");
			document.location.reload();
		}
	}
}
function draw() {
	"use strict";
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	detectBrickCollision();
	drawBricks();
	drawBalls();
	drawPaddle(0, paddle1Y);
	drawPaddle(canvas.width - paddleWidth, paddle2Y);
	drawText();
	
	if (!brickCount) {
		alert("You won?");
		document.location.reload();
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

draw();

function waitForSpace() {
	"use strict";
	
	if (spacePressed) {
		setInterval(draw, 10);
	}
	else {
		setTimeout(waitForSpace, 100);
	}
}
	
waitForSpace();

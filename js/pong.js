/** PONG IMPLEMENTATION:
by Michael Gibbes */

var canvas = document.getElementById("PongBreaker");
var ctx = canvas.getContext("2d");

/** KEY HANDLING */
var upPressed = false;
var downPressed = false;
function keyPressHandler(e) {
	"use strict";
	if (e.keyCode === 38) {
		upPressed = true;
	}
	else if (e.keyCode === 40) {
		downPressed = true;
	}
}
function keyReleaseHandler(e) {
	"use strict";
	if (e.keyCode === 38) {
		upPressed = false;
	}
	else if (e.keyCode === 40) {
		downPressed = false;
	}
}
document.addEventListener("keydown", keyPressHandler, false);
document.addEventListener("keyup", keyReleaseHandler, false);

/** VARIABLE VALUES */
var ballX = canvas.width / 2; 
var ballY = canvas.height / 2;
var dx = 1; 
var dy = -1;
var ballRadius = 10;
var paddleWidth = 10;
var paddleHeight = 75;
var paddle1Y = (canvas.height - paddleHeight) / 2;
var paddle2Y = (canvas.height - paddleHeight) / 2;
/** DRAW FUNCTIONS */
function drawBall() {
	"use strict";
	
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
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
function draw() {
	"use strict";
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle(0, paddle1Y);
	drawPaddle(canvas.width - paddleWidth, paddle2Y);
	
	
	if (ballY + dy > canvas.height - ballRadius || ballY + dy < ballRadius) {
		dy = -dy;
	}
	if (ballX + dx > canvas.width - ballRadius) {
		if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
			dx = -dx;
		}
		else {
			alert("YOU DIED");
			document.location.reload();
		}
	}
	else if (ballX + dx < ballRadius) {
		if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
			dx = -dx;
		}
		else {
			alert("YOU DIED");
			document.location.reload();
		}
	}
	ballX += dx;
	ballY += dy;
	
	if (upPressed && paddle1Y > 0 && paddle2Y > 0) {
		paddle1Y -= 5;
		paddle2Y -= 5;
	}
	else if (downPressed && paddle1Y < canvas.height - paddleHeight && paddle2Y < canvas.height - paddleHeight) {
		paddle1Y += 5;
		paddle2Y += 5;
	}
}

setInterval(draw, 10);

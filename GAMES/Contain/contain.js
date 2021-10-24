// screen width is 640, height is 400
const log = console.log;

let palette = {
	' ': '', // transparent 🔲
	'.': '', // transparent 🔳
	k: '#000000', // blacK ⬛
	d: '#626252', // Dark-gray ⚫
	m: '#898989', // Mid-gray 🔘
	l: '#adadad', // Light-gray ⚪
	w: '#ffffff', // White ⬜
	c: '#cb7e75', // Coral 🔴
	r: '#9f4e44', // Red 🟥
	n: '#6d5412', // browN 🟫
	o: '#FF7800', // Orange 🟧
	y: '#c9d487', // Yellow 🟨
	e: '#9ae29b', // light grEEn 🟢
	g: '#5cab5e', // Green 🟩
	t: '#6abfc6', // Teal 🔵
	b: '#50459b', // Blue 🟦
	i: '#887ecb', // Indigo 🟣
	p: '#a057a3' // Purple 🟪
};

// sprites are scaled x2 by default
let imgBall = spriteArt(`
...gg...
.oooooo.
oyyooyyo
oookkooo
okooooko
ookkkkoo
.oooooo.
..oooo..`);

let imgPaddleVertical = '.oooooo.\noooooooo\n' + 'owp..pwo\now.pp.wo\n'.repeat(21) + 'oooooooo\n.oooooo.';

console.log(imgPaddleVertical);

imgPaddleVertical = spriteArt(imgPaddleVertical);

let imgPaddleHorizontal =
	'.' +
	'o'.repeat(42) +
	'.' +
	'\n' +
	'oo' +
	'w'.repeat(40) +
	'oo' +
	'\n' +
	'oo' +
	'p.'.repeat(20) +
	'oo' +
	'\n' +
	'oo' +
	'.p'.repeat(20) +
	'oo' +
	'\n' +
	'oo' +
	'.p'.repeat(20) +
	'oo' +
	'\n' +
	'oo' +
	'p.'.repeat(20) +
	'oo' +
	'\n' +
	'oo' +
	'w'.repeat(40) +
	'oo' +
	'\n' +
	'.' +
	'o'.repeat(42) +
	'.';

console.log(imgPaddleHorizontal);

imgPaddleHorizontal = spriteArt(imgPaddleHorizontal);

/* PART A: Make image for the wall */
let imgWall = spriteArt(
	'o'.repeat(160) +
		'\n' +
		'i'.repeat(160) +
		'\n' +
		'wk'.repeat(80) +
		'\n' +
		'i'.repeat(160) +
		'\n' +
		'o'.repeat(160) +
		'\n',
	4,
	palette
);

/* PART A0: create a ball and two paddles on each end of the screen */
class Ball {
	constructor() {
		this.r = 8;
		this.w = 16;
		this.h = 16;
		this.velocity = {
			x: 0,
			y: 0
		};
		this.speed = 1.5;
		this.active = false;
		this.reset();
	}

	draw() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		image(imgBall, this.x, this.y);
	}

	async reset() {
		this.x = 320;
		this.y = 200;

		let quad = (Math.floor(Math.random() * 4) / 2) * Math.PI;
		let theta = quad + (9 * Math.random() * Math.PI) / 24 + Math.PI / 24;

		this.velocity.x = this.speed * Math.cos(theta);
		this.velocity.y = this.speed * Math.sin(theta);
	}
}

class Paddle {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	draw() {
		if (this.w < this.h) {
			this.y = mouseY - this.h / 2;
			image(imgPaddleVertical, this.x, this.y);
		} else {
			this.x = mouseX - this.w / 2;
			image(imgPaddleHorizontal, this.x, this.y);
		}
	}
}

let balls = [];
for (let i = 0; i < 4; i++) {
	balls.push(new Ball());
}

let paddleLeft = new Paddle(0, 200, 16, 92);
let paddleRight = new Paddle(624, 200, 16, 92);
let paddleUp = new Paddle(320, 20, 92, 16);
let paddleDown = new Paddle(320, 380, 92, 16);
let bounceFrame0 = 0;
let bounceFrame1 = 0;
let ballsActive = 0;
let ballsServed = 0;
let isGameOver = false;

async function spawn() {
	for (i = 0; i < 4; i++) {
		balls[i].active = true;
		ballsActive++;
		ballsServed++;
		await delay(4000);
		if (isGameOver) {
			return;
		}
	}
}

spawn();

function overlap(a, b) {
	return a.x <= b.x + b.w && a.x + a.w >= b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

async function gameOver() {
	isGameOver = true;
	for (let i = 0; i < balls.length; i++) {
		balls[i].active = false;
		balls[i].reset();
	}
	await pc.alert('Game Over!');
	ballsActive = 0;
	ballsServed = 0;
	isGameOver = false;
	spawn();
}

function draw() {
	/* PART A1: draw the ball and paddles inside the p5 main draw function */
	background(0);

	if (!isGameOver && ((ballsActive == 0 && ballsServed == 1) || (ballsServed >= 2 && ballsActive < 2))) {
		gameOver();
	}
	for (let i = 0; i < balls.length; i++) {
		let ball = balls[i];
		if (!ball.active) continue;
		if ((overlap(ball, paddleLeft) || overlap(ball, paddleRight)) && bounceFrame0 + 20 < frameCount) {
			bounceFrame0 = frameCount;
			ball.velocity.x = -ball.velocity.x;
		}

		if ((overlap(ball, paddleUp) || overlap(ball, paddleDown)) && bounceFrame1 + 20 < frameCount) {
			bounceFrame1 = frameCount;
			ball.velocity.y = -ball.velocity.y;
		}

		if (ball.x <= 0 || ball.x >= 640 || ball.y <= 0 || ball.y >= 400) {
			ball.active = false;
			ballsActive--;
		}

		ball.draw();
	}

	stroke(255);
	//line(paddleLeft.x, paddleLeft.y + paddleLeft.h / 2, paddleRight.x, paddleRight.y + paddleRight.h / 2);
	//line(paddleUp.x + paddleUp.w / 2, paddleUp.y, paddleDown.x + paddleDown.w / 2, paddleDown.y);
	paddleLeft.draw();
	paddleRight.draw();
	paddleUp.draw();
	paddleDown.draw();
}

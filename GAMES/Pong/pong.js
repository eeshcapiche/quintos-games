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

let imgPaddle = spriteArt('.oooooo.\noooooooo\n' + 'owp..pwo\now.pp.wo\n'.repeat(21) + 'oooooooo\n.oooooo.');

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
		this.velocity.x = 0;
		this.velocity.y = 0;
		await delay(2000);
		this.velocity.x = Math.random() * 3 + 2;
		this.velocity.y = Math.random() * 3 + 1;
	}
}

class Paddle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = 16;
		this.h = 92;
	}

	draw() {
		this.y = mouseY - this.h / 2;
		image(imgPaddle, this.x, this.y);
	}
}

let ball = new Ball();
let paddleLeft = new Paddle(0, 200);
let paddleRight = new Paddle(624, 200);
let bounceFrame = 0;

function draw() {
	/* PART A1: draw the ball and paddles inside the p5 main draw function */
	background(0);

	if (ball.y >= 366 || ball.y <= 16) {
		ball.velocity.y = -ball.velocity.y;
	}

	let ballHitPaddleLeft =
		ball.x <= paddleLeft.x + paddleLeft.w && ball.y < paddleLeft.y + paddleLeft.h && ball.y > paddleLeft.y;

	let ballHitPaddleRight =
		ball.x + ball.w >= paddleRight.x && ball.y < paddleRight.y + paddleRight.h && ball.y > paddleRight.y;

	if ((ballHitPaddleLeft || ballHitPaddleRight) && bounceFrame + 10 < frameCount) {
		bounceFrame = frameCount;
		ball.velocity.x = -ball.velocity.x;
	}

	if (ball.x <= 0 || ball.x >= 640) {
		ball.reset();
	}

	ball.draw();
	paddleLeft.draw();
	paddleRight.draw();
	image(imgWall, 0, 0);
	image(imgWall, 0, 380);
}

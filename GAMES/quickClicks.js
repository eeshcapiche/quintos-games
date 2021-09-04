const target =
	" .d88b. \n" +
	".8P  Y8.\n" +
	"88    88\n" +
	"88    88\n" +
	"'8b  d8'\n" +
	" 'Y88P' ";

/* PART A: change the values of x and y to be random */
// screen size is 80w x 30h
// target is 8w x 6h
// drawing starts from top left corner
// we want to draw the target within the bounds of the frame
// 80 screen width - 8 target width - 2 frame line = 70
// 30 screen height - 6 target height - 2 frame line = 22


let btn;
let clicks = 0;
let times = [];

async function endGame() {
	console.log(times);
	let speeds = [];

	for (let i = 0; i < times.length - 1; i++) {
		speeds[i] = times[i + 1] - times[i];
	}
	console.log(speeds);

	let sum = 0;
	for (let i = 0; i < speeds.length; i++) {
		sum = speeds[i] + sum;
	}
	let average = Math.round(sum / speeds.length);

	let slowest = speeds[0];
	let fastest = speeds[0];
	for (let i = 0; i < speeds.length; i++) {
		if (speeds[i] > slowest) {
			slowest = speeds[i];
		}
		if (speeds[i] < fastest) {
			fastest = speeds[i];
		}
	}
	await pc.alert("Game over! Your average click speed is " + average + "ms.\n" +
		"Your fastest speed was " + fastest + "ms and your slowest speed was " + slowest + "ms.");
	exit();
}

async function btnClick() {
	clicks++;
	console.log("You clicked the button!");

	if (btn) btn.erase();
	await gameBackground();
	times.push(Date.now());

	if (clicks == 6) {
		await endGame();
	} else {
		let x = Math.ceil(Math.random() * 70);
		let y = Math.ceil(Math.random() * 22);
		btn = pc.button(target, x, y, btnClick);
	}
}

async function gameBackground() {

	// let pattern = ("\\_|_/-".repeat(13) + "\n").repeat(28);

	let patternA = "\\_|_/-";
	let patternB = "_/-\\_|";
	let lineA = "";
	let lineB = "";
	let bg = "";

	for (let i = 0; i < 13; i++) {
		lineA += patternA;
		lineB += patternB;
	}

	for (let i = 0; i < 28; i++) {
		if (i % 2 == 0) {
			bg += lineA + "\n";
		} else {
			bg += lineB + "\n";
		}
	}

	await pc.text(bg, 1, 1);
	console.log(bg)
}

async function startGame() {
	await gameBackground();
	await pc.alert("Click the buttons as fast as you can.");
	btnClick();
}

startGame();

/* PART A: Mmake a new button after clicking a button */

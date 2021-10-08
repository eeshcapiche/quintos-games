const log = console.log; // shortcut for console.log

const title = `
TTTTT IIIII   CCC
  T     I    C
  T     I    C
  T     I    C
  T   IIIII   CCC

TTTTT  AAA    CCC
  T   A   A  C
  T   AAAAA  C
  T   A   A  C
  T   A   A   CCC

TTTTT  OOO   EEEE
  T   O   O  E
  T   O   O  EEE
  T   O   O  E
  T    OOO   EEEE`.slice(1);

pc.text(title, 5, 6);

const bigSpace = '        \n'.repeat(7);

const bigO = `
 OOOOOO
OO    OO
OO    OO
OO    OO
OO    OO
OO    OO
 OOOOOO`.slice(1); // slice off the first newline character

const bigX = `
XX    XX
 XX  XX
  XXXX
   XX
  XXXX
 XX  XX
XX    XX`.slice(1);

const gridX = 26;
const gridY = 3;

/* PART A: finish the grid of 7x8 spaces */
pc.text('─'.repeat(26), gridX, gridY + 7);
pc.text('─'.repeat(26), gridX, gridY + 15); // draw another horizontal line

pc.text('│\n'.repeat(23), gridX + 8, gridY);
pc.text('│\n'.repeat(23), gridX + 17, gridY); // draw another vertical line

// board stores the game data
// in a two dimensional array of spaces
let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' '],
];

let turnX = true;
let scoreX = 0;
let scoreO = 0;
let singlePlayerMode = true;
let aiLevel = 0;
let challengeMode = false;

function showScore() {
	pc.text('Player X: ' + scoreX + '\n' + 'Player O: ' + scoreO, 55, 5, 20);
}

function checkWinner(mark) {
	for (let i = 0; i < 3; i++) {
		if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
			return true;
		}
		if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
			return true;
		}
	}

	if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
		return true;
	}
	if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
		return true;
	}
	return false;
}

function checkDraw() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				return false;
			}
		}
	}
	return true;
}

async function startNewGame() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			await pc.text(bigSpace, gridX + col * 9, gridY + row * 8);
			board[row][col] = ' ';
		}
	}
	decideTurn();
}

function aiTurn() {
	if (aiLevel == 0) {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					takeTurn(row, col);
					return;
				}
			}
		}
	}

	if (aiLevel == 2) {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					board[row][col] = 'O';
					log(board.join('\n'));
					if (checkWinner('O')) {
						board[row][col] = ' ';
						takeTurn(row, col);
						return;
					}

					board[row][col] = 'X';
					log(board.join('\n'));
					if (checkWinner('X')) {
						board[row][col] = ' ';
						takeTurn(row, col);
						return;
					}
					board[row][col] = ' ';
				}
			}
		}
	}

	let avail = [];
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				avail.push([row, col]);
			}
		}
	}

	let rand = Math.floor(Math.random() * avail.length);
	let coord = avail[rand];
	takeTurn(coord[0], coord[1]);
}

async function takeTurn(row, col) {
	if (board[row][col] != ' ') {
		await pc.alert('That space is taken!', 55, 20, 20);
		return;
	}

	let x = gridX + col * 9;
	let y = gridY + row * 8;

	let mark;
	if (turnX) {
		await pc.text(bigX, x, y);
		mark = 'X';
	} else {
		await pc.text(bigO, x, y);
		mark = 'O';
	}
	board[row][col] = mark;
	log(board.join('\n'));
	if (checkWinner(mark)) {
		await pc.alert('Player ' + mark + ' won!', 55, 20, 20);
		if (turnX) {
			scoreX++;
			if (challengeMode && aiLevel <= 1) {
				aiLevel++;
			}
		} else {
			scoreO++;
		}
		startNewGame();
		showScore();
		return;
	}

	if (checkDraw()) {
		await pc.alert('Draw!', 55, 20, 20);
		startNewGame();
		return;
	}

	turnX = !turnX;
	if (turnX) {
		pc.text("Player X's turn", 55, 3);
	} else {
		pc.text("Player O's turn", 55, 3);
		if (singlePlayerMode) aiTurn();
	}
}

function decideTurn() {
	if (Math.random() > 0.5) {
		turnX = true;
		pc.text("Player X's turn", 55, 3);
	} else {
		turnX = false;
		pc.text("Player O's turn", 55, 3);
		if (singlePlayerMode) aiTurn();
	}
}

async function startGame() {
	await pc.eraseRect(55, 12, 1, 7);
	/* PART A: Make the buttons in the grid */
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			pc.button(bigSpace, gridX + col * 9, gridY + row * 8, () => {
				takeTurn(row, col);
			});
		}
	}
	showScore();
	decideTurn();
}

pc.button('Single Player', 55, 13, async () => {
	await pc.eraseRect(55, 13, 1, 3);
	pc.button('Easy', 55, 12, () => {
		startGame();
	});
	pc.button('Medium', 55, 14, () => {
		aiLevel = 1;
		startGame();
	});
	pc.button('Hard', 55, 16, () => {
		aiLevel = 2;
		startGame();
	});
	pc.button('Challenge Mode', 55, 18, () => {
		challengeMode = true;
		startGame();
	});
});

pc.button('Multiplayer', 55, 15, async () => {
	singlePlayerMode = false;
	startGame();
});

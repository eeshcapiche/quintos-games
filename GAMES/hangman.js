// no wrapper this time!

const hangman = [`
=========`, `
      +
      |
      |
      |
      |
      |
=========`, `
  +---+
      |
      |
      |
      |
      |
=========`, `
  +---+
  |   |
      |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`];

let words = `abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buxom buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo gizmo glowworm glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quips quiz quizzes quorum razzmatazz rhubarb rhythm scratch snazzy sphinx squawk staff strength stretch stronghold stymied subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth triphthong unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie`;

/* PART A0: split the words string into an array, choose a random word */
words = words.split(" ");

let rand = Math.random() * words.length;
rand = Math.floor(rand);

let word = words[rand];
console.log(word);

/* PART A1: make an array with a line for each letter in the word */
// Example word: 'quiz'
// lines -> ['_', '_', '_', '_']
let lines = [];
for (let i = 0; i < word.length; i++) {
	lines.push("_");
}

console.log(lines);

let wrongGuesses = [];

async function startGame() {

	/* PART A3: make the game loop */
	while (lines.includes("_")) {
		if (wrongGuesses.length == hangman.length) {
			await alert("You lose! The word was " + word + "!\n" + "Your incorrect guesses: " + wrongGuesses.join(", "));
			break;
		}
		/* PART B: add the hangman to the prompt message */
		let guess = await prompt(hangman[wrongGuesses.length] + "\n" + lines.join(' '));

		/* PART B: implement guessing the whole word */
		if (guess.length > 1) {
			if (guess == word) {
				break;
			} else {
				wrongGuesses.push(guess);
				continue;
			}
		}

		let wasCorrect = false;
		/* PART A4: implement guessing letters */
		for (i = 0; i < word.length; i++) {
			if (word[i] == guess) {
				lines[i] = guess;
				wasCorrect = true;
			}
		}
		if (wasCorrect == false) {
			wrongGuesses.push(guess);
		}
	}

	if (wrongGuesses.length != hangman.length) {
		await alert("You got it! The word was " + word + "!\n" + "Your incorrect guesses: " + wrongGuesses.join(", "));
	}
	exit();
}

startGame();

/* PART B: use for loops */

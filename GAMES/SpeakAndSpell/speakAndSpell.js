let inp;
let word;
let currentLetterIndex;
// value is the text the user entered in the input
function onSubmit(value) {
	if (value == word) {
		speechSounds['you_are_correct_next_spell'].play();
		speechSounds['you_are_correct_next_spell'].onended(() => {
			nextWord();
		});
	} else {
		speechSounds['that_is_incorrect_the_correct_spelling_of'].play();
		speechSounds['that_is_incorrect_the_correct_spelling_of'].onended(() => {
			wordSounds[word].play();
			wordSounds[word].onended(() => {
				speechSounds['is'].play();
				speechSounds['is'].onended(() => {
					currentLetterIndex = 0;
					spellWord();
				});
			});
		});
	}
}

function spellWord() {
	if (currentLetterIndex == word.length) {
		return;
	}
	let letter = word[currentLetterIndex];
	letterSounds[letter].play();
	letterSounds[letter].onended(() => {
		currentLetterIndex++;
		spellWord();
	});
}

// called everytime the user enters text in the input
function onChange(value) {
	let letter = value[value.length - 1];
	letterSounds[letter].play();
}

async function nextWord() {
	await erase(); // erase the screen

	word = words[Math.floor(Math.random() * words.length)];
	wordSounds[word].play();
	console.log(word);
	// create the input for letters
	inp = input('', 0, 0, onSubmit, onChange);
}

async function startGame() {
	await alert('Press enter to start');
	speechSounds['spell'].play();
	speechSounds['spell'].onended(() => {
		nextWord();
	});
}

startGame();

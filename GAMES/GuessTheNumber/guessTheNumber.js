(async () => { // start wrapper (I will explain how this works later)

	/* Your code goes here! (inside the wrapper) :D */

	/* PART A: Make a random number between 1-100 */
	let rand = Math.random() * 100;
	rand = Math.ceil(rand);
	console.log(rand);

	/* PART A: Write code for one turn of the game */
	let guess;

	for (let i = 0; guess != rand; i++) {
		// ask user to guess a number, assign their response to a variable
		if (i == 7) {
			await alert("You ran out of guesses. Game over!")
			break;
		}
		guess = await prompt("Guess a number 1-100");

		// tell the player if their guess was too low, too high, or correct
		if (guess > 100 || guess < 1) {
			await alert("Invalid guess!");
			i--;
		} else if (guess < rand) {
			await alert("Your guess is too low");
		} else if (guess > rand) {
			await alert("Your guess is too high");
		} else {
			await alert("Correct!");
		}

	}


	/* PART B: Make the game loop */

	exit(); // exits the game
})(); // end wrapper

(async () => { // start of wrapper (I will explain how this works later)

	let choice = -1; // initialize choice to -1, user has not made any choice yet

	while (choice != null) { // while choice is not null (nothing)
		let msg = ''; // initialize message to empty string
		let choices = [];
		if (choice == -1) {
			/* PART A: Start your story! */
			msg = "You are a member of a ragtag group of pirates in a bounty heist. You're heading out of danger from a rival pirate gang when suddenly, you're sail has fallen into the ocean. The boat starts shaking and you are losing speed. The rivals are catching up.\n\n\t" +
				"1: You dive into the ocean and try to pick the sail up.\n\t" +
				"2: You grab your rifle and begin shooting at the rival boat.\n\t" +
				"3: You surrender and concede the treasure.";
			choices = [1, 2, 3];
		} else if (choice == 1) {
			/* PART A: continue the story */
			msg = "You tell your buddy to hold the line for you as you charge for the front of the boat and brace to dive under the ocean. You aren't a strong swimmer but manage to grab ahold of the sail. As you swim back, your buddy holding the line is hit with a bullet in the stomach and he drops the line. \n\n\t" +
				"4: You drop the sail and swim to the back of the boat.\n\t" +
				"5: You keep the sail and try to swim to the back of the boat.";
			choices = [4, 5];
		} else if (choice == 2) {
			msg = "While aiming down the rival boat, you begin to notice that your boat isn't actually moving, while the rival's is, and you are running out of ammunition. You hit one of the members of the rival boat, but the captain of the rival boat must be shot for the boat to halt. \n\n\t" +
				"6: You continue using up your remaining ammo on the members of the boat who are carrying weapons.\n\t" +
				"7: You try to aim down at the captain only, and risk taking fire from the other members.";
			choices = [6, 7];
		} else if (choice == 3) {
			msg = "You idly wait as the rival boat catches up to you, and concede the beloved treasure. You are then captured as a hostage by the rival gang and sent to life in exile in their prison.";
		} else if (choice == 4) {
			msg = "You abandon the sail and immediately head straight for the rear end of your ship, where an emergency ladder is kept. You climb back up to the ship and notice the ship is still not moving.\n\n\t" +
				"2: You grab your rifle and begin shooting at the rival boat.\n\t" +
				"3: You surrender and concede the treasure.";
			choices = [2, 3];
		} else if (choice == 5) {
			msg = "";
		}

		if (choices.length == 0) {
			await alert(msg);

			/* PART B: end the game if there are no more choices to make */
			choice = null;
		} else {
			let input = await prompt(msg);
			input = Number(input);

			/* PART B: check if the player made a valid choice */
			if (choices.includes(input)) {
				choice = input;
			} else {
				await alert("Invalid choice!");
			}
		}
	}

	exit(); // exits the game
})(); // end wrapper

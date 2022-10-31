function InputCheck(input: HTMLInputElement): boolean {
	let size: number = parseInt(input.value);
	const error: HTMLSpanElement = document.getElementById("error");

	if (size % 2 !== 0) {
		input.value = (size + 1).toString();
		error.innerHTML = "Size must be an even number";
		return false;
	}

	if (size <= 0) {
		input.value = "12";
		error.innerHTML = "Size can not be negative";
		return false;
	}

	if (size >= 1000 && size % 2 === 0) {
		error.innerHTML = "This is going to take a while";
		return true;
	}

	if (size % 2 === 0) {
		error.innerHTML = "";
		return true;
	}

	return false;
}

//Interface that holds the rows and columns.
interface RaC {
	rows: number;
	columns: number;
}

function GameCover(width: string) {
	const upperCover = document.getElementById("upper-cover") as HTMLDivElement;
	const lowerCover = document.getElementById("lower-cover") as HTMLDivElement;

	upperCover.style.height = width;
	lowerCover.style.height = width;

	return new Promise<boolean>(resolve => {
		setTimeout(() => { resolve(true) }, 1000);
	});
}

async function StartGame() {
	const sizeInput = (document.getElementById("size-input") as HTMLInputElement);

	if (InputCheck(sizeInput)) {
		const size: number = parseInt(sizeInput.value);

		const centerTab = document.getElementById("center-tab") as HTMLDivElement;
		centerTab.style.display = "none";

		const menu = document.getElementById("menu") as HTMLDivElement;
		menu.style.display = "none";

		await GameCover("50%");
		
		const RowsACols = CalculateRowsAndColumns(size) as RaC;

		document.getElementById("size-display").innerHTML = size.toString();
		document.getElementById("right-panel").style.display = "flex";

		//create game panel, so when game is completed just call .remove() and delete it along with his children.
		const gamePanel = document.createElement("div") as HTMLDivElement;
		gamePanel.id = "game-panel";
		gamePanel.className = "game-panel";
		document.getElementById("background").appendChild(gamePanel);

		CreateCards(RowsACols, gamePanel);
	}
}

interface CardContainer extends HTMLDivElement {
	cover: HTMLDivElement;
	card: Card;
}

interface Card extends HTMLDivElement {
	//secretId will contain a number to identify pairs when clicked.
	secretId: number;
	//If pairs are found complete will be equal to true, default is false.
	complete: boolean;
}

//Array that will contain all the cards when game is started.
const cards: Card[] = [];

function CreateCards(RowsACols: RaC, panel: HTMLDivElement): void {
	cards.splice(0, cards.length);

	//Create rows and colums, add the respective classes and appendChild the columns to the rows and the rows to the game panel.
	for (let i = 0; i < RowsACols.rows; i++) {
		const row = document.createElement("div") as HTMLDivElement;
		row.className = "rows";

		for (let j = 0; j < RowsACols.columns; j++) {
			const cardContainer = document.createElement("div") as CardContainer;
			const card = document.createElement("div") as Card;
			card.className = "cards";
			const cover = document.createElement("div") as HTMLDivElement;
			cover.className = "card-cover";

			//Add card and cover to the container as well as the properties and the click event.
			cardContainer.className = "card-container";
			cardContainer.card = card;
			cardContainer.appendChild(card);
			cardContainer.cover = cover;
			cardContainer.appendChild(cover);
			cardContainer.onclick = function () {
				CompareCard(cardContainer);
			};

			cards.push(card);
			row.appendChild(cardContainer);
		}

		panel.appendChild(row);
	}

	//Just shuffle the array cards with a method that I found on StackOverflow.
	shuffle(cards);

	//Add secretId, complete and image values to the cards.
	//This is done in pairs using half of the array.
	for (var i = 0; i < cards.length / 2; i++) {
		const card1 = cards[i];
		const card2 = cards[i + cards.length / 2];

		card1.secretId = i;
		card2.secretId = i;

		card1.complete = false;
		card2.complete = false;

		card1.style.backgroundImage = `url(https://picsum.photos/${card1.offsetWidth}/${card1.offsetHeight}?random&secId=${ crypto.randomUUID() })`;
		card2.style.backgroundImage = card1.style.backgroundImage;

		//when the last card is created.
		if (i + 1 === cards.length / 2) {
			//create image and add a load event to it.
			var image = new Image();
			image.addEventListener("load", async function () {
				//when image is loaded remove game cover and remove image.
				//The point is if last image is loaded that means all other image are loaded too.
				await GameCover("0")
				this.remove();
			});
			//attach the last card source image.
			image.src = `https://picsum.photos/${card1.offsetWidth}/${card1.offsetHeight}?random&secId=${card1.secretId}`;
		}
	}
}

//Array that will contain the card containers when click, only two.
const compare: CardContainer[] = [];

//TODO - fix error when card are click to quick.
async function CompareCard(cardContainer: CardContainer) {
	var finnishGame: boolean = false;

	//Add card container to compare array, remove the click event and flip the container.
	compare.push(cardContainer);
	cardContainer.onclick = null;
	cardContainer.style.transform = "rotateY(180deg)";

	//when there two cards in the aray, compare their secretId value.
	if (compare.length === 2) {
		const cardContainer1 = compare[0];
		const cardContainer2 = compare[1];

		//if secretId values coincided set complete to true.
		if (cardContainer1.card.secretId === cardContainer2.card.secretId) {
			cardContainer1.card.complete = true;
			cardContainer2.card.complete = true;

			//Checks every complete property in the cards array, if its equal to true set finnishGame variable to true.
			finnishGame = cards.every(function (value) {
				return value.complete === true;
			});
		}
		else {
			//if secretId value are not equal return onclick event to both of the containers.
			cardContainer1.onclick = function () {
				CompareCard(cardContainer1);
			};
			cardContainer2.onclick = function () {
				CompareCard(cardContainer2);
			};

			//Rotate container back to 0 deg after 500ms.
			await setTimeout(function () {
				cardContainer1.style.transform = "rotateY(0deg)";
				cardContainer2.style.transform = "rotateY(0deg)";

				return new Promise<boolean>(resolve => {
					resolve(true)
				});
			}, 500)
		}

		//Always empty compare array.
		compare.splice(0, compare.length)
		//Increase the moves by one when two cards are compare.
		document.getElementById("total-moves").innerHTML = (parseInt(document.getElementById("total-moves").innerHTML) + 1).toString();

		//if finnishGame is true call CompleteGame function.
		if (finnishGame) {
			CompleteGame();
		}
	}
}

//function that will execute when game is completed.
async function CompleteGame() {
	document.getElementById("game-panel").remove();
	cards.splice(0, cards.length);
	document.getElementById("right-panel").style.display = "none";

	const secondMenu = document.getElementById("second-menu") as HTMLDivElement;

	document.getElementById("center-tab").style.display = "flex";
	secondMenu.style.display = "block";
	let moves = document.getElementById("total-moves").innerHTML;
	document.getElementById("total-moves").innerHTML = "0";

	if (moves === "1") {
		document.getElementById("total-moves-finnish").innerHTML = moves + " move";
	}
	else {
		document.getElementById("total-moves-finnish").innerHTML = moves + " moves";
	}

	document.getElementById("size-display-finnish").innerHTML = document.getElementById("size-display").innerHTML;
}

function CalculateRowsAndColumns(size: number): RaC {
	const divisors: number[] = [];

	//if size is 2 just return this value, the method can't figure it out 2.
	if (size === 2) {
		return { rows: 1, columns: 2 } as RaC;
	}

	//find all the divisor of size. (there is maybe not need for an array, but is more readable)
	for (var i = 2; i < size; i++) {
		if (size % i === 0) {
			divisors.push(i);
		}
	}

	const pairs: RaC[] = [];

	//finds the pairs of divisors that when multiplicated return the size.
	divisors.forEach(function (value: number, index, array: number[]) {
		for (var i = 0; i < array.length; i++) { 
			if (value * array[i] === size) {
				//Columns have to be bigger than rows.
				if (value >= array[i]) {
					const pair: RaC = { rows: array[i], columns: value }
					pairs.push(pair);
				}
			}
		}
	});
	
	let output: RaC = { rows: pairs[0].rows, columns: pairs[0].columns };

	//find the pair whose values a the closest by calculating the average, that is the lowest average.
	pairs.forEach(function (value: RaC) {
		let average: number = (output.rows + output.columns) / 2;
		if (average > (value.rows + value.columns) / 2) {
			output = value;
		}
	});

	return output;
}

function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}
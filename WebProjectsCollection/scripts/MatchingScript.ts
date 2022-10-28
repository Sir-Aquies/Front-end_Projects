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
		error.innerHTML = "Start the game at your own risk";
		return true;
	}

	if (size % 2 === 0) {
		error.innerHTML = "";
		return true;
	}

	return false;
}

interface RaC {
	rows: number;
	columns: number;
}

function StartGame(): void {
	const sizeInput = (document.getElementById("size-input") as HTMLInputElement);

	if (InputCheck(sizeInput)) {
		const size: number = parseInt(sizeInput.value);
		const menu = document.getElementById("menu") as HTMLDivElement;
		const background = document.getElementById("background") as HTMLDivElement;
		const rightPanel = document.getElementById("right-panel") as HTMLDivElement;
		const sizeDisplay = document.getElementById("size-display") as HTMLSpanElement;
		menu.style.display = "none";
		background.style.justifyContent = "left";
		background.style.alignItems = "initial";
		
		const RowsACols = CalculateRowsAndColumns(size) as RaC;

		sizeDisplay.innerHTML = size.toString();
		rightPanel.style.display = "flex";

		const gamePanel = document.createElement("div") as HTMLDivElement;
		gamePanel.className = "game-panel";
		background.appendChild(gamePanel);

		CreateCards(RowsACols, gamePanel);
	}
}

interface Card extends HTMLDivElement {
	secretId: number;
	complete: boolean;
	secretImage: string;
}

const cards: Card[] = [];

function CreateCards(RowsACols: RaC, panel: HTMLDivElement): void {
	for (let i = 0; i < RowsACols.rows; i++) {
		const row = document.createElement("div") as HTMLDivElement;
		row.className = "rows";

		for (let j = 0; j < RowsACols.columns; j++) {
			var column = document.createElement("div") as Card;
			column.className = "cards";
			cards.push(column);
			row.appendChild(column);
		}

		panel.appendChild(row);
	}

	for (var i = 0; i < cards.length / 2; i++) {
		const card1 = cards[i];
		const card2 = cards[i + cards.length / 2];

		card1.secretId = i;
		card2.secretId = i;

		card1.complete = false;
		card2.complete = false;

		//card1.style.backgroundImage = `url(https://picsum.photos/${card1.offsetWidth}/${card1.offsetHeight}?random&secId=${card1.secretId})`;
		//card2.style.backgroundImage = card1.style.backgroundImage;

		card1.secretImage = `url(https://picsum.photos/${card1.offsetWidth}/${card1.offsetHeight}?random&secId=${card1.secretId})`;
		card2.secretImage = card1.secretImage;

		card1.onclick = function () {
			CompareCard(card1);
		};

		card2.onclick = function () {
			CompareCard(card2);
		};
	}
}

const compare: Card[] = [];

function CompareCard(card: Card): any {
	const moves = document.getElementById("total-moves") as HTMLSpanElement;
	var finnishGame: boolean = false;
	card.style.backgroundImage = card.secretImage;
	compare.push(card);
	card.onclick = null;

	if (compare.length === 2) {
		const card1 = compare[0];
		const card2 = compare[1];

		if (card1.secretId === card2.secretId) {
			card1.complete = true;
			card2.complete = true;

			finnishGame = cards.every(function (value) {
				return value.complete === true;
			});
		}
		else {
			card1.onclick = function () {
				CompareCard(card1);
			};

			card2.onclick = function () {
				CompareCard(card2);
			};

			setTimeout(function (){
				card1.style.backgroundImage = "none";
				card2.style.backgroundImage = "none";
			}, 1000)

			moves.innerHTML = (parseInt(moves.innerHTML) + 1).toString();
		}

		compare.splice(0, compare.length)

		if (finnishGame) {
			CompleteGame();
		}
	}
}

function CompleteGame() {
	alert("congratulations");
}

function CalculateRowsAndColumns(size: number): RaC {
	const divisors: number[] = [];

	if (size === 2) {
		return { rows: 1, columns: 2 } as RaC;
	}

	for (var i = 2; i < size; i++) {
		if (size % i === 0) {
			divisors.push(i);
		}
	}

	const pairs: RaC[] = [];

	divisors.forEach(function (value: number, index, array: number[]) {
		for (var i = 0; i < array.length; i++) { 
			if (value * array[i] === size) {
				if (value >= array[i]) {
					const pair: RaC = { rows: value, columns: array[i] }
					pairs.push(pair);
				}
			}
		}
	});
	
	let output: RaC = { rows: pairs[0].rows, columns: pairs[0].columns };

	pairs.forEach(function (value: RaC) {
		let average: number = (output.rows + output.columns) / 2;

		if (average > (value.rows + value.columns) / 2) {
			output = value;
		}
	});

	return output;
}
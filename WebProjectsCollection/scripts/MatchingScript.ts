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

	if (size > 1000 && size % 2 === 0) {
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
		const sizeDisplay = document.getElementById("size-display") as HTMLDivElement;
		menu.style.display = "none";
		background.style.justifyContent = "left";
		background.style.alignItems = "initial";
		
		const RowsACols = CalculateRowsAndColumns(size) as RaC;

		sizeDisplay.innerHTML = size.toString();
		rightPanel.style.display = "block";

		const gamePanel = document.createElement("div") as HTMLDivElement;
		gamePanel.className = "game-panel";
		background.appendChild(gamePanel);

		CreateCards(RowsACols, gamePanel);
	}
}

function CreateCards(RowsACols: RaC, panel: HTMLDivElement): void {
	const rowHeight = Math.floor(panel.offsetHeight / RowsACols.columns);

	for (let i = 0; i < RowsACols.rows; i++) {
		const row = document.createElement("div") as HTMLDivElement;
		row.className = "rows";
		//row.style.height = rowHeight + "px";

		for (let j = 0; j < RowsACols.columns; j++) {
			const column = document.createElement("div") as HTMLDivElement;
			column.style.width = "100%";
			column.style.height = "100%";
			column.style.backgroundColor = "green";
			column.style.border = "1px solid darkgreen";
			column.style.marginLeft = "0.5rem";
			column.style.marginRight = "0.5rem";
			row.appendChild(column);
		}

		panel.appendChild(row);
	}
}

function CalculateRowsAndColumns(size: number): RaC {
	const divisors: number[] = [];

	for (var i = 2; i < size; i++) {
		if (size % i === 0) {
			divisors.push(i);
		}
	}

	const pairs: RaC[] = [];

	divisors.forEach(function (value, index, array) {
		for (let i = 0; i < array.length; i++) {
			if (value * array[i] === size) {
				if (value > array[i]) {
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
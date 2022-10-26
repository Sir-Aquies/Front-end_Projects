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

function StartGame(): void {
	const sizeInput = (document.getElementById("size-input") as HTMLInputElement);

	if (InputCheck(sizeInput)) {
		const size: number = parseInt(sizeInput.value);
		const menu = document.getElementById("menu") as HTMLDivElement;
		const background = document.getElementById("background") as HTMLDivElement;
		//menu.style.display = "none";
		//background.style.justifyContent = "initial";
		//background.style.alignItems = "initial";
		
		const RaC = CalculateRowsAndColumns(size);
	}
}

function CalculateRowsAndColumns(size: number): object {
	interface RaC {
		rows: number;
		columns: number;
	}

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
var amount = 1;
const targetsArray = [];

class Target {
	constructor(size, x, y) {
		this.target = CreaterTarget(size, false);
		this.target.style.left = `${x}px`;
		this.target.style.top = `${y}px`;
		this.target.addEventListener("mousedown", () => { ShootLand(this) });
	}

	ResetPosition() {
		const plain = document.getElementById("Plain");

		let target_x = Math.floor(Math.random() * (plain.offsetWidth - this.target.offsetWidth));
		let target_y = Math.floor(Math.random() * (plain.offsetHeight - this.target.offsetHeight));

		this.target.style.left = `${ target_x }px`;
		this.target.style.top = `${ target_y }px`;
	}

	Resize(w, h) {
		this.target.style.width = `${w}0px`;
		this.target.style.height = `${h}0px`;
	}

	ReLocate(x, y) {
		this.target.style.left = `${x}px`;
		this.target.style.top = `${y}px`;
	}
}

//Create a target that will work as a showcase for the size of all the targets.
const targetShowcase = CreaterTarget(5, true);

//Every time the value of TargetSize changes we modify the size of the showcase.
document.getElementById("TargetSize").addEventListener("change", () => { TargetShowcaseSize() });

function TargetShowcaseSize() {
	const targetSize = document.getElementById("TargetSize");
	let size = parseInt(targetSize.value);

	if (size > 15) {
		targetSize.value = 15;
		return;
	}

	if (size < 1) {
		targetSize.value = 1;
		return;
	}

	targetShowcase.style.width = `${size}0px`;
	targetShowcase.style.height = `${size}0px`;
}

document.getElementById("PlayButton").addEventListener("click", () => { StartGame() });

function StartGame() {
	const amount = parseInt(document.getElementById("TargetAmount").value);

	if (amount <= 0) {
		return;
	}

	const targetSize = document.getElementById("TargetSize");
	const resetBtn = document.getElementById("ResetBtn");
	const userTab = document.getElementById("UserTab");
	const plain = document.getElementById("Plain");

	resetBtn.style.display = "block";
	userTab.style.display = "none";
	targetShowcase.display = "none";

	for (var i = 0; i < amount; i++) {
		var TargetClass = new Target(parseInt(targetSize.value));
		TargetClass.ResetPosition();
		targetsArray.push(TargetClass);
	}

	plain.addEventListener("mousedown", Shoot);
}

function EndGame() {
	if (targetsArray.length !== 0) {
		const totalShoots = document.getElementById("TotalShoots");
		const missShoots = document.getElementById("MissShoots");
		const accuracy = document.getElementById("Accuracy");
		const resetBtn = document.getElementById("ResetBtn");
		const userTab = document.getElementById("UserTab");
		const plain = document.getElementById("Plain");
		const score = document.getElementById("Score");
		
		totalShoots.innerHTML = 0;
		missShoots.innerHTML = 0;
		score.innerHTML = 0;
		amount = 0;
		accuracy.innerHTML = "0%";

		resetBtn.style.display = "none";
		userTab.style.display = "flex";
		targetShowcase.display = "block";

		while (targetsArray.length !== 0) {
			targetsArray[0].target.remove();
			targetsArray.shift();
		}

		plain.removeEventListener("mousedown", Shoot);
	}

}

function Shoot() {
	const totalShoots = document.getElementById("TotalShoots");

	let currentShoots = parseInt(totalShoots.innerHTML);
	currentShoots++;
	totalShoots.innerHTML = currentShoots;

	AccuracyCalculation();
	MissShoots();
}

function ShootLand(CurrTarget) {
	event.stopPropagation();
	const totalShoots = document.getElementById("TotalShoots");
	const score = document.getElementById("Score");

	let currentScore = parseInt(score.innerHTML);
	currentScore++;
	score.innerHTML = currentScore;

	let currentShoots = parseInt(totalShoots.innerHTML);
	currentShoots++;
	totalShoots.innerHTML = currentShoots;

	AccuracyCalculation();
	CurrTarget.ResetPosition();
}

function MissShoots() {
	const score = document.getElementById("Score");
	const totalShoots = document.getElementById("TotalShoots");
	const missShoots = document.getElementById("MissShoots");

	let currentShoots = parseInt(totalShoots.innerHTML);
	let currentScore = parseInt(score.innerHTML);

	missShoots.innerHTML = currentShoots - currentScore;
}

function AccuracyCalculation() {
	const totalShoots = document.getElementById("TotalShoots");
	const accuracy = document.getElementById("Accuracy");
	const score = document.getElementById("Score");

	let currentShoots = parseInt(totalShoots.innerHTML);
	let currentScore = parseInt(score.innerHTML);

	if (currentShoots === 0) {
		return;
	}

	let acc = (currentScore / currentShoots) * 100;
	acc = Math.round(acc * 100) / 100;

	accuracy.innerHTML = acc + "%";
}

function CreaterTarget(size, show) {
	const targetdiv = document.createElement("div");

	if (show == true) {
		document.getElementById("TargetContainer").appendChild(targetdiv);
	}
	else {
		document.getElementById("Plain").appendChild(targetdiv);
	}

	targetdiv.style.height = `${size}0px`;
	targetdiv.style.width = `${size}0px`;
	targetdiv.style.position = "absolute";
	targetdiv.style.backgroundColor = "darkred";
	targetdiv.style.borderRadius = "50%";
	targetdiv.id = `target_${amount}`;
	amount++;

	return targetdiv;
}
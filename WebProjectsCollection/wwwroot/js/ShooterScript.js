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

		//Set the absolute width and height of the plain.
		plain.offsetRight = plain.offsetLeft + plain.offsetWidth;
		plain.offsetBottom = plain.offsetTop + plain.offsetHeight;

		//Ramdomize the position of the target using minimum (width/height of the target) and maximun (right/bottom of the plain).
		let target_x = Math.floor(Math.random() * (plain.offsetRight - parseInt(this.target.style.width))) + parseInt(this.target.style.width);
		let target_y = Math.floor(Math.random() * (plain.offsetBottom - parseInt(this.target.style.height))) + parseInt(this.target.style.height);

		//if the target left/top position plus the his width/height is higher than the plain the width/height of the target is subtracted.
		if (target_x + parseInt(this.target.style.width) >= plain.offsetRight) {
			target_x -= parseInt(this.target.style.width);
		}
		if ((target_y + parseInt(this.target.style.height)) >= plain.offsetBottom) {
			target_y -= parseInt(this.target.style.height);
		}

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
const targetShowcase = CreaterTarget(1, true);

//Every time the value of TargetSize changes we modify the size of the showcase.
document.getElementById("TargetSize").addEventListener("change", () => { TargetShowcaseSize() });

function TargetShowcaseSize() {
	const targetSize = document.getElementById("TargetSize");
	let size = parseInt(targetSize.value);

	if (size > 15) {
		targetSize.value = 15;
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
	const userTab = document.getElementById("UserTab");
	const plain = document.getElementById("Plain");

	userTab.style.display = "none";
	targetShowcase.display = "none";

	for (var i = 0; i < amount; i++) {
		var TargetClass = new Target(parseInt(targetSize.value));
		TargetClass.ResetPosition();
		targetsArray.push(TargetClass);
	}

	plain.addEventListener("mousedown", () => { Shoot() });
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
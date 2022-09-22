const plain = document.getElementById("Plain");

const score = document.getElementById("Score");
const ScoreTab = document.getElementById("scoretab");
const totalShoots = document.getElementById("TotalShoots");
const missShoots = document.getElementById("MissShoots");
const accuracy = document.getElementById("Accuracy");


const targetAmount = document.getElementById("TargetAmount");
const setbutton = document.getElementById("SetButton");

const targetSizeValue = document.getElementById("TargetSize");
const targetContainer = document.getElementById("TargetContainer");

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

		let target_x = Math.floor(Math.random() * plain.offsetWidth) + parseInt(this.target.style.width);
		let target_y = Math.floor(Math.random() * plain.offsetHeight) + parseInt(this.target.style.height);

		if ((target_x + parseInt(this.target.style.width)) >= plain.offsetRight) {
			target_x -= (target_x + parseInt(this.target.style.width) - plain.offsetRight);
		}
		if (target_x <= plain.offsetLeft) {
			target_x += (plain.offsetLeft - target_x);
		}

		if ((target_y + parseInt(this.target.style.height)) >= plain.offsetBottom) {
			target_y -= (target_y + parseInt(this.target.style.height) - plain.offsetBottom);
		}
		if (target_y <= plain.offsetTop) {
			target_y += (plain.offsetTop - target_y);
		}

		this.target.style.left = `${target_x}px`;
		this.target.style.top = `${target_y}px`;
	}

	//ResetPosition() {
	//	const plain = document.getElementById("Plain");

	//	plain.offsetRight = plain.offsetLeft + plain.offsetWidth;
	//	plain.offsetBottom = plain.offsetTop + plain.offsetHeight;

	//	let target_x = Math.floor(Math.random() * plain.offsetRight);
	//	let target_y = Math.floor(Math.random() * plain.offsetBottom);

	//	if ((target_x + parseInt(this.target.style.width)) >= plain.offsetRight) {
	//		target_x -= (target_x + parseInt(this.target.style.width) - plain.offsetRight);
	//	}
	//	if (target_x <= plain.offsetLeft) {
	//		target_x += (plain.offsetLeft - target_x);
	//	}

	//	if ((target_y + parseInt(this.target.style.height)) >= plain.offsetBottom) {
	//		target_y -= (target_y + parseInt(this.target.style.height) - plain.offsetBottom);
	//	}
	//	if (target_y <= plain.offsetTop) {
	//		target_y += (plain.offsetTop - target_y);
	//	}

	//	this.target.style.left = `${target_x}px`;
	//	this.target.style.top = `${target_y}px`;
	//}

	Resize(w, h) {
		this.target.style.width = `${w}0px`;
		this.target.style.height = `${h}0px`;
	}

	ReLocate(x, y) {
		this.target.style.left = `${x}px`;
		this.target.style.top = `${y}px`;
	}
}

const targetShowcase = CreaterTarget(1, true);

setbutton.addEventListener("click", () => { TargetAmount(parseInt(targetAmount.value)) });

targetSizeValue.addEventListener("change", () => { TargetSize(targetSizeValue.value) });

window.addEventListener("load", () => {
	//ScoreTab.style.width = `${window.innerWidth - 17}px`;

	//plain.style.width = `${window.innerWidth - 17}px`;
	//plain.style.height = `${window.innerHeight - ScoreTab.offsetHeight - 17}px`;

	//usertab.style.width = `${(window.innerWidth - 17) * 0.40}px`;
	//usertab.style.height = `${(window.innerHeight - 17) * 0.40}px`;
	//usertab.style.top = `${plain.offsetTop + (plain.offsetHeight / 2) - (usertab.offsetHeight / 2)}px`;
	//usertab.style.left = `${plain.offsetLeft + (plain.offsetWidth / 2) - (usertab.offsetWidth / 2)}px`;
});

function TargetSize(size) {
	targetShowcase.style.width = `${size}0px`;
	targetShowcase.style.height = `${size}0px`;
}

function TargetAmount(amount) {
	if (amount <= 0) {
		return;
	}
	const usertab = document.getElementById("UserTab");

	usertab.style.display = "none";
	targetShowcase.display = "none";

	for (var i = 0; i < amount; i++) {
		var TargetClass = new Target(targetSizeValue.value);
		TargetClass.ResetPosition();
		targetsArray.push(TargetClass);
	}

	plain.addEventListener("mousedown", () => { Shoot() });
}

function Shoot() {
	let currentShoots = parseInt(totalShoots.innerHTML);
	currentShoots++;
	totalShoots.innerHTML = currentShoots;

	AccuracyCalculation();
	MissShoots();
}

function ShootLand(CurrTarget) {
	event.stopPropagation();

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
	let currentShoots = parseInt(totalShoots.innerHTML);
	let currentScore = parseInt(score.innerHTML);

	missShoots.innerHTML = currentShoots - currentScore;
}

function AccuracyCalculation() {
	let currentShoots = parseInt(totalShoots.innerHTML);
	let currentScore = parseInt(score.innerHTML);

	if (currentShoots == 0) {
		return;
	}

	let acc = (currentScore / currentShoots) * 100;
	acc = Math.round(acc * 100) / 100;

	accuracy.innerHTML = acc + "%";
}

function CreaterTarget(size, show) {
	const targetdiv = document.createElement("div");

	if (show == true) {
		targetContainer.appendChild(targetdiv);
	}
	else {
		plain.appendChild(targetdiv);
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
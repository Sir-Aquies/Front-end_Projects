const ds = document.getElementById("DirectionSelector");
var Vx = Vy = 5;
divArray = [];
var dvdCounter = 1;

document.addEventListener("mousedown", function (e) {
	const timeOut = setTimeout(function () {
		const blackCircle = document.getElementById("BlackPit");
		ds.style.display = "flex";

		ds.style.left = `${parseInt(e.clientX) - (ds.clientWidth / 2)}px`;
		ds.style.top = `${parseInt(e.clientY) - (ds.clientHeight / 2)}px`;

		blackCircle.style.display = "block";
		blackCircle.style.left = `${parseInt(e.clientX) - (blackCircle.clientWidth / 2)}px`;
		blackCircle.style.top = `${parseInt(e.clientY) - (blackCircle.clientHeight / 2)}px`;
	}, 300);

	ds.stop = timeOut;
});

document.addEventListener("mouseup", function (e) {
	clearTimeout(ds.stop);
	CreateDVD(e.clientX, e.clientY);
});

document.getElementById("upperLeft").addEventListener("mouseup", function (e) {
	event.stopPropagation();
	CreateDVD(e.clientX, e.clientY, -Vx, -Vy);
});

document.getElementById("upperCenter").addEventListener("mouseup", function (e) {
	event.stopPropagation();
	CreateDVD(e.clientX, e.clientY, 0, -Vy);
});

document.getElementById("upperRight").addEventListener("mouseup", function (e) {
	event.stopPropagation();
	CreateDVD(e.clientX, e.clientY, Vx, -Vy);
});

document.getElementById("middleLeft").addEventListener("mouseup", function (e) {
	event.stopPropagation();
	CreateDVD(e.clientX, e.clientY, -Vx, 0);
});

document.getElementById("middleRight").addEventListener("mouseup", function (e) {
	event.stopPropagation();
	CreateDVD(e.clientX, e.clientY, Vx, 0);
});

document.getElementById("lowerLeft").addEventListener("mouseup", function (e) {
	event.stopPropagation();
	CreateDVD(e.clientX, e.clientY, -Vx, Vy);
});

document.getElementById("lowerCenter").addEventListener("mouseup", function (e) {
	event.stopPropagation();
	CreateDVD(e.clientX, e.clientY, 0, Vy);
});

document.getElementById("lowerRight").addEventListener("mouseup", function (e) {
	event.stopPropagation();
	CreateDVD(e.clientX, e.clientY, Vx, Vy);
});

function CreateDVD(posx, posy, Dx, Dy) {
	const div = document.createElement("div");
	div.className = "mask1 RainbowDVD";
	div.id = `DVD${dvdCounter++}`;
	div.lastCollide = "";
	document.body.appendChild(div);
	divArray.push(div);

	//stop the main event so that a div cannot be spawn on top of another div.
	div.addEventListener("click", function () {
		event.stopPropagation();
	});

	div.addEventListener("mousedown", function () {
		event.stopPropagation();
	});

	div.addEventListener("mouseup", function () {
		event.stopPropagation();
	});

	if (Dx || Dy) {
		div.dx = Dx;
		div.dy = Dy;
	}
	else {
		//Ramdomize the initial direction
		var dxRng = Math.floor(Math.random() * 2);
		var dyRng = Math.floor(Math.random() * 2);

		if (dxRng == 0) {
			div.dx = -Vx;
		}
		else {
			div.dx = Vx;
		}
		if (dyRng == 0) {
			div.dy = -Vy;
		}
		else {
			div.dy = Vy;
		}
	}

	//Set the initial position base on the mouse click position
	div.style.left = `${ parseInt(posx) - (div.clientWidth / 2) }px`;
	div.style.top = `${ parseInt(posy) - (div.clientHeight / 2) }px`;

	//The function that makes the div bounce
	div.bounce = setInterval(function () {
		let collided = false;
		for (const div2 of divArray) {
			if (div.id === div2.lastCollide) {
				collided = true;
				continue;
			}
			if (div !== div2 && div.lastCollide !== div2.id) {
				if (Collide(div, div2)) {
					CollideHandler(div, div2);
					div.lastCollide = div2.id;
					div2.lastCollide = div.id;
					collided = true;
				}
			}
		}

		if (!collided) {
			div.lastCollide = "";
		}

		//Continuously change the position of the div.
		if (div.dx !== 0) {
			let x = parseInt(div.style.left);
			x += div.dx;
			div.style.left = `${x}px`;
		}
		
		if (div.dy !== 0) {
			let y = parseInt(div.style.top);
			y += div.dy;
			div.style.top = `${y}px`;
		}

		//Make sure the div dont leave of the screen.
		if (div.offsetLeft >= (window.innerWidth - div.clientWidth)) {
			div.dx = -Vx;
		}

		if (div.offsetLeft <= 0) {
			div.dx = Vx;
		}

		if (div.offsetTop >= (window.innerHeight - div.clientHeight)) {
			div.dy = -Vy;
		}

		if (div.offsetTop <= 0) {
			div.dy = Vy;
		}

	}, 30);

	document.getElementById("DirectionSelector").style.display = "none";
	document.getElementById("BlackPit").style.display = "none";
};

function CollideHandler(el1, el2) {
	if (el1.dx === -el2.dx) {
		el1.dx = -el1.dx;
		el2.dx = -el2.dx;
	}
	else if (el2.dx !== el1.dx && el1.dx === 0) {
		el1.dx = el2.dx;
		el2.dx = -el2.dx;
	}
	else if (el1.dx === el2.dx) {
		el1.dx = -el1.dx;
	}

	if (el1.dy === -el2.dy) {
		el1.dy = -el1.dy;
		el2.dy = -el2.dy;
	}
	else if (el2.dy !== el1.dy && el1.dy === 0) {
		el1.dy = el2.dy;
		el2.dy = -el2.dy;
	}
	else if (el1.dy === el2.dy) {
		el1.dy = -el1.dy;
	}
}

function Collide(el1, el2) {
	el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
	el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
	el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
	el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

	return !((el1.offsetBottom < el2.offsetTop) ||
		(el1.offsetTop > el2.offsetBottom) ||
		(el1.offsetRight < el2.offsetLeft) ||
		(el1.offsetLeft > el2.offsetRight))
};

//Ramdomize the initial position
	//let xRng = Math.floor(Math.random() * (screen.width - 200));
	//let yRng = Math.floor(Math.random() * (screen.height - 200));
	//div.style.left = `${xRng}px`;
	//div.style.top = `${yRng}px`;
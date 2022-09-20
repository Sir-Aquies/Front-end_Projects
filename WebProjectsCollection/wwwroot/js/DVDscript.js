var id = 0;
const divArray = [];

document.addEventListener("click", function (e) {
	CreateDVD(e.clientX, e.clientY);
});

function CreateDVD(posx, posy) {
	const div = document.createElement("div");
	div.className = "mask1 RainbowDVD";
	div.id = `Div${id++}`;
	div.lastCollide = null;
	document.body.appendChild(div);
	divArray.push(div);
	vx = 2;
	vy = 2;

	div.addEventListener("click", function () {
		event.stopPropagation();
    });

	//Ramdomize the initial direction
	var dxRng = Math.floor(Math.random() * 2);
	var dyRng = Math.floor(Math.random() * 2);

	if (dxRng == 0) {
		div.dx = -vx;
	}
	else {
		div.dx = vx;
	}
	if (dyRng == 0) {
		div.dy = -vy;
	}
	else {
		div.dy = vy;
	}

	//Set the initial position base on the mouse click position
	div.style.left = `${ parseInt(posx) - (div.clientWidth / 2) }px`;
	div.style.top = `${ parseInt(posy) - (div.clientHeight / 2) }px`;

	//Ramdomize the initial position
	//let xRng = Math.floor(Math.random() * (screen.width - 200));
	//let yRng = Math.floor(Math.random() * (screen.height - 200));
	//div.style.left = `${xRng}px`;
	//div.style.top = `${yRng}px`;

	//The function that makes the div bounce
	div.bounce = setInterval(function () {
		for (const x of divArray) {
			if (div !== x && div.lastCollide != x) {
				if (Collide(div, x)) {
					if ((div.dy !== x.dy) && div.dx === x.dx) {
						div.dy = -div.dy;
						x.dy = -x.dy;

						div.lastCollide = x;
						continue;
					}

					if ((div.dy !== x.dy) && div.dx !== x.dx) {
						div.dy = -div.dy;
						x.dy = -x.dy;
						div.dx = -div.dx;
						x.dx = -x.dx;

						div.lastCollide = x;
						continue;
					}

					if ((div.dy === x.dy) && div.dx === x.dx) {
						div.dx = -div.dx;
						x.dy = -x.dy;
						x.dx = -x.dx;

						div.lastCollide = x;
						continue;
					}

					if ((div.dy === x.dy) && div.dx !== x.dx) {
						div.dx = -div.dx;
						x.dx = -x.dx;

						div.lastCollide = x;
						continue;
					}
				}
			}
		}
		div.lastCollide = null;

		let x = parseInt(div.style.left);
		x += div.dx;
		div.style.left = `${x}px`;

		let y = parseInt(div.style.top);
		y += div.dy;
		div.style.top = `${y}px`;

		if (x >= (window.innerWidth - div.clientWidth)) {
			div.dx = -div.dx;
		}

		if (x <= 0) {
			div.dx = -div.dx;
		}

		if (y >= (window.innerHeight - div.clientHeight)) {
			div.dy = -div.dy;
		}

		if (y <= 0) {
			div.dy = -div.dy;
		}

	}, 10);
};

//if ((div.offsetLeft + div.offsetWidth) > x.offsetLeft || div.offsetLeft < (x.offsetLeft + x.offsetWidth)) {
//	div.dx = -div.dx;
//	div.lastCollide = x;
//}

//if ((div.offsetTop + div.offsetHeight) > x.offsetTop || div.offsetTop < (x.offsetTop + x.offsetHeight)) {
//	div.dy = -div.dy;
//	div.lastCollide = x;
//}

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
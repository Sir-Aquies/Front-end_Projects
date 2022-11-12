const elms = new Set();
var id = 0;

//TODO - have an idea of what to do with this project, the execution is ok but the lacks the idea itself.
document.addEventListener("mousedown", function (e) {
	const div = DrawDiv(e);

	document.onmouseup = function () {
		for (const div2 of elms) {
			Gravity(div2);
		}
		document.onmousemove = function () { };
		document.onmouseup = function () { };
	}; 

	document.onmousemove = function (e) {
		SizeDiv(e, div);
	};
});

function DrawDiv(e) {
	const div = document.createElement("div");
	div.className = "cube";
	let R = Math.floor(Math.random() * 256);
	let G = Math.floor(Math.random() * 256);
	let B = Math.floor(Math.random() * 256);
	div.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
	div.id = `Div${id++}`;
	div.style.left = e.clientX + "px";
	div.style.top = e.clientY + "px";
	div.Xi = e.clientX;
	div.Yi = e.clientY;
	div.falling = false;
	div.grounded = false;
	div.bouncing = false;
	div.Dt = 0;

	div.ondragstart = function (e) {
		e.preventDefault()
	};

	div.onmousedown = DragDiv;

	div.onmouseup = function (e) {
		this.style.cursor = "grab";
		document.onmousemove = function () { };
		this.Fx = e.clientX;
		this.Fy = e.clientY;
		Throwing(this);

		for (const div2 of elms) {
			Gravity(div2);
		}
	}

	div.ondblclick = function () {
		elms.delete(div);
		div.remove();
		for (const div2 of elms) {
			Gravity(div2);
		}
	};

	elms.add(div);
	document.body.appendChild(div);

	return div;
}

function DragDiv(e) {
	e.stopPropagation();
	const div = this;
	this.style.cursor = "grabbing";
	this.grabX = this.offsetLeft - e.clientX;
	this.grabY = this.offsetTop - e.clientY;
	this.Ix = e.clientX;
	this.Iy = e.clientY;
	this.Dt = 0;
	this.Reset = 0;
	var setTimer = false;
	var pause = true;

	if (this.stopG) {
		clearInterval(this.stopG);
	}
	if (this.Reset) {
		clearTimeout(this.Reset);
	}
	if (this.timer) {
		clearInterval(this.timer);
	}
	if (this.throw) {
		clearInterval(this.throw);
	}

	this.timer = setInterval(function () {
		if (!pause) {
			div.Dt = div.Dt + 0.4;
		}
	}, 100);

	for (const div2 of elms) {
		if (!div2.grounded) {
			div2.falling = true;
		}
	}

	for (const div2 of elms) {
		if (this.id !== div2.id) {
			Gravity(div2, this);
		}
	}

	document.onmousemove = function (e) {
		div.style.left = (div.grabX + e.clientX) + "px";
		div.style.top = (div.grabY + e.clientY) + "px";

		pause = false;

		if (setTimer) {
			clearTimeout(div.Reset);
			setTimer = false;
		}

		if (!setTimer) {
			div.Reset = setTimeout(function () {
				div.Ix = e.clientX;
				div.Iy = e.clientY;
				div.Dt = 0;
				pause = true;
				setTimer = true;
			}, 50);

			setTimer = true;
		}
	};
}

function Throwing(div) {
	clearTimeout(div.Reset);
	clearInterval(div.timer);
	clearInterval(div.throw);

	const stopSpeed = 1;
	const dx = div.Fx - div.Ix;
	const dy = div.Fy - div.Iy;

	div.bouncing = true;
	div.Vx = Math.floor(dx / div.Dt);
	div.Vy = Math.floor(dy / div.Dt);

	div.throw = setInterval(function () {
		var vx = Math.floor(div.Vx * (5 / 100));
		var vy = Math.floor(div.Vy * (5 / 100));

		div.Vx -= vx;
		div.Vy -= vy;

		div.style.left = (div.offsetLeft + vx) + "px";
		div.style.top = (div.offsetTop + vy) + "px";

		if (div.Vx > 0) {
			if (vx < stopSpeed) {
				div.Vx = 0;
			}
		}
		else if (div.Vx < 0) {
			if (vx > -stopSpeed) {
				div.Vx = 0;
			}
		}

		if (div.Vy < 0) {
			if (vy > -stopSpeed) {
				div.Vy = 0;
			}
		}
		else if (div.Vy > 0){
			if (vy < stopSpeed) {
				div.Vy = 0;
			}
		}

		BounceWall(div);

		if (div.Vy === 0 && div.Vx === 0) {
			clearInterval(div.throw);
			div.bouncing = false;
			//Gravity(div);
		}
	}, 10)
}

function BounceWall(div) {
	if (div.offsetLeft < 0) {
		div.Vx = -div.Vx;
	}

	if (div.offsetLeft + div.offsetWidth > window.innerWidth) {
		div.Vx = -div.Vx;
	}

	if (div.offsetTop < 0) {
		div.Vy = -div.Vy;
	}

	if (div.offsetTop + div.offsetHeight > window.innerHeight) {
		div.Vy = -div.Vy;
	}
}

function Gravity(div, ignoreDiv) {
	const g = 10;

	div.stopG = setInterval(function () {
		div.style.top = (div.offsetTop + g) + "px";
		div.falling = true;

		for (const div2 of elms) {
			if (ignoreDiv) {
				if (ignoreDiv.id === div2.id) {
					continue;
				}
			}

			if (div.id !== div2.id) {
				if (Collide(div, div2)) {
					if (!div2.falling) {
						div.style.top = (div2.offsetTop - div.offsetHeight - 1) + "px";
						clearTimeout(div.Reset);
						clearInterval(div.timer);
						if (!div.bouncing) {
							clearInterval(div.stopG);
						}
						div.falling = false;
					}
				}
			}
		}

		if (div.offsetTop + div.offsetHeight > window.innerHeight) {
			div.style.top = (window.innerHeight - div.offsetHeight) + "px";
			div.falling = false;
			div.grounded = true;
			clearTimeout(div.Reset);
			clearInterval(div.timer);
			if (!div.bouncing) {
				clearInterval(div.stopG);
			}
		}
	}, 10)
}

function SizeDiv(e, div) {
	let x = parseInt(div.style.left);
	let y = parseInt(div.style.top);

	let nanX = isNaN(x);
	let nanY = isNaN(y);

	if (nanX) {
		x = parseInt(div.offsetLeft + div.offsetWidth);
	}

	if (nanY) {
		y = parseInt(div.offsetTop + div.offsetHeight);
	}

	let dx = 0, dy = 0;

	if (e.clientX > x) {
		if (nanX) {
			div.style.left = div.Xi + "px";
			div.style.right = "initial";
		}
		dx = Math.abs(x - e.clientX);
	}
	else if (e.clientX < x) {
		div.style.right = (window.innerWidth - div.Xi) + "px";
		div.style.left = "initial";
		dx = Math.abs(x - e.clientX);
	}

	if (e.clientY > y) {
		if (nanY) {
			div.style.top = div.Yi + "px";
			div.style.bottom = "initial";
		}
		dy = Math.abs(y - e.clientY);
	}
	else if (e.clientY < y) {
		div.style.bottom = (window.innerHeight - div.Yi) + "px";
		div.style.top = "initial";

		dy = Math.abs(y - e.clientY);
	}

	div.style.width = dx + "px";
	div.style.height = dy + "px";
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

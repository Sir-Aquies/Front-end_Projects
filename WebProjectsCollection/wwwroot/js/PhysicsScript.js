const elms = new Set();
var id = 0;
document.addEventListener("mousedown", function (e) {
	const div = DrawDiv(e);

	document.onmouseup = function () {
		div.gravity(div);
		document.onmousemove = null;
		document.onmouseup = null;
	};

	document.onmousemove = function (e) {
		SizeDiv(e, div);
	};
});

function DrawDiv(e) {
	const div = document.createElement("div");
	div.className = "cube";
	div.id = `Div${id++}`;
	div.style.left = e.clientX + "px";
	div.style.top = e.clientY + "px";
	div.Xi = e.clientX;
	div.Yi = e.clientY;

	div.gravity = function () {
		Gravity(div);
	};

	div.onmouseover = function () {
		this.style.cursor = "grab";
	};

	div.onmousedown = function (e) {
		event.stopPropagation();
		clearInterval(div.stop);
		this.style.cursor = "grabbing";
		this.grabX = this.offsetLeft - e.clientX;
		this.grabY = this.offsetTop - e.clientY;

		document.onmousemove = function (e) {
			div.style.left = (div.grabX + e.clientX) + "px";
			div.style.top = (div.grabY + e.clientY) + "px";
		};
	};

	div.onmouseup = function () {
		this.style.cursor = "grab";
		document.onmousemove = null;
	}

	div.onmouseup = function () {
		for (const div2 of elms) {
			div2.gravity(div2);
		}
		document.onmousemove = null;
	};

	div.ondragstart = function (event) {
		event.preventDefault();
	};

	div.ondblclick = function () {
		elms.delete(div);
		div.remove();
	};

	elms.add(div);
	document.body.appendChild(div);

	return div;
}

function Gravity(div) {
	const g = 10;

	div.stop = setInterval(function() {
		div.style.top = (div.offsetTop + g) + "px";

		for (const div2 of elms) {
			if (Collide(div, div2) && div.id !== div2.id) {
				div.style.top = (div2.offsetTop - div.offsetHeight) + "px";
				clearInterval(div.stop);
			}
		}

		if (div.offsetTop + div.offsetHeight > window.innerHeight) {
			div.style.top = (window.innerHeight - div.offsetHeight) + "px";
			clearInterval(div.stop);
		}
	}, 10)
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
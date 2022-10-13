document.addEventListener("mousedown", function (e) {
    const div = DrawDiv(e);
	
    document.addEventListener("mousemove", function (e) {
		SizeDiv(e, div);
    });
});

function DrawDiv(e) {
    const div = document.createElement("div");
    div.className = "cube";
    div.style.left = e.ClientX + "px";
    div.style.top = e.ClientY + "px"
    document.appendChild(div);
    return div;
}

function SizeDiv(e, div) {
	let x = parseInt(div.style.left);
	let y = parseInt(div.style.top);

	let dx = x - e.ClientX;
	let dy = y - e.ClientY;

	div.style.width = dx + "px";
	div.style.height = dy + "px";
}
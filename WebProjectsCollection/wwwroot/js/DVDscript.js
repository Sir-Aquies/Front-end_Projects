var id = 0;

function CreateDVD() {
    const div = document.createElement("div");
    div.className = "mask1 RainbowDVD";
    div.id = `Div${id++}`;
    document.body.appendChild(div);

    //Ramdomize the initial direction
    var dxRng = Math.floor(Math.random() * 2);
    var dyRng = Math.floor(Math.random() * 2);

    if (dxRng == 0) {
        div.dx = -1;
    }
    else {
        div.dx = 1;
    }
    if (dyRng == 0) {
        div.dy = -1;
    }
    else {
        div.dy = 1;
    }

    //Ramdomize the initial position
    let xRng = Math.floor(Math.random() * (screen.width - 200));
    let yRng = Math.floor(Math.random() * (screen.height - 200));
    div.style.left = `${xRng}px`;
    div.style.top = `${yRng}px`;

    //The function that makes the div bounce
    div.bounce = setInterval(function () {
        let x = parseInt(div.style.left);
        x += div.dx;
        div.style.left = `${x}px`;

        let y = parseInt(div.style.top);
        y += div.dy;
        div.style.top = `${y}px`;

        if (x >= (window.innerWidth - div.clientWidth)) {
            div.dx = -1;
        }

        if (x <= 0) {
            div.dx = 1;
        }

        if (y >= (window.innerHeight - div.clientHeight)) {
            div.dy = -1;
        }

        if (y <= 0) {
            div.dy = 1;
        }
    }, 1);
};
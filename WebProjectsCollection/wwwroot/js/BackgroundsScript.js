var rainDrops = [];
function Rain() {
    if (rainDrops.length === 0) {
        var _loop_1 = function (i) {
            var drop = document.createElement('div');
            drop.className = 'drop';
            drop.style.left = "".concat(Math.floor(Math.random() * window.innerWidth), "px");
            drop.style.top = "".concat(Math.floor(Math.random() * window.innerHeight), "px");
            rainDrops.push(drop);
            document.body.appendChild(drop);
            drop.fall = setInterval(function () {
                drop.style.top = "".concat(drop.offsetTop + 30, "px");
                if (drop.offsetTop > window.innerHeight) {
                    drop.style.top = '-7px';
                    drop.style.left = "".concat(Math.floor(Math.random() * window.innerWidth), "px");
                }
            }, 20);
        };
        for (var i = 0; i < 200; i++) {
            _loop_1(i);
        }
    }
}
function StopRain() {
    rainDrops.forEach(function (value) {
        clearInterval(value.fall);
        value.remove();
    });
    rainDrops.splice(0, rainDrops.length);
}
function RandomPattern() {
    var point = document.createElement('div');
    point.className = 'point';
    document.body.appendChild(point);
}
//# sourceMappingURL=BackgroundsScript.js.map
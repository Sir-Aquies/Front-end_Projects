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
function CreatePattern() {
    var container = document.getElementsByClassName('container')[0];
    var point = document.createElement('div');
    point.className = 'point';
    point.style.left = "".concat(Math.floor(Math.random() * container.offsetWidth), "px");
    /*point.style.left = `${0}px`;*/
    point.style.top = "".concat(Math.floor(Math.random() * container.offsetHeight), "px");
    /*point.style.top = `${0}px`;*/
    container.appendChild(point);
    var x = Math.floor(Math.random() * container.offsetWidth);
    var y = Math.floor(Math.random() * container.offsetHeight);
    var stop = setInterval(function () {
        var dx = 1;
        if (point.offsetLeft !== x) {
            if (x > point.offsetLeft) {
                point.style.left = "".concat(point.offsetLeft + dx, "px");
            }
            else {
                point.style.left = "".concat(point.offsetLeft - dx, "px");
            }
        }
        var dy = 1;
        if (point.offsetTop !== y) {
            if (point.offsetTop > y) {
                point.style.top = "".concat(point.offsetTop - dy, "px");
            }
            else {
                point.style.top = "".concat(point.offsetTop + dy, "px");
            }
        }
        if (point.offsetLeft === x && point.offsetTop === y) {
            clearInterval(stop);
        }
    }, 1);
}
var points = [];
function CreateTrailedPoint() {
    var point = document.createElement('div');
    var container = document.getElementsByClassName('container')[0];
    point.className = 'point2';
    point.style.left = "".concat(Math.floor(Math.random() * container.offsetWidth), "px");
    /*point.style.left = `${0}px`;*/
    point.style.top = "".concat(Math.floor(Math.random() * container.offsetHeight), "px");
    /*point.style.top = `${0}px`;*/
    container.appendChild(point);
    points.push(point);
    var time = 400;
    point.trail = setInterval(function () {
        var dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.backgroundColor = "rgb(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ")");
        //dot.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()})`;
        dot.style.left = "".concat(point.offsetLeft + (point.offsetWidth / 2), "px");
        dot.style.top = "".concat(point.offsetTop + (point.offsetHeight / 2), "px");
        container.appendChild(dot);
        setTimeout(function () {
            dot.remove();
        }, time);
        //setTimeout(() => {
        //    dot.style.width = '1px';
        //    dot.style.height = '1px';
        //    setTimeout(() => {
        //        dot.remove();
        //    }, time);
        //}, time);
    }, 1);
    point.stop = setInterval(function () {
        point.style.left = "".concat(Math.floor(Math.random() * container.offsetWidth), "px");
        point.style.top = "".concat(Math.floor(Math.random() * container.offsetHeight), "px");
    }, time);
}
function StopTrailedPoint() {
    points.forEach(function (value) {
        clearInterval(value.stop);
        clearInterval(value.trail);
        value.remove();
    });
    points.splice(0, points.length);
}
var sprinkles = [];
function Sprinkle() {
    var container = document.getElementsByClassName('container')[0];
    var _loop_2 = function (i) {
        var sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        sprinkles.push(sprinkle);
        sprinkle.style.backgroundColor = "rgb(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ")");
        //sprinkle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()}`;
        sprinkle.style.left = "".concat(Math.floor(Math.random() * container.offsetWidth), "px");
        sprinkle.style.top = "".concat(Math.floor(Math.random() * container.offsetHeight), "px");
        var max = 3000;
        var min = 100;
        var time = Math.floor(Math.random() * (max - min + 1)) + min;
        var blindTime = 3000;
        setTimeout(function () {
            setInterval(function () {
                //let size = Math.floor(Math.random() * 20);
                //sprinkle.style.width = `${size}px`;
                //sprinkle.style.height = `${size}px`;
                sprinkle.style.opacity = '1';
                sprinkle.style.left = "".concat(Math.floor(Math.random() * container.offsetWidth), "px");
                sprinkle.style.top = "".concat(Math.floor(Math.random() * container.offsetHeight), "px");
                setTimeout(function () {
                    //sprinkle.style.width = `${1}px`;
                    //sprinkle.style.height = `${1}px`;
                    sprinkle.style.opacity = '0';
                }, Math.round(blindTime / 2));
            }, blindTime);
            container.appendChild(sprinkle);
        }, time);
    };
    for (var i = 0; i < 500; i++) {
        _loop_2(i);
    }
}
function StopSprinkle() {
    sprinkles.forEach(function (value) { return value.remove(); });
    sprinkles.splice(0, sprinkles.length);
}
function Circle() {
    //(x - x0)^2 + (y - y0)^2 = r^2
    //(x - x0)^2 = r^2 - (y - y0)^2
    var r = 100;
    var h = 500;
    var k = 500;
    for (var i = (h - r); i <= (h + r); i += 1.5) {
        var position = X(i);
        var pixelPlus1 = CreatePixel();
        pixelPlus1.id = "positive".concat(i);
        pixelPlus1.style.left = "".concat(position.positive, "px");
        pixelPlus1.style.top = "".concat(i, "px");
        document.body.appendChild(pixelPlus1);
        var pixelPlus2 = CreatePixel();
        pixelPlus2.id = "positive".concat(i);
        pixelPlus2.style.left = "".concat(i, "px");
        pixelPlus2.style.top = "".concat(position.positive, "px");
        document.body.appendChild(pixelPlus2);
        var pixelMinus = CreatePixel();
        pixelMinus.id = "negative".concat(i);
        pixelMinus.style.left = "".concat(position.negative, "px");
        pixelMinus.style.top = "".concat(i, "px");
        document.body.appendChild(pixelMinus);
        var pixelMinus2 = CreatePixel();
        pixelMinus2.id = "negative".concat(i);
        pixelMinus2.style.left = "".concat(i, "px");
        pixelMinus2.style.top = "".concat(position.negative, "px");
        document.body.appendChild(pixelMinus2);
    }
    function X(y) {
        var output = {};
        var c = -Math.pow(r, 2) + Math.pow(y, 2) + Math.pow(h, 2) + Math.pow(k, 2) - 2 * (y * k);
        var b = -2 * h;
        var negative = (-b - Math.sqrt(Math.pow(b, 2) - (4 * c))) / 2;
        var positive = (-b + Math.sqrt(Math.pow(b, 2) - (4 * c))) / 2;
        output.negative = Math.round(negative);
        output.positive = Math.round(positive);
        return output;
    }
    function CreatePixel() {
        var pixel = document.createElement('div');
        pixel.className = 'pixel';
        return pixel;
    }
}
//# sourceMappingURL=BackgroundsScript.js.map
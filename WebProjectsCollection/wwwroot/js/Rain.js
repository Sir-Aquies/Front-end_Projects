var rainDrops = [];
var _loop_1 = function (i) {
    var drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = "".concat(Math.floor(Math.random() * window.innerWidth), "px");
    rainDrops.push(drop);
    document.body.appendChild(drop);
    //drop.style.top = `${window.innerHeight}px`;
    drop.fall = setInterval(function () {
        drop.style.top = "".concat(drop.offsetTop + 20, "px");
        if (drop.offsetTop > window.innerHeight) {
            drop.style.top = '-5px';
            drop.style.left = "".concat(Math.floor(Math.random() * window.innerWidth), "px");
        }
    }, 1);
};
for (var i = 0; i < 150; i++) {
    _loop_1(i);
}
//setInterval(function () {
//    for (let i = 0; i < rainDrops.length; i++) {
//        if (rainDrops[i].offsetTop >= window.innerHeight) {
//            rainDrops[i].style.top = '-5px';
//            rainDrops[i].style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
//        }
//    }
//}, 100)
//# sourceMappingURL=Rain.js.map
interface Idrop extends HTMLElement {
    fall?: number;
}

const rainDrops: Idrop[] = [];

for (let i = 0; i < 150; i++) {
    const drop: Idrop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
    rainDrops.push(drop);
    document.body.appendChild(drop);

    //drop.style.top = `${window.innerHeight}px`;

    drop.fall = setInterval(function() {
        drop.style.top = `${drop.offsetTop + 20}px`;

        if (drop.offsetTop > window.innerHeight) {
            drop.style.top = '-5px';
            drop.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
        }
    }, 1)
}

//setInterval(function () {
//    for (let i = 0; i < rainDrops.length; i++) {
//        if (rainDrops[i].offsetTop >= window.innerHeight) {
//            rainDrops[i].style.top = '-5px';
//            rainDrops[i].style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
//        }
//    }
//}, 100)
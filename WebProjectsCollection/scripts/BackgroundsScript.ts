interface Idrop extends HTMLElement {
    fall?: number;
}

const rainDrops: Idrop[] = [];

function Rain() {
    if (rainDrops.length === 0) {
        for (let i = 0; i < 200; i++) {
            const drop: Idrop = document.createElement('div');
            drop.className = 'drop';
            drop.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
            drop.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
            rainDrops.push(drop);
            document.body.appendChild(drop);

            drop.fall = setInterval(function () {
                drop.style.top = `${drop.offsetTop + 30}px`;

                if (drop.offsetTop > window.innerHeight) {
                    drop.style.top = '-7px';
                    drop.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
                }
            }, 20)
        }
    }
}

function StopRain() {
    rainDrops.forEach(value => {
        clearInterval(value.fall);
        value.remove();
    })
    rainDrops.splice(0, rainDrops.length)
}

function RandomPattern() {
    const point = document.createElement('div') as HTMLDivElement;
    point.className = 'point';
    document.body.appendChild(point);

}



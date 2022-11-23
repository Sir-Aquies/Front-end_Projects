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

function CreatePattern() {
    const container = document.getElementsByClassName('container')[0] as HTMLDivElement;
    const point = document.createElement('div') as HTMLDivElement;
    point.className = 'point';
    point.style.left = `${Math.floor(Math.random() * container.offsetWidth)}px`;
    /*point.style.left = `${0}px`;*/
    point.style.top = `${Math.floor(Math.random() * container.offsetHeight)}px`;
    /*point.style.top = `${0}px`;*/
    container.appendChild(point);

    let x = Math.floor(Math.random() * container.offsetWidth);
    let y = Math.floor(Math.random() * container.offsetHeight);

    let stop = setInterval(function () {
        let dx = 1;

        if (point.offsetLeft !== x) {
            if (x > point.offsetLeft) {
                point.style.left = `${point.offsetLeft + dx}px`;
            }
            else {
                point.style.left = `${point.offsetLeft - dx}px`;
            }
        }

        let dy = 1;
        
        if (point.offsetTop !== y) {
            if (point.offsetTop > y) {
                point.style.top = `${point.offsetTop - dy}px`;
            }
            else {
                point.style.top = `${point.offsetTop + dy}px`;
            }
        }

        if (point.offsetLeft === x && point.offsetTop === y) {
            clearInterval(stop);
        }
    }, 1);
}

interface Itrailed extends HTMLElement {
    stop?: number;
    trail?: number;
}

const points: Itrailed[] = [];

function CreateTrailedPoint() {
    const point = document.createElement('div') as Itrailed;
    const container = document.getElementsByClassName('container')[0] as HTMLDivElement;
    point.className = 'point2';
    point.style.left = `${Math.floor(Math.random() * container.offsetWidth)}px`;
    /*point.style.left = `${0}px`;*/
    point.style.top = `${Math.floor(Math.random() * container.offsetHeight)}px`;
    /*point.style.top = `${0}px`;*/
    container.appendChild(point);
    points.push(point);

    const time = 400;

    point.trail = setInterval(() => {
        const dot = document.createElement('div') as HTMLDivElement;
        dot.className = 'dot';
        dot.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        //dot.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()})`;
        dot.style.left = `${point.offsetLeft + (point.offsetWidth / 2)}px`;
        dot.style.top = `${point.offsetTop + (point.offsetHeight / 2) }px`;
        container.appendChild(dot);

        setTimeout(() => {
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

    point.stop = setInterval(() => {
        point.style.left = `${Math.floor(Math.random() * container.offsetWidth)}px`;
        point.style.top = `${Math.floor(Math.random() * container.offsetHeight)}px`;
    }, time);
}

function StopTrailedPoint() {
    points.forEach(value => {
        clearInterval(value.stop);
        clearInterval(value.trail);
        value.remove();
    })
    points.splice(0, points.length);
}

function Sprinkle() {
    const container = document.getElementsByClassName('container')[0] as HTMLDivElement;
    for (let i = 0; i < 500; i++) {
        const sprinkle = document.createElement('div') as HTMLDivElement;
        sprinkle.className = 'sprinkle';
        sprinkle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        //sprinkle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()}`;
        sprinkle.style.left = `${Math.floor(Math.random() * container.offsetWidth)}px`;
        sprinkle.style.top = `${Math.floor(Math.random() * container.offsetHeight)}px`;
        let max = 2000;
        let min = 1000;
        let time = Math.floor(Math.random() * (max - min + 1)) + min;

        setInterval(() => {
            //let size = Math.floor(Math.random() * 10);
            //sprinkle.style.width = `${size}px`;
            //sprinkle.style.height = `${size}px`;
            sprinkle.style.opacity = '1';

            sprinkle.style.left = `${Math.floor(Math.random() * container.offsetWidth)}px`;
            sprinkle.style.top = `${Math.floor(Math.random() * container.offsetHeight)}px`;
            setTimeout(() => {
                //sprinkle.style.width = `${1}px`;
                //sprinkle.style.height = `${1}px`;
                sprinkle.style.opacity = '0';
            }, Math.round(time / 2));

        }, time);
        container.appendChild(sprinkle);
    }
}

//TODO - create a cicle.
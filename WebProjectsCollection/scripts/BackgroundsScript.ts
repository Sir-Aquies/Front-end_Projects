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

const sprinkles: HTMLElement[] = [];

function Sprinkle() {
    const container = document.getElementsByClassName('container')[0] as HTMLDivElement;
    for (let i = 0; i < 500; i++) {
        const sprinkle = document.createElement('div') as HTMLDivElement;
        sprinkle.className = 'sprinkle';
        sprinkles.push(sprinkle);
        sprinkle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        //sprinkle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()}`;
        sprinkle.style.left = `${Math.floor(Math.random() * container.offsetWidth)}px`;
        sprinkle.style.top = `${Math.floor(Math.random() * container.offsetHeight)}px`;
        let max = 3000;
        let min = 100;
        let time = Math.floor(Math.random() * (max - min + 1)) + min;
        let blindTime = 3000;

        setTimeout(() => {
            setInterval(() => {
                //let size = Math.floor(Math.random() * 20);
                //sprinkle.style.width = `${size}px`;
                //sprinkle.style.height = `${size}px`;
                sprinkle.style.opacity = '1';

                sprinkle.style.left = `${Math.floor(Math.random() * container.offsetWidth)}px`;
                sprinkle.style.top = `${Math.floor(Math.random() * container.offsetHeight)}px`;
                setTimeout(() => {
                    //sprinkle.style.width = `${1}px`;
                    //sprinkle.style.height = `${1}px`;
                    sprinkle.style.opacity = '0';
                }, Math.round(blindTime / 2));

            }, blindTime);
            container.appendChild(sprinkle);
        }, time);
    }
}

function StopSprinkle() {
    sprinkles.forEach(value => value.remove());
    sprinkles.splice(0, sprinkles.length);
}

interface ICuadratic {
    positive?: number;
    negative?: number;
}

function Circle() {
    //(x - x0)^2 + (y - y0)^2 = r^2
    //(x - x0)^2 = r^2 - (y - y0)^2
    let r = 200;
    let h = 600;
    let k = 500;
    let r_2 = r * (55 / 100);

    let pixels: HTMLDivElement[] = [];

    for (let i = (k - r); i <= (k + r); i += 2) {
        const position: ICuadratic = X(i);

        const Plus = CreatePixel();
        Plus.id = `positive${i}`;
        Plus.style.left = `${position.positive}px`;
        Plus.style.top = `${i}px`;
        document.body.appendChild(Plus);

        const Minus = CreatePixel();
        Minus.id = `negative${i}`;
        Minus.style.left = `${position.negative}px`;
        Minus.style.top = `${i}px`;
        document.body.appendChild(Minus);

        pixels.push(Plus, Minus);

        if (i > (h - r_2) && i < (h + r_2)) {
            const pixelPlus2 = CreatePixel();
            pixelPlus2.id = `positive${i}`;
            pixelPlus2.style.left = `${i}px`;
            pixelPlus2.style.top = `${position.positive}px`;
            document.body.appendChild(pixelPlus2);

            const pixelMinus2 = CreatePixel();
            pixelMinus2.id = `negative${i}`;
            pixelMinus2.style.left = `${i}px`;
            pixelMinus2.style.top = `${position.negative}px`;
            document.body.appendChild(pixelMinus2);

            pixels.push(pixelMinus2, pixelPlus2);
        }
    }

    //for (let i = 0; i <= (r*2*Math.PI); i++) {
    //    let x = h + r * Math.cos(i);
    //    let y = k + r * Math.sin(i);

    //    const Plus = CreatePixel();
    //    Plus.id = `positive${i}`;
    //    Plus.style.left = `${x}px`;
    //    Plus.style.top = `${y}px`;
    //    document.body.appendChild(Plus);

    //    pixels.push(Plus);
    //}

    document.getElementById('demo').innerHTML = pixels.length.toString();

    //let index = 0;

    //let timer = setInterval(() => {
    //    const pixel = pixels[index];
    //    pixel.style.opacity = '1';

    //    setTimeout(() => {
    //        pixel.style.opacity = '0';
    //    }, 500);

    //    if (index == pixels.length) {
    //        //clearInterval(timer);
    //        index = 0;
    //    }

    //    index++;
    //}, 10)

    

    function X(y: number): ICuadratic {
        const output: ICuadratic = {};

        let c = -Math.pow(r, 2) + Math.pow(y, 2) + Math.pow(h, 2) + Math.pow(k, 2) - 2*(y * k);

        let b = -2 * h;

        let negative = (-b - Math.sqrt(Math.pow(b, 2) - (4 * c))) / 2;
        let positive = (-b + Math.sqrt(Math.pow(b, 2) - (4 * c))) / 2;

        output.negative = Math.round(negative);
        output.positive = Math.round(positive);

        return output;
    }

    function CreatePixel(): HTMLDivElement {
        const pixel = document.createElement('div') as HTMLDivElement;
        pixel.style.opacity = '1';
        pixel.className = 'pixel';
        return pixel;
    }
}

//for (let i = (h - r); i <= (h + r); i += 2) {
//    const position: ICuadratic = X(i);

//    if (i > (h - r_2) && i < (h + r_2)) {
//        const pixelMinus2 = CreatePixel();
//        pixelMinus2.id = `negative${i}`;
//        pixelMinus2.style.left = `${i}px`;
//        pixelMinus2.style.top = `${position.negative}px`;
//        document.body.appendChild(pixelMinus2);

//        pixels.push(pixelMinus2);
//    }
//}

//for (let i = (h - r); i <= (h + r); i+= 2) {
//    const position: ICuadratic = X(i);

//    const pixelPlus = CreatePixel();
//    pixelPlus.id = `positive${i}`;
//    pixelPlus.style.left = `${position.positive}px`;
//    pixelPlus.style.top = `${i}px`;
//    document.body.appendChild(pixelPlus);

//    pixels.push(pixelPlus);
//}

//const pixelsReversed: HTMLDivElement[] = [];

//for (let i = (h - r); i <= (h + r); i += 2) {
//    const position: ICuadratic = X(i);

//    const pixelMinus = CreatePixel();
//    pixelMinus.id = `negative${i}`;
//    pixelMinus.style.left = `${position.negative}px`;
//    pixelMinus.style.top = `${i}px`;
//    document.body.appendChild(pixelMinus);

//    pixelsReversed.push(pixelMinus);
//}

//for (let i = (h - r); i <= (h + r); i += 2) {
//    const position: ICuadratic = X(i);
//    if (i > (h - r_2) && i < (h + r_2)) {
//        const pixelPlus2 = CreatePixel();
//        pixelPlus2.id = `positive${i}`;
//        pixelPlus2.style.left = `${i}px`;
//        pixelPlus2.style.top = `${position.positive}px`;
//        document.body.appendChild(pixelPlus2);

//        pixelsReversed.push(pixelPlus2);
//    }
//}

//pixelsReversed.reverse();

//pixels = pixels.concat(pixelsReversed);
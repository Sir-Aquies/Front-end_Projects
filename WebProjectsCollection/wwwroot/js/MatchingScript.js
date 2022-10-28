function InputCheck(input) {
    var size = parseInt(input.value);
    var error = document.getElementById("error");
    if (size % 2 !== 0) {
        input.value = (size + 1).toString();
        error.innerHTML = "Size must be an even number";
        return false;
    }
    if (size <= 0) {
        input.value = "12";
        error.innerHTML = "Size can not be negative";
        return false;
    }
    if (size >= 1000 && size % 2 === 0) {
        error.innerHTML = "Start the game at your own risk";
        return true;
    }
    if (size % 2 === 0) {
        error.innerHTML = "";
        return true;
    }
    return false;
}
function StartGame() {
    var sizeInput = document.getElementById("size-input");
    if (InputCheck(sizeInput)) {
        var size = parseInt(sizeInput.value);
        var menu = document.getElementById("menu");
        var background = document.getElementById("background");
        var rightPanel = document.getElementById("right-panel");
        var sizeDisplay = document.getElementById("size-display");
        menu.style.display = "none";
        background.style.justifyContent = "left";
        background.style.alignItems = "initial";
        var RowsACols = CalculateRowsAndColumns(size);
        sizeDisplay.innerHTML = size.toString();
        rightPanel.style.display = "flex";
        var gamePanel = document.createElement("div");
        gamePanel.className = "game-panel";
        background.appendChild(gamePanel);
        CreateCards(RowsACols, gamePanel);
    }
}
var cards = [];
function CreateCards(RowsACols, panel) {
    for (var i_1 = 0; i_1 < RowsACols.rows; i_1++) {
        var row = document.createElement("div");
        row.className = "rows";
        for (var j = 0; j < RowsACols.columns; j++) {
            var column = document.createElement("div");
            column.className = "cards";
            cards.push(column);
            row.appendChild(column);
        }
        panel.appendChild(row);
    }
    var _loop_1 = function () {
        var card1 = cards[i];
        var card2 = cards[i + cards.length / 2];
        card1.secretId = i;
        card2.secretId = i;
        card1.complete = false;
        card2.complete = false;
        //card1.style.backgroundImage = `url(https://picsum.photos/${card1.offsetWidth}/${card1.offsetHeight}?random&secId=${card1.secretId})`;
        //card2.style.backgroundImage = card1.style.backgroundImage;
        card1.secretImage = "url(https://picsum.photos/".concat(card1.offsetWidth, "/").concat(card1.offsetHeight, "?random&secId=").concat(card1.secretId, ")");
        card2.secretImage = card1.secretImage;
        card1.onclick = function () {
            CompareCard(card1);
        };
        card2.onclick = function () {
            CompareCard(card2);
        };
    };
    for (var i = 0; i < cards.length / 2; i++) {
        _loop_1();
    }
}
var compare = [];
function CompareCard(card) {
    var moves = document.getElementById("total-moves");
    var finnishGame = false;
    card.style.backgroundImage = card.secretImage;
    compare.push(card);
    card.onclick = null;
    if (compare.length === 2) {
        var card1_1 = compare[0];
        var card2_1 = compare[1];
        if (card1_1.secretId === card2_1.secretId) {
            card1_1.complete = true;
            card2_1.complete = true;
            finnishGame = cards.every(function (value) {
                return value.complete === true;
            });
        }
        else {
            card1_1.onclick = function () {
                CompareCard(card1_1);
            };
            card2_1.onclick = function () {
                CompareCard(card2_1);
            };
            setTimeout(function () {
                card1_1.style.backgroundImage = "none";
                card2_1.style.backgroundImage = "none";
            }, 1000);
            moves.innerHTML = (parseInt(moves.innerHTML) + 1).toString();
        }
        compare.splice(0, compare.length);
        if (finnishGame) {
            CompleteGame();
        }
    }
}
function CompleteGame() {
    alert("congratulations");
}
function CalculateRowsAndColumns(size) {
    var divisors = [];
    if (size === 2) {
        return { rows: 1, columns: 2 };
    }
    for (var i = 2; i < size; i++) {
        if (size % i === 0) {
            divisors.push(i);
        }
    }
    var pairs = [];
    divisors.forEach(function (value, index, array) {
        for (var i = 0; i < array.length; i++) {
            if (value * array[i] === size) {
                if (value >= array[i]) {
                    var pair = { rows: value, columns: array[i] };
                    pairs.push(pair);
                }
            }
        }
    });
    var output = { rows: pairs[0].rows, columns: pairs[0].columns };
    pairs.forEach(function (value) {
        var average = (output.rows + output.columns) / 2;
        if (average > (value.rows + value.columns) / 2) {
            output = value;
        }
    });
    return output;
}
//# sourceMappingURL=MatchingScript.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
function GameCover(width) {
    var upperCover = document.getElementById("upper-cover");
    var lowerCover = document.getElementById("lower-cover");
    upperCover.style.height = width;
    lowerCover.style.height = width;
    return new Promise(function (resolve) {
        setTimeout(function () { resolve(true); }, 1000);
    });
}
function StartGame() {
    return __awaiter(this, void 0, void 0, function () {
        var sizeInput, size, game, background, sizeDisplay, RowsACols, gamePanel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sizeInput = document.getElementById("size-input");
                    if (!InputCheck(sizeInput)) return [3 /*break*/, 2];
                    size = parseInt(sizeInput.value);
                    document.getElementById("menu").style.display = "none";
                    return [4 /*yield*/, GameCover("50%")];
                case 1:
                    game = _a.sent();
                    background = document.getElementById("background");
                    sizeDisplay = document.getElementById("size-display");
                    background.style.justifyContent = "left";
                    background.style.alignItems = "initial";
                    RowsACols = CalculateRowsAndColumns(size);
                    sizeDisplay.innerHTML = size.toString();
                    document.getElementById("right-panel").style.display = "flex";
                    gamePanel = document.createElement("div");
                    gamePanel.className = "game-panel";
                    background.appendChild(gamePanel);
                    CreateCards(RowsACols, gamePanel);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
var cards = [];
function CreateCards(RowsACols, panel) {
    for (var i_1 = 0; i_1 < RowsACols.rows; i_1++) {
        var row = document.createElement("div");
        row.className = "rows";
        for (var j = 0; j < RowsACols.columns; j++) {
            var cover = document.createElement("div");
            var column = document.createElement("div");
            //TODO - animate card flipping here
            column.className = "cards";
            cover.className = "card-cover";
            column.cover = cover;
            column.appendChild(cover);
            cards.push(column);
            row.appendChild(column);
        }
        panel.appendChild(row);
    }
    shuffle(cards);
    var _loop_1 = function () {
        var card1 = cards[i];
        var card2 = cards[i + cards.length / 2];
        card1.secretId = i;
        card2.secretId = i;
        card1.complete = false;
        card2.complete = false;
        card1.style.backgroundImage = "url(https://picsum.photos/".concat(card1.offsetWidth, "/").concat(card1.offsetHeight, "?random&secId=").concat(crypto.randomUUID(), ")");
        card2.style.backgroundImage = card1.style.backgroundImage;
        if (i + 1 === cards.length / 2) {
            image = new Image();
            image.addEventListener("load", function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, GameCover("0")];
                            case 1:
                                _a.sent();
                                this.remove();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            image.src = "https://picsum.photos/".concat(card1.offsetWidth, "/").concat(card1.offsetHeight, "?random&secId=").concat(card1.secretId);
        }
        card1.onclick = function () {
            CompareCard(card1);
        };
        card2.onclick = function () {
            CompareCard(card2);
        };
    };
    var image;
    for (var i = 0; i < cards.length / 2; i++) {
        _loop_1();
    }
}
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
var compare = [];
function CompareCard(card) {
    var moves = document.getElementById("total-moves");
    var finnishGame = false;
    //card.style.backgroundImage = card.secretImage;
    card.cover.style.display = "none";
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
                card1_1.cover.style.display = "block";
                card2_1.cover.style.display = "block";
            }, 500);
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
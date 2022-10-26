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
    if (size > 1000 && size % 2 === 0) {
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
        //menu.style.display = "none";
        //background.style.justifyContent = "initial";
        //background.style.alignItems = "initial";
        var RaC = CalculateRowsAndColumns(size);
    }
}
function CalculateRowsAndColumns(size) {
    var divisors = [];
    for (var i = 2; i < size; i++) {
        if (size % i === 0) {
            divisors.push(i);
        }
    }
    var pairs = [];
    divisors.forEach(function (value, index, array) {
        for (var i_1 = 0; i_1 < array.length; i_1++) {
            if (value * array[i_1] === size) {
                if (value > array[i_1]) {
                    var pair = { rows: value, columns: array[i_1] };
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
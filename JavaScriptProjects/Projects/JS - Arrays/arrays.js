
function AddArrayItem(itemValue) {
    var arrayItem = document.createElement('div');
    var numInput = (typeof itemValue == 'undefined') ? '' : itemValue;
    //Note the use of tag name vs id - as we will have multiple of those!
    arrayItem.innerHTML = "<input type='number' value='" + numInput + "' name='arrayItems' />";
    var arrayItems = document.getElementById('arrayItems');
    arrayItems.appendChild(arrayItem);
}

//AddArrayInput();
AddArrayItem(34);
AddArrayItem(6);
AddArrayItem(5);
AddArrayItem(-4);

function GetArray() {
    var arrayInputs = document.getElementById('arrayItems').getElementsByTagName('input');
    //var array = document.querySelectorAll('#arrayItems input');
    console.log(arrayInputs);
    console.log(arrayInputs[0]);
    //Convert array to numbers
    var array = [];
    for (var i = 0; i < arrayInputs.length; i++) {
        array[i] = parseInt(arrayInputs[i].value);
        console.log(array[i]);
    }
    return array;
}

function ArrayToString(array) {
    var arrayToString = '';
    for (var i = 0; i < array.length; i++) {
        arrayToString += array[i] + ",";
    }
    return arrayToString;
}

function ArraySum() {
    var array = GetArray();
    var arraySum = 0;
    for (var i = 0; i < array.length; i++) {
        arraySum += array[i];
    }
    document.getElementById('arraySum').innerHTML = arraySum;
}

function ArrayAvg() {
    var array = GetArray();
    var arraySum = 0;
    for (var i = 0; i < array.length; i++) {
        arraySum += array[i];
    }
    document.getElementById('arrayAvg').innerHTML = arraySum / array.length;
}

function ArrayBiggestNum() {
    var array = GetArray();
    var bignumber = array[0];
    console.log(bignumber);
    for (var i = 1; i < array.length; i++) {
        if (bignumber < array[i]) {
            bignumber = array[i];
        }
    }
    document.getElementById('arrayBiggestNum').innerHTML = bignumber;
}

function ArrayRotate() {
    var array = GetArray();
    for (var i = 0; i < array.length / 2; i++) {
        var swap = array[i];
        array[i] = array[array.length - i - 1];
        array[array.length - i - 1] = swap;
    }
    document.getElementById("arrayRotate").innerHTML = ArrayToString(array);
}

function ArraySort() {
    //O{sqrN}
    var array = GetArray();
    for (var i = 0; i < array.length - 1; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                var swap = array[i];
                array[i] = array[j];
                array[j] = swap;
            }
        }
    }
    document.getElementById("arraySort").innerHTML = ArrayToString(array);
}

function ArrayShuffle() {
    var array = GetArray();
    for (var i = 0; i < array.length; i++) {
        var j = Math.floor(Math.random() * (array.length - i));
        var swap = array[j];
        array[j] = array[i];
        array[i] = swap;
    }
    document.getElementById("arrayShuffle").innerHTML = ArrayToString(array);
}

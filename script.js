function clean() {
    var clearing = ' ';
    var last_op = document.getElementById('last-operation');
    last_op.innerHTML = clearing;
    
    var result = document.getElementById('result-number');
    result.innerHTML = clearing;
}

function print(number) {
    var screen = document.getElementById('last-operation');
    screen.innerHTML += number;
}

function two() {
    var number = '2';
    var screen = document.getElementById('last-operation');
    screen.innerHTML += number;
}

function plus() {
    var sign = '+';
    var screen = document.getElementById('last-operation');
    screen.innerHTML += sign;
}

function equals() {
    
    var last_op = parseInt(document.getElementById("last-operation"));
    var screen = document.getElementById('result-number');
    screen.innerHTML = last_op.toString();
}

function home() {
    window.alert('Thiago Nebuloni ;)');
}
let number = 0;

function a() {
    number++;
    if (number > 9) return;
    console.log("hello");
}

while (number < 10) {
    console.log(number);
    a();
}

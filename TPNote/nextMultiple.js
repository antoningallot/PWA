let nextMultiple = function (n, m) {

    //code naif, on pourrait faire plus direct…

    while (n % m != 0) {
        n = n+1;
    }
    return n;
};


window.addEventListener("load", function () {

    let button = document.getElementById("button");
    let result = document.getElementById("result");
    let input1 = document.getElementById("n1");
    let input2 = document.getElementById("n2");

    button.addEventListener("click", function () {

        let n = nextMultiple(Number(input1.value), Number(input2.value));

        result.innerHTML = n;
    });
});

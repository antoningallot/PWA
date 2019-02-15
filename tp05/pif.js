let delay = function (f, t) {
    return new Promise( (success, failure) => {
            setTimeout(() => {
                try {
                    let result = f();
                    success(result);
                } catch(e) {
                    failure(e);
                }
            }, t);
        });
};

let call = async function () {
    await delay(logA, 2000);
    await delay(logB, 2000);
    await delay(logC, 2000);
    await delay(logD, 2000);
};

let logA = () => {console.log("A");};
let logB = () => {console.log("B");};
let logC = () => {console.log("C");};
let logD = () => {console.log("D");};

/*delay(logA, 2000).then(() => { 
    delay(logB, 2000).then(() => {
        delay(logC, 2000).then(() => {
            delay(logD, 2000);
        })
    })
});*/

call();
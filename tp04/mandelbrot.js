let Mandelbrot = {
    limit : 50,
    xmin : -2,
    xmax : 2,
    ymin : -2,
    ymax : 2,
};

let mouseX;
let mouseY;

/* Optis :
Dans Mandelbrot : ne pas tester la racine carrée > 2, tester norme carrée > 4
Dans draw : créer tableau avec chaines de caractères (couleur) en cache
*/

Mandelbrot.abs = function (x, y){
    return Math.sqrt(x*x+y*y);
}

Mandelbrot.inSet = function (cx, cy) {
    let i = 0;
    let znx = 0;
    let zny = 0;
    while (i < this.limit){
        let tmpznx = znx;
        znx = (znx*znx-zny*zny) + cx;
        zny = (2*tmpznx*zny) + cy;
        if(Mandelbrot.abs(znx, zny) > 2){
            return (Mandelbrot.limit - i)/Mandelbrot.limit;
        }
        i++;
    }
    return 0;
}

Mandelbrot.draw = function (){
    let canvas = document.getElementById("cvn");
    let context = canvas.getContext("2d");
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(mouseX - 400, mouseY - 300);
    for(let x = 0; x < canvas.width; x++){
        for(let y = 0; y < canvas.height; y++){
            let cx = (4*x/canvas.width)-2;
            let cy = -((4*y/canvas.height)-2);
            let t = Math.trunc(255*Mandelbrot.inSet(cx, cy));
            context.fillStyle = "rgb(" + t + "," + t + "," + t + ")";
            context.fillRect(x, y, 1, 1);
        }
    }
    context.restore();
}

let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");
canvas.addEventListener("click", function (ev){
        //console.log();
        mouseX = ev.clientX;
        mouseY = ev.clientY;
        Mandelbrot.draw();
});

//idée : mettre un zoomlevel en attribut qu'on modifie avec l'event, puis calculer le scale à partir de celui là
canvas.addEventListener("wheel", function (ev){
    //console.log();
    mouseX = ev.clientX;
    mouseY = ev.clientY;
    Mandelbrot.draw();
});
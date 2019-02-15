let init = function () {

    let wall1 = new Sprite(new Vector(0,0), 1000, 20, Infinity,
                             document.getElementById("wall1"));
    let wall2 = new Sprite(new Vector(0,580), 1000, 20, Infinity,
                             document.getElementById("wall2"));
    let wall3 = new Sprite(new Vector(0,20), 20, 560, Infinity,
                             document.getElementById("wall3"));
    let wall4 = new Sprite(new Vector(980,20), 20, 560, Infinity,
                             document.getElementById("wall4"));



    let engine = new Engine();
    /* ajouter les 4 murs au moteur */
    engine.addBody(wall1);
    engine.addBody(wall2);
    engine.addBody(wall3);
    engine.addBody(wall4);
    /* créer un renderer à partir du moteur et appeler sa
       methode update 60 fois par secondes
    */
    let renderer = new Renderer(engine);
    try {
        i = setInterval(function(){ renderer.update(1000/60); }, 1000/60);
    }
    catch(i){
        clearInterval(i);
        throw error;
    }

    let canvas = document.getElementById("canvas");

    canvas.addEventListener("click", function (ev) {
	if (this != ev.target) return;


	let x = ev.offsetX;
	let y = ev.offsetY;


	let div = document.createElement("div");
	div.className = "object";
	let sprite = new Sprite(new Vector(x,y), 30, 30, 3, div);
	sprite.force = new Vector(0.01,0.01);
	canvas.appendChild(div);
	engine.addBody(sprite);

	div.addEventListener("click", function (ev) {
		canvas.removeChild(div);
	    engine.removeBody(sprite);
	});



    });



};

window.addEventListener("load", init);

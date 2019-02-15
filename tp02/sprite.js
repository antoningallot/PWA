class Sprite extends Body{
    constructor(v, w, h, m, dom){
        super(v, w, h, m);
        this.display = dom;
    }

    draw(){
        this.display.style.left = (this.origin.x).toString() + "px";
        this.display.style.top = (this.origin.y).toString() + "px";
        this.display.style.width = (this.width).toString() + "px";
        this.display.style.height = (this.height).toString() + "px";
    }
}
class Rect{
    constructor(v, w, h){
        this.origin = v;
        Object.defineProperty(this, "width", {value : w, writable : false});
        Object.defineProperty(this, "height", {value : h, writable : false});
    }

    move(v){
        this.origin = this.origin.add(v);
    }

    mDiff(r){
        let v = new Vector(r.origin.x - this.origin.x - this.width, r.origin.y - this.origin.y - this.height);
        return new Rect(v, r.width + this.width, r.height + this.height);
    }

    hasOrigin(){
        return (this.origin.x < 0 && 
                this.origin.x + this.width > 0 && 
                this.origin.y < 0 && 
                this.origin.y + this.height > 0)
    }
}
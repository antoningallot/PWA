class Vector{
    
    constructor(x, y){
        Object.defineProperty(this, "x", {value : x, writable : false});
        Object.defineProperty(this, "y", {value : y, writable : false});
    }

    add(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mult(k){
        return new Vector(k*this.x, k*this.y);
    }

    dot(v){
        return this.x * v.x + this.y * v.y;
    }

    norm(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    normalize(){
        return this.mult(1/this.norm());
    }
}

Vector.ZERO = new Vector(0, 0);
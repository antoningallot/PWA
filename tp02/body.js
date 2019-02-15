class Body extends Rect {
    constructor(v, w, h, m){
        super(v, w, h);
        Object.defineProperty(this, "mass", {value : m, writable : true});
        Object.defineProperty(this, "invMass", {value : 1/m, writable : true});
        Object.defineProperty(this, "velocity", {value : Vector.ZERO, writable : true});
        Object.defineProperty(this, "force", {value : Vector.ZERO, writable : true});
    }

    collision(b){
        let s = this.mDiff(b);
        if(! s.hasOrigin() ) { return null; }
        let v1 = new Vector(s.origin.x, 0);
        let v2 = new Vector(s.origin.x+s.width, 0);
        let v3 = new Vector(0, s.origin.y);
        let v4 = new Vector(0, s.origin.y+s.height);
        let norm_n = Math.min(v1.norm(), v2.norm(), v3.norm(), v4.norm());
        let n = new Vector(0, 0);
        if (norm_n == v1.norm()) { n = v1; }
        else if (norm_n = v2.norm()) { n = v2; }
        else if (norm_n = v3.norm()) { n = v3; }
        else { n = v4; }

        let Nb = this.velocity.norm()/(b.velocity.norm() + this.velocity.norm());
        let Nc = b.velocity.norm()/(b.velocity.norm() + this.velocity.norm());
        if(this.velocity.norm() == 0){
            Nb = 0;
            Nc = 0;
        }
        else if (b.velocity.norm() == 0){
            Nc = 0;
            Nb = 0;
        }
        if (this.velocity.norm() == b.velocity.norm()){
            if (this.mass == Infinity && this.mass == Infinity) { return null; }
            else if (this.mass > b.mass) {
                Nb = 0;
                Nc = 1;
            }
            else {
                Nb = 1;
                Nc = 0;
            }
        }
        this.move(n.mult(-Nb));
        b.move(n.mult(Nc));
        n = n.normalize();
        let v = b.velocity.sub(this.velocity);
        let j = (-(1+1) * v.dot(n))/((1/b.mass) +(1/this.mass));
        let vb = (this.velocity.add(n)).mult(j/this.mass);
        let vc = (b.velocity.add(n)).mult(j/b.mass);
        return {vc, vb};
    }
}
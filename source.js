const FOV = 60;
class Source{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.dir = 0; 
        this.rays = [];
        for(let i=0; i<FOV; i++){
            this.rays.push(new Ray(this.pos, radians(i-FOV/2)));
        }
    }
    update(){
        if(keyIsDown(LEFT_ARROW)) {
            this.dir -= 0.05;
        }else if(keyIsDown(RIGHT_ARROW)){
            this.dir += 0.05;
        }
        if(keyIsDown(UP_ARROW)){
            let velocity = p5.Vector.fromAngle(this.dir);
            velocity.setMag(1);
            this.pos.add(velocity);
        }else if(keyIsDown(DOWN_ARROW)){
            let velocity = p5.Vector.fromAngle(this.dir);
            velocity.setMag(-1);
            this.pos.add(velocity);
        }

        for(let i=0; i<this.rays.length; i++){
            this.rays[i].setAngle(radians(i-FOV/2) + this.dir);
        }   
    }
    look(canvas, bounds){
        let scene = [];
        for(let ray of this.rays){
            let closest = null;
            let record = Infinity;
            for(let bound of bounds){
                let pt = ray.cast(bound);
                if(pt){
                    let distance = p5.Vector.dist(this.pos, pt);
                    if(distance < record){
                        record = distance;
                        closest = pt;
                    }
                } 
            }
            canvas.stroke(255,75);
            if(closest) canvas.line(this.pos.x, this.pos.y, closest.x, closest.y);
            scene.push(record);
        }
        return scene;
    }
    show(canvas){
        canvas.fill("red");  
        canvas.circle(this.pos.x, this.pos.y, 15);
    }
}
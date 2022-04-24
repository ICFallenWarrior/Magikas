const textCenterVertical = 0.8;
class Slot {
    constructor(width,height,x,y,slot) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.slot = slot;
    }

    draw() {
        fill(100,100,100);
        stroke(0,0,0);
        rect (this.x,this.y,this.width,this.height,5);
        if (this.slot) {
            let ratio = this.width;
            image(img,this.x+this.width/2,
                  this.y+this.height,
                 this.width*ratio);
            fill(0,0,0);
            textAlign(CENTER,CENTER);
            text(this.slot,this.x+this.width/2,this.y+this.height*textCenterVertical);
        }
    }
    setSlot(slot) { this.slot = slot; }
    getSlot() { return this.slot; }
    clicked(x,y) {
        return (x > this.x && x < (this.x+this.width) &&
            y > this.y && y < (this.y+this.height));
    }
}
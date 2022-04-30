
const imgCenterVertical = 0.4;
const imgRelWidth = 0.6;
const textCenterVertical = 0.8;
class Card {
    static cardImages = {};
    constructor(width,height,x,y,card) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.card = card;
    }
    static initImgs(imgHash) {
        Card.cardImages = imgHash;
    } 
    draw() {
        fill(100,100,100);
        stroke(0,0,0);
        rect (this.x,this.y,this.width,this.height,5);
        if (this.card) {
            imageMode(CENTER);
            let img = Card.cardImages[this.card];
            let ratio = (this.width*imgRelWidth)/img.width;
            image(img,this.x+this.width/2,
                  this.y+this.height*imgCenterVertical,
                 this.width*imgRelWidth,img.height*ratio);
            fill(0,0,0);
            textAlign(CENTER,CENTER);
            text(this.card,this.x+this.width/2,this.y+this.height*textCenterVertical);
        }
    }
    setCard(card) { this.card = card; }
    getCard() { return this.card; }
    
    clicked(x,y) {    
        return (x > this.x  && x < (this.x+this.width) && y > this.y && 3 < (this.y+this.height));
    }
}

class OpCard {
    static opcardImages = {};
    constructor(width,height,x,y,opcard) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.opcard = opcard;
    }
    static opinitImgs(opimgHash) {
        OpCard.opcardImages = opimgHash;
    } 
    opdraw() {
        fill(100,100,100);
        stroke(0,0,0);
        rect (this.x,this.y,this.width,this.height,5);
        if (this.opcard) {
            imageMode(CENTER);
            let img2 = OpCard.opcardImages[this.opcard];
            let ratio2 = (this.width*imgRelWidth)/img2.width;
            image(img2,this.x+this.width/2,
                  this.y+this.height*imgCenterVertical,
                 this.width*imgRelWidth,img2.height*ratio2);
            fill(0,0,0);
            textAlign(CENTER,CENTER);
            text(this.opcard,this.x+this.width/2,this.y+this.height*textCenterVertical);
        }
    }
    setOpCard(opcard) { this.opcard = opcard; }
    getOpCard() { return this.opcard; }
    
    Opclicked(x,y) {    
        return (x > this.x  && x < (this.x+this.width) && y > this.y && 3 < (this.y+this.height));
    }
}
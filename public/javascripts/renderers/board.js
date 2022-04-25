// spacing horizontally will be relative to card width and to width space
const spaceBetweenCards = 1;
const cardSpaceToBorder = 0.5;

// spacing on top and bottom are in pixels, since we need to place text there
const topSpace1 = 50;
const topSpace2 = 200;
const bottomSpace = 150;
const leftSpace = 315;
const rightSpace = 160;



const resultMsgTimeout = 3000;

// labels
const baseMsg = "Play your cards!";
const winMsg = "You won!";
const looseMsg = "You lost!";
const topcardLabel = "Card Slots";
const valuesLabel = "Choose a card to play";

// all sizes within Board are in percentages, this makes it easier to resize
class Board {
    constructor(width,height,x,y,cardSlots, playValues, opponentcardSlots, opponentplayValues) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.msg = baseMsg;
        this.cardWidth = this.width/12;
        this.cardHeight = this.height/3;

        this.roomCard = [];
        for(let pos in cardSlots){
            this.roomCard.push(new Slot(this.cardWidth,this.cardHeight,
                x+this.cardWidth*cardSpaceToBorder+this.cardWidth+
               this.cardWidth*spaceBetweenCards+pos*this.cardWidth - rightSpace,
                y+topSpace2,
                opponentcardSlots[pos]));
        }                     
        this.cardValues = [];
        for (let pos in playValues) {
            this.cardValues.push(new Card(this.cardWidth,this.cardHeight,
                                 x+this.cardWidth*cardSpaceToBorder+this.cardWidth+
                                 this.cardWidth*spaceBetweenCards+pos*this.cardWidth + leftSpace,
                                 y+topSpace2,
                                playValues[pos]));
        }
        this.opponentroomCard = [];
        for(let pos in opponentcardSlots){
            this.opponentroomCard.push(new Slot(this.cardWidth,this.cardHeight,
                x+this.cardWidth*cardSpaceToBorder+this.cardWidth+
               this.cardWidth*spaceBetweenCards+pos*this.cardWidth - rightSpace,
                y+topSpace1,
                opponentcardSlots[pos]));
        }
        this.opponentcardValues = [];
        for (let pos in opponentplayValues) {
            this.opponentcardValues.push(new Card(this.cardWidth,this.cardHeight,
                                 x+this.cardWidth*cardSpaceToBorder+this.cardWidth+
                                 this.cardWidth*spaceBetweenCards+pos*this.cardWidth + leftSpace,
                                 y+topSpace1,
                                opponentplayValues[pos]));
        }
    }
    draw() {
       /*  for (let slot of this.roomCard) {
            slot.draw();
        }*/
        for (let card of this.cardValues) {
            card.draw();
        }
       /* for(let slot of this.opponentroomCard){
            slot.draw();
        }*/
        for(let card of this.opponentcardValues){
            card.draw();
        }
        
        fill(0,0,0);
        textAlign(CENTER,CENTER);
        text(topcardLabel, this.x+this.cardWidth*cardSpaceToBorder+this.cardWidth/2, 
            this.y+topSpace1/2);
        text(valuesLabel, this.x+this.cardWidth*cardSpaceToBorder+
                this.cardWidth*spaceBetweenCards+this.cardWidth+
                (this.cardValues.length*this.cardWidth)/2, this.y+topSpace1/2);
        text(this.msg, this.x+this.width/2, this.y+this.height-bottomSpace/4);
    }

    valueClicked(x,y) {
        let slots = this.roomCard
        for (let card of this.cardValues)
            if (card.clicked(x,y)) return card.getCard();
        return false;
    }    
    roomCardClicked(x,y) {
        return this.roomCard.clicked(x,y);
    }
    setRoomCard(card) {
        this.roomCard.setCard(card);
            if (card.clicked(x,y)){
                card.x = slots[0].x;
            }
        return false;
    }

    opponentvalueClicked(x,y) {
        let opponentslots = this.opponentroomCard
        for (let card of this.opponentcardValues)
            if (card.clicked(x,y)){
                card.x = opponentslots[0].x;
            }
        return false;
    }
    resetMsg() { this.msg = baseMsg; }
    setResult(win) {
        if (win) this.msg = winMsg;
        else this.msg = looseMsg;
        let board = this;
        setTimeout(  ()=> { board.resetMsg() },
                    resultMsgTimeout);
    }
}
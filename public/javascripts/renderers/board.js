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
const topcardLabel = "Card Slot";
const valuesLabel = "Choose a card to play";

// all sizes within Board are in percentages, this makes it easier to resize
class Board {
    constructor(width,height,x,y,cardSlots,opponentcardSlots, playValues, opponentplayValues) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.msg = baseMsg;
        this.cardWidth = this.width/12;
        this.cardHeight = this.height/3;
        //TOPCARD / SLOTS
        /*this.roomCard = new Card(this.cardWidth,this.cardHeight,
            x+this.cardWidth*cardSpaceToBorder,
           this.height/3,
            topCard);*/
        this.roomCard = [];
        for(let pos in cardSlots){
            this.roomCard.push(new Card(this.cardWidth,this.cardHeight,
                                  x+this.cardWidth*cardSpaceToBorder+this.cardWidth+
                                 this.cardWidth*spaceBetweenCards+pos*this.cardWidth + leftSpace,
                                  y+topSpace2,
                                  cardSlots[pos]));
        }
        //REST OF THE CARDS playvalues and slots are in board manager                         
        this.cardValues = [];
        for (let pos in playValues) {
            this.cardValues.push(new Card(this.cardWidth,this.cardHeight,
                                 x+this.cardWidth*cardSpaceToBorder+this.cardWidth+
                                 this.cardWidth*spaceBetweenCards+pos*this.cardWidth + leftSpace,
                                 y+topSpace2,
                                playValues[pos]));
        }

        this.opponentcardValues = [];
        for (let pos in opponentplayValues) {
            this.opponentcardValues.push(new OpCard(this.cardWidth,this.cardHeight,
                                 x+this.cardWidth*cardSpaceToBorder+this.cardWidth+
                                 this.cardWidth*spaceBetweenCards+pos*this.cardWidth + leftSpace,
                                 y+topSpace1,
                                opponentplayValues[pos]));
        }
    }
    draw() {
        for (let slot of this.roomCard) {
            slot.draw();
        }
        for (let card of this.cardValues) {
            card.draw();
        }
        for(let slot of this.opponentroomCard){
            slot.draw();
        }
        for(let card of this.opponentcardValues){
            card.draw();
        }
        // text
        fill(0,0,0);
        textAlign(CENTER,CENTER);
        text(topcardLabel, this.x+this.cardWidth*cardSpaceToBorder+this.cardWidth/2, 
            this.height/6);
        text(valuesLabel, this.x+this.cardWidth*cardSpaceToBorder+
                this.cardWidth*spaceBetweenCards+this.cardWidth+
                (this.cardValues.length*this.cardWidth)/2, this.y+topSpace1/2);
        text(this.msg, this.x+this.width/2, this.y+this.height-bottomSpace/4);
    }

    valueClicked(x,y) {
        let slots = this.roomCard
        let slotindex = 0
        for (let card of this.cardValues)
            if (card.clicked(x,y)){
                card.x = slots[slotindex].x;
                slotindex++;
                console.log(slotindex);
            }
        return false;
    }

    opponentvalueClicked(x,y) {
        let opponentslots = this.opponentroomCard
        for (let opponentcard of this.opponentcardValues)
            if (opponentcard.clicked(x,y)){
                opponentcard.x = opponentslots[0].x;       
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
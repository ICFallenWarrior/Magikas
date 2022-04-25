var playValues=[];
var cardSlots=[];
var opponentplayValues=[];
var opponentcardSlots=[];

class BoardManager {
    
    constructor(width,height,x,y, room) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.room = room;
    }
    static async preloadImages() {
        let cardImgs = {}
        let cards = await getCards();
        let slots = await getSlots();
        for (let card of cards) {
            let playValue = card.crd_name;
            playValues.push(playValue);
            opponentplayValues.push(playValue);
            cardImgs[playValue] = loadImage('./assets/'+playValue+'.png');
        }
        Card.initImgs(cardImgs);
        for(let slot of slots){
            let slotnumber = slot.slot_id;
            cardSlots.push(slotnumber);
            opponentcardSlots.push(slotnumber);
        }
    }
    async initBoard() {
        let room = await getRoom(this.room);
        console.log(cardSlots)
        console.log(playValues)
        this.board = new Board(this.width,this.height,this.x,this.y,
                cardSlots, playValues, opponentcardSlots, opponentplayValues);   
    }
    draw() { 
        if (this.board) this.board.draw(); 
    }
    async refresh () {
        let room = await getRoom(this.room);
        this.board.setRoomCard(room.roo_topcard);
    }
    async play(value) {
        let result = await play(this.room, value);
        this.board.setResult(result.victory);
    }
    async click(x,y) {
        let value = this.board.valueClicked(x,y);
        if (value) this.play(value);
    }

    async opponentClick(x,y){ 
        let opponentvalue = this.board.opponentvalueClicked(x,y);
        if(opponentvalue) this.play(opponentvalue);
    }

    async updateTopCard(){
            if(this.roo_topcard!= current_topcard){
                this.refresh();
       }
    }
}
var playValues=[];
var cardSlots=[];
var opponentplayValues=[];

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
        for (let card of cards) {
            let playValue = card.crd_name;

            playValues.push(playValue);
            cardSlots.push(playValue);
            cardImgs[playValue] = loadImage('./assets/'+playValue+'.png');
        }
        Card.initImgs(cardImgs);

        console.log(cardImgs);
    }

    static async preloadOpImages() {
        let opcardImgs = {}
        let opcards = await getOpCards();
        for (let opcard of opcards) {
            
            let opponnetplayValue = opcard.crd_name;

            opponentplayValues.push(opponnetplayValue);
            opcardImgs[opponnetplayValue] = loadImage('./assets/'+opponnetplayValue+'.png');
        }
        OpCard.opinitImgs(opcardImgs);
        console.log(opcardImgs);
    }



    async initBoard() {
        let room = await getRoom(this.room);
        this.board = new Board(this.width,this.height,this.x,this.y,
                /*cardSlots*/room.roo_topcard, playValues, opponentplayValues);   
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
        this.board.setRoomCard(result.current_topcard);
    }
    async click(x,y) {
        if (this.board.roomCardClicked(x,y)) {
            this.refresh();
        } else {
            let value = this.board.valueClicked(x,y);
            if (value) this.play(value);
        }
    }
    async updateTopCard(){
            if(this.roo_topcard!= current_topcard){
                this.refresh()
       }
    }
}
const SWIDTH = 100;
const SHEIGHT = 120;

class Slot
{

    constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
    draw()
	{
		fill(0);
        rect(this.x, this.y, SWIDTH, SHEIGHT, 2);
		fill(255);
		textStyle(BOLD);
		textSize(12);
		textAlign(CENTER, CENTER);
		text("EMPTY SLOT", this.x + SWIDTH / 2, this.y + SHEIGHT / 2);
    }
}
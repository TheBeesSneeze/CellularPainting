
//draws full grid
function RenderGrid()
{
    //ask god for forgiveness:
    for (var x = 0; x < Width; x++) {
        for (var y = 0; y < Height; y++) {
            
            //(x/ppu)-(width/(2*ppu)

            DrawCell(x, y);
        }
    }
}

function DrawCell(x,y)
{
    var c = Grid[x][y];
    
    if (c != null)
    {
        var hex = c.Hex();

        if (hex == "#000000")
            return;

        CanvasCtx.beginPath();

        if (hex.length != 7)
            console.log(hex + ": " + x + " " + y);

        CanvasCtx.fillStyle = hex

        CanvasCtx.rect(x * ppu, y * ppu, ppu, ppu);
        CanvasCtx.fill();
    }
}

//
function EraseCanvas()
{
    CanvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

/*
function DrawBox(x, y) {
    var c = Grid[x][y];

    if (c != null) {
        //console.log(c);
        //console.log(c.Hex());
        CanvasCtx.beginPath();
        CanvasCtx.fillStyle = "red";

        CanvasCtx.rect(x * ppu, y * ppu, ppu, ppu);
        CanvasCtx.fill();
    }
}
*/
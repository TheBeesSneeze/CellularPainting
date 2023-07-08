//creates / resets the Grid
function CreateGrid()
{
    if (refreshIntervalId != null)
        clearInterval(refreshIntervalId);

    Grid = new Array(Width).fill(null).map(() => new Array(Height).fill(null));

    for (var x = 0; x < Width; x++)
    {
        for (var y = 0; y < Height; y++)
        {
            Grid[x][y] = Object.create(color);
            Grid[x][y].x = x;
            Grid[x][y].y = y;
        }
    }

    ColorQueues = [[]];

    for (var i = 0; i < BaseWormCount; i++)
    {
        ColorQueues.push([]);
    }
}

function NewHuegene(StartX, StartY)
{
    //initialization stuff
    HideUI();
    //FitCanvas();
    CreateGrid();

    NewCellAt(StartX, StartY,0);

    

    CreateHuegeneLoop();
}

//creates the timed loop which iterates through every cell.
//THIS FUNCTION IS NOT THE LOOP. ONLY CALL IT ONCE.
function CreateHuegeneLoop()
{
    var startTime = Date.now();
    var timeBetweenWorms = MillisecondsItTakesForWormsToAppear / BaseWormCount;
    var wormsPresent = 1;

    refreshIntervalId = setInterval(function () {

        //if (paused)
        //    break;

        //iterate through all active queues
        for (var i = 0; i < ColorQueues.length; i++) {

            //end when all queues are empty
            if (ColorQueues.length <= 0) {
                console.log("ITS OVER");
                clearInterval(refreshIntervalId);
                return;
            }

            //make rendering faster with more worms!!
            if (SplitColorQueues && ColorQueues[i].length > SplitColorQueuesAfter) {
                ColorQueues.push(ColorQueues[i].splice(SplitColorQueuesAfter / 2, SplitColorQueuesAfter / 2));
                Continue = true;
            }

            ProcessNextCell(i);

            //remove empty qs
            if (ColorQueues[i].length == 0) {
                ColorQueues.splice(i, 1);
            }
        }

        //start new queue if wormcount calls for it (and its been enough time)
        if (wormsPresent < BaseWormCount && Date.now() - startTime >= timeBetweenWorms) {
            console.log("new guy!");
            startTime = Date.now();

            NewRandomCell(wormsPresent);

            wormsPresent++;
        }

    }, 1);//run this thang every 0.001 seconds

    //really gotta clarify i didnt write 'thang' there. the example i found just had that and i HAD to include it
}

//returns false if this colorQueue is empty. true if its got stuff in it
function ProcessNextCell(QueueIndex)
{
    if (ColorQueues[QueueIndex].Length == 0)
        return false;

    var cell = DequeueNewCell(QueueIndex);
    if (cell != null) {
        HuegeneCell(cell.x, cell.y, QueueIndex);
        DrawCell(cell.x, cell.y);
    }
    

    return true;
}

function NewCellAt(x, y, QueueIndex)
{
    Grid[x][y] = GetRandomColor();
    var center = Grid[x][y];
    center.Queued = true;
    center.Assigned = true;
    center.x = x;
    center.y = y;

    ColorQueues.push([]);

    EnqueueNeighbors(x, y, QueueIndex);

    DrawCell(x, y);
}

function NewRandomCell(QueueIndex)
{
    var newX = 0;
    var newY = 0;

    //six strikes and youre out
    for (var i = 0; i < 6; i++) {
        newX = RandomInt(0, Width);
        newY = RandomInt(0, Height);

        var c = Grid[newX][newY]; //c is so cool here. what does it stand for? cell? color? well, here's a secret kid. i dont know either

        if (c == null)
            break;

        if (!c.Queued && !c.Assigned) {
            NewCellAt(newX, newY, QueueIndex);
            return;
        }
    }
    console.log("failed to find random spot completely");
}

function HuegeneCell(x, y, QueueIndex)
{
    var BaseColor; 

    if (BlendColors)
        BaseColor = GetAverageOfNeighbors(x,y);
    else
        BaseColor = GetRandomNeighbor(x, y);

    //console.log(colorNeighbor);
    if (BaseColor != null) {
        var n = BaseColor.GetRandomColorVariant(x, y);
        n.Queued = Grid[x][y].Queued;
        Grid[x][y] = n;

        EnqueueNeighbors(x, y,QueueIndex);
    }
    else
    {
        console.log("no neighbors!! try again");
        EnqueueCell(Cell.x, Cell.y, QueueIndex);
    }
}

//returns cell with average colors of all
function GetAverageOfNeighbors(x,y)
{
    var Neighbors = GetNeighbors(x, y);

    var r=0;
    var g=0;
    var b=0;

    var l = Neighbors.length;

    for (var i = 0; i < Neighbors.length; i++)
    {
        r += Neighbors[i].R;
        g += Neighbors[i].G;
        b += Neighbors[i].B;
    }

    var c = Object.create(color);
    c.R = Math.floor(r / l);
    c.G = Math.floor(g / l);
    c.B = Math.floor(b / l);

    c.Queued = true;

    return c;
}

//only returns neighbors with assigned colors
function GetRandomNeighbor(x,y)
{
    var Neighbors = GetNeighbors(x, y);

    return Neighbors[RandomInt(0, Neighbors.length)];
}

function GetNeighbors(x,y)
{
    var Neighbors = [];

    if (x + 1 < Width)
        if (Grid[x + 1][y].Assigned)
            Neighbors.push(Grid[x + 1][y]);

    if (x - 1 >= 0)
        if (Grid[x - 1][y].Assigned)
            Neighbors.push(Grid[x - 1][y]);

    if (y + 1 < Height)
        if (Grid[x][y + 1].Assigned)
            Neighbors.push(Grid[x][y + 1]);

    if (y - 1 >= 0)
        if (Grid[x][y - 1].Assigned)
            Neighbors.push(Grid[x][y - 1]);

    return Neighbors;
}

//attempts to enqueue every cell neighboring x, y
function EnqueueNeighbors(x,y, QueueIndex)
{
    EnqueueCell(x + 1, y, QueueIndex);
    EnqueueCell(x - 1, y, QueueIndex);
    EnqueueCell(x, y + 1, QueueIndex);
    EnqueueCell(x, y - 1, QueueIndex);
}

//attempts to enqueue cell at x,y
function EnqueueCell(x, y, QueueIndex)
{
    if (x >= Width || x < 0 || y >= Height || y < 0)
    {
        return;
    }

    var c = Grid[x][y];

    if (c.Queued)
        return;

    Grid[x][y].Queued = true;
    ColorQueues[QueueIndex].push(Grid[x][y]);
}

//randomly takes item from last 4 items in the list. does not make Queued = false.
function DequeueNewCell(QueueIndex) //but toby? doesnt that make it a stack? SHUT THE FUCK UP. ILL KILL YOU.  
{
    ColorQueue = ColorQueues[QueueIndex];

    var pathMode = PathModes[_pathModesIndex]

    //console.log(ColorQueue);
    if (ColorQueue.length == 0) {
        //completedDrawing = true;
        return null;
    }

    if (pathMode == "Worms")
    {
        var n = 4;
        if (ColorQueue.length < 4)
            n = ColorQueue.length;

        var o = ColorQueue.length - RandomInt(0, n) - 1;

        return ColorQueue.splice(o, 1)[0]; //WHY DOES IT BECOME AN ARRAY GRRR
    }

    else if (pathMode == "Even Spread")
        return ColorQueue.splice(0, 1)[0]; 

    else if (pathMode == "Burst")
        return ColorQueue.splice(RandomInt(0, ColorQueue.length - 1), 1)[0];

    else
        console.warn("pathmode " + pathmode +" is invalid!")
}

function FixGrid() {
    for (var x = 0; x < Width; x++) {
        for (var y = 0; y < Height; y++) {

            var c = Grid[x][y];

            if (!c.Queued || !c.Assigned) {
                HuegeneCell(x, y, 0);
            }
        }
    }
    console.log("fixed!");
}
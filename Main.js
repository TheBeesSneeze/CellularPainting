var ppu; //pixels per unit

var Width;// = Math.round(window.innerWidth / ppu);
var Height;// = Math.round(window.innerHeight / ppu);

//cool settings:
var BaseWormCount;
var RandomOffset;
var BlendColors; //alternative: choose random neighbor.
var PathModes = ["Worms", "Burst", "Even Spread" ]; //ordered from coolest to least coolest
var SplitColorQueues = false;

//boring settings
var SplitColorQueuesAfter = 30;
var MenuTransparency = 0.5;
 
//SECRET Settings!
var MillisecondsItTakesForWormsToAppear; //,aking long variable names is good practice actually

//variable variables
var refreshIntervalId;
var _pathModesIndex;
var paused = false;
var ShowingMenus = true;

//draw stuff
var Grid;
var ColorQueues=[[]];

//var completedDrawing = false;

var CanvasCtx = document.getElementById("canvas").getContext("2d");
//var OverlayCtx = document.getElementById("overlay").getContext("2d");

RandomizeSettings();
ResetUI();

//TODO: move this?
CanvasCtx.beginPath();
CanvasCtx.lineWidth =0;

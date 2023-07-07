var ppu = 15; //pixels per unit

var Width;// = Math.round(window.innerWidth / ppu);
var Height;// = Math.round(window.innerHeight / ppu);

//cool settings:
var BaseWormCount = 1;
var RandomOffset = 10;
var BlendColors = false; //alternative: choose random neighbor.
var PathModes = ["Newest", "Burst", "Oldest" ]; //ordered from coolest to least coolest

//boring settings:
var SplitColorQueues = false;
var SplitColorQueuesAfter = 30;

//variable variables
var refreshIntervalId;
var _pathModesIndex = 0;

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



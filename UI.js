window.addEventListener('resize', OnWindowResize);

var canvas = document.getElementById("canvas");
var info = document.getElementById("info");

var settings = document.getElementById("settings");
var menuBar = document.getElementById("menuBar");

var pixelSizeText = document.getElementById("pixelSizeText");
var pixelSizeSlide = document.getElementById("pixelSizeSlide");

var renderTypeButton = document.getElementById("renderTypeButton");

var wormText = document.getElementById("wormText");
var wormSlider = document.getElementById("wormSlider");

var blendColorDiv = document.getElementById("blendColorDiv");
var blendCheckBox = document.getElementById("blendCheckBox");

var colorVarianceText = document.getElementById("colorVarianceText");
var colorSlider = document.getElementById("colorSlider");

var fastRenderDiv = document.getElementById("fastRenderDiv");
var fastRenderBox = document.getElementById("fastRenderBox");

var randomizeButton = document.getElementById("randomizeButton");


var hexDisplay = document.getElementById("hexDisplay");


function ResetUI() {
    FitCanvas();

    //set settings
    UpdateSettingsMenu();

    FadeOpacity(settings, MenuTransparency, 0);
    FadeOpacity(menuBar, MenuTransparency, 0);
}

function UpdateSettingsMenu() {
    //weird pick bro?
    MillisecondsItTakesForWormsToAppear = (16 - ppu) * (1000/BaseWormCount);

    pixelSizeText.textContent = "Pixel Size: " + ppu + "px";
    pixelSizeSlide.value = ppu;

    renderTypeButton.textContent = "Render Type: " + PathModes[_pathModesIndex];

    wormText.textContent = "Simultaneous Thread Count: " + BaseWormCount;
    /*
    var v = Math.pow(1.585, 1 / BaseWormCount);
    v = Math.round(v);
    console.log(v);
    wormSlider.value = v;
    
    */
    colorVarianceText.textContent = "Color Variance: " + RandomOffset;
    //colorSlider.value = RandomOffset;

    blendCheckBox.checked = BlendColors;

    fastRenderBox.checked = SplitColorQueues;
}

function HideUI()
{
    ShowingMenus = false;

    MoveMenus(false);

    info.style.opacity = 0;
    settings.style.opacity = 0;
    menuBar.style.opacity = 0;
}

function FitCanvas() {
    if (window.innerWidth / ppu != Width) {
        Width = Math.round(window.innerWidth / ppu);
        canvas.width = window.innerWidth;
    }
    if (window.innerHeight / ppu != Height) {
        Height = Math.round(window.innerHeight / ppu);
        canvas.height = window.innerHeight;
    }

    CreateGrid();
}

//the cooler daniel:
function FadeOpacity(element, targetValue, seconds) {
    var temp = element.style.transitionDelay;
    element.style.transition = "opacity " + seconds+"s";
    element.style.opacity = targetValue;
    element.style.transition = temp;
}

//fades away ui element over a second
//didnt realize there was just a transition property in css...
function LerpUITransparency(element, targetValue, seconds)
{
    //console.log("fading...");

    if (Math.round(element.style.opacity) == targetValue) {
        return;
    }

    var startValue = element.style.opacity;
    var i = 0; // percent 0 -> 1

    var fadeInterval = setInterval(function ()
    {
        i += (0.01 / seconds);
        a = (startValue * (1-i)) + (targetValue * i);

        element.style.opacity = a; //omg we love roundoff errors

        //end interval
        if (i >= 1) {
            //console.log("element faded");
            clearInterval(fadeInterval);

            //info.style.display = "none";
            return;
        }

    }, seconds / 100);

}

function OnWindowResize() {
    FitCanvas();
    CreateGrid();
};


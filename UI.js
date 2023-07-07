var canvas = document.getElementById("canvas");
var info = document.getElementById("info");

var settings = document.getElementById("settings");

var wormText = document.getElementById("wormText");
var wormSlider = document.getElementById("wormSlider");

var blendColorDiv = document.getElementById("blendColorDiv");
var blendCheckBox = document.getElementById("blendCheckBox");

var colorVarianceText = document.getElementById("colorVarianceText");
var colorSlider = document.getElementById("colorSlider");

var fastRenderDiv = document.getElementById("fastRenderDiv");
var fastRenderBox = document.getElementById("fastRenderBox");

var randomizeButton = document.getElementById("randomizeButton");

function ResetUI() {
    FitCanvas();

    //set settings
    UpdateSettingsMenu();
       
}

function UpdateSettingsMenu() {
    

    wormText.textContent = "Thread Count: " + BaseWormCount;
    /*
    var v = Math.pow(1.585, 1 / BaseWormCount);
    v = Math.round(v);
    console.log(v);
    wormSlider.value = v;
    
    */
    colorVarianceText.textContent = "Color Variance: " + RandomOffset;
    colorSlider.value = RandomOffset;

    blendCheckBox.checked = BlendColors;

    fastRenderBox.checked = SplitColorQueues;
}

function HideUI()
{
    LerpUITransparency(info, 0, 1);
    LerpUITransparency(settings, 0, 2);
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
}


//fades away ui element over a second
function LerpUITransparency(element, targetValue, seconds)
{
    //console.log("fading...");

    if (element.style.opacity == targetValue) {
        return;
    }

    var startValue = element.style.opacity;
    var i = 0; // percent 0 -> 1

    var fadeInterval = setInterval(function ()
    {
        if (i >= 1) {
            console.log("element faded");
            clearInterval(fadeInterval);
            //info.style.display = "none";
            return;
        }

        i += (0.01 / seconds);
        a = (startValue * (1-i)) + (targetValue * i);

        element.style.opacity = a; //omg we love roundoff errors

    }, seconds / 100);
}
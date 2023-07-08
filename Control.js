var pressedKeys = {};

var mouseX;
var mouseY;

canvas.onmousemove = function clickEvent(e) {
    
    mouseX = e.clientX; //x position within the element.
    mouseY = e.clientY;  //y position within the element.

    //mouseX=((2*mouseX)-Width+(centerX*ppu))/(2*ppu);
    //mouseY=((2*mouseY)-Height+(centerY*ppu))/(2*ppu);

    mouseX = Math.floor(mouseX / ppu);
    mouseY = Math.floor(mouseY / ppu);
}

canvas.onclick = function clickEvent(e) 
{
    console.log("click at " + mouseX + " " + mouseY);

    //EraseCanvas();

    if (refreshIntervalId != null)
        clearInterval(refreshIntervalId);

    NewHuegene(mouseX,mouseY);
}

settings.onclick = function clickEvent(e) {
    UpdateSettingsMenu();
}

pixelSizeSlide.onclick = function clickEvent(e) {
    ppu = Number(pixelSizeSlide.value);
    //MillisecondsItTakesForWormsToAppear = (16 - ppu) * 1000;

    FitCanvas();
}

renderTypeButton.onclick = function clickEvent(e) {

    _pathModesIndex++;
    if (_pathModesIndex >= PathModes.length)
        _pathModesIndex = 0;

}

wormSlider.onclick = function clickEvent(e) {
    var i = Math.pow(1.585, wormSlider.value/100);
    i = Math.floor(i);
    BaseWormCount = i;
}

colorSlider.onclick = function clickEvent(e) {
    //RandomOffset = Number(colorSlider.value);

    var i = Math.pow(1.741, colorSlider.value / 100);
    i = Math.floor(i);
    RandomOffset = i;
}

blendColorDiv.onclick = function clickEvent(e) {

    BlendColors = blendCheckBox.checked;
}

fastRenderDiv.onclick = function clickEvent(e) {

    SplitColorQueues = fastRenderBox.checked;
}
randomizeButton.onclick = function clickEvent(e) {

    RandomizeSettings();
}

window.onkeyup = function (e) {
    pressedKeys[e.keyCode] = false;
}  

window.onkeydown = function (e) {
    pressedKeys[e.keyCode] = true;

    console.log("key: " + e.keyCode);

    if (pressedKeys[32]) //space
        OnSpaceDown();

    if (pressedKeys[27]) //esc
        OnEscDown();
}

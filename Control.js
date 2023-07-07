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

wormSlider.onclick = function clickEvent(e) {
    i = Math.pow(1.585, wormSlider.value/10);
    i = Math.floor(i);
    BaseWormCount = i;

    UpdateSettingsMenu();
}

colorSlider.onclick = function clickEvent(e) {
    RandomOffset = Number(colorSlider.value);

    UpdateSettingsMenu();
}

blendColorDiv.onclick = function clickEvent(e) {

    BlendColors = blendCheckBox.checked;
}

fastRenderDiv.onclick = function clickEvent(e) {

    SplitColorQueues = fastRenderBox.checked;
}
randomizeButton.onclick = function clickEvent(e) {

    RandomizeSettings();
    UpdateSettingsMenu();
}

window.onkeyup = function (e) {
    pressedKeys[e.keyCode] = false;
}  

window.onkeydown = function (e) {
    pressedKeys[e.keyCode] = true;

    if (pressedKeys[32]) //space
        OnSpaceDown();
}

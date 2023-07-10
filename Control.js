var pressedKeys = {};
var hoveringElements = {}; //isnt filled automatically like pressed keys. need function for everything

var mouseX;
var mouseY;

canvas.onmousemove = function clickEvent(e) {

    mouseX = e.clientX; //x position within the element.
    mouseY = e.clientY;  //y position within the element.

    mouseX = Math.floor(mouseX / ppu);
    mouseY = Math.floor(mouseY / ppu);

    DisplayHexColor(mouseX, mouseY);
};

canvas.onclick = function clickEvent(e) {
    console.log("click at " + mouseX + " " + mouseY);
    OnCanvasClick(e);
};

settings.onclick = function clickEvent(e) {
    UpdateSettingsMenu();
};

pixelSizeSlide.onclick = function clickEvent(e) {
    ppu = Number(pixelSizeSlide.value);
    //MillisecondsItTakesForWormsToAppear = (16 - ppu) * 1000;

    FitCanvas();

    if (refreshIntervalId != null) {
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
};

renderTypeButton.onclick = function clickEvent(e) {

    _pathModesIndex++;
    if (_pathModesIndex >= PathModes.length)
        _pathModesIndex = 0;

};

wormSlider.onclick = function clickEvent(e) {
    var i = Math.pow(1.585, wormSlider.value / 100);
    i = Math.floor(i);
    BaseWormCount = i;
};

colorSlider.onclick = function clickEvent(e) {
    //RandomOffset = Number(colorSlider.value);

    var i = Math.pow(1.741, colorSlider.value / 100);
    i = Math.floor(i);
    RandomOffset = i;
};

blendColorDiv.onclick = function clickEvent(e) {

    BlendColors = blendCheckBox.checked;
};

fastRenderDiv.onclick = function clickEvent(e) {

    SplitColorQueues = fastRenderBox.checked;
};
randomizeButton.onclick = function clickEvent(e) {

    RandomizeSettings();
};

window.onkeyup = function (e) {
    pressedKeys[e.keyCode] = false;
};

window.onkeydown = function (e) {
    pressedKeys[e.keyCode] = true;

    console.log("key: " + e.keyCode);

    if (pressedKeys[27]) //esc
        OnEscDown();

    if (pressedKeys[32]) //space
        OnSpaceDown();

    if (pressedKeys[82])
        OnRDown();
};

settings.onmouseenter = function () {
    hoveringElements["settings"] = true;

    if (settings.style.opacity >= MenuTransparency)
        settings.style.opacity = 1;
};

settings.onmouseleave = function () {
    hoveringElements["settings"] = false;
     
    if (settings.style.opacity > 0)
        settings.style.opacity = MenuTransparency;
};

menuBar.onmouseenter = function () {
    hoveringElements["menuBar"] = true;

    if (menuBar.style.opacity >= MenuTransparency)
        menuBar.style.opacity = 1;
};

menuBar.onmouseleave = function () {
    hoveringElements["menuBar"] = false;

    if (menuBar.style.opacity > 0)
        menuBar.style.opacity = MenuTransparency;
};

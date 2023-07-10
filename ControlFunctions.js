
function RandomizeSettings() {
	ppu = RandomInt(4, 12);

	BaseWormCount = RandomInt(1, 10);

	RandomOffset = RandomInt(1, 20);
	console.log(RandomOffset);

	BlendColors = RandomBool();

	_pathModesIndex = RandomInt(0, 3);

	SplitColorQueues = RandomBool();

	FitCanvas();
}

function OnCanvasClick(e)
{
	if (e.ctrlKey) {
		CopyHexCode(mouseX, mouseY);
		return;
	}

	// if currently generating
	if (refreshIntervalId != null && !e.shiftKey) {
		NewCellAt(mouseX, mouseY,ColorQueues.length);
		return;
	}

	// if not currently generating (or if shift click)
	clearInterval(refreshIntervalId);
	HideUI();
	NewHuegene(mouseX, mouseY);
}

//returns hex color displayed (may be laggy? a lot of wasted returns idk if that does anyhthing tho)
function DisplayHexColor(x, y) {
	//dont update if ctrl is being pressed
 	if (pressedKeys[17])
		return;

	if (Grid == null)
		return;

	if (x >= Grid.length)
		return;

	if (Grid[x][y] == null)
		return;

	var h = Grid[x][y].Hex()
	hexDisplay.style.backgroundColor = h;
	return h;
}

function CopyHexCode(x, y) {
	var h = DisplayHexColor(x, y);

	if (h == null)
		return;

	navigator.clipboard.writeText(h);
}

function OnSpaceDown()
{
	ShowingMenus = !ShowingMenus;

	RevealMenu(menuBar, ShowingMenus);
	RevealMenu(settings, ShowingMenus);

	MoveMenus(ShowingMenus);
}

function RevealMenu(menu, MakeVisible) {
	var o = Number(menu.style.opacity);

	if (!MakeVisible)  //hide menu
	{
		menu.style.opacity = 0;
	}

	if (MakeVisible)  // reveal menu
	{
		if (hoveringElements[menu.id]) {
			menu.style.opacity = 1;
		}
		else
			menu.style.opacity = 0.75;
	}
}

function MoveMenus(NowOnScreen) {
	if (NowOnScreen) {
		settings.style.left = "2%";
		menuBar.style.right = "2%";
	}
	else {
		settings.style.left = "-25%";
		menuBar.style.right = "-25%";
	}
}

function OnEscDown() {
	paused = !paused;

	ShowingMenus = true;

	RevealMenu(menuBar, true);
	RevealMenu(settings, true);

	MoveMenus(true);
}

function OnRDown() {
	RandomizeSettings();
	UpdateSettingsMenu();

	if (refreshIntervalId != null) {
		clearInterval(refreshIntervalId);
		refreshIntervalId = null;
	}
}
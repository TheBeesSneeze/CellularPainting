
function RandomizeSettings() {
	ppu = RandomInt(4, 20);

	BaseWormCount = RandomInt(1, 10);

	RandomOffset = RandomInt(1, 20);
	console.log(RandomOffset);

	BlendColors = RandomBool();

	_pathModesIndex = RandomInt(0, 3);

	SplitColorQueues = RandomBool();

	FitCanvas();
}

function OnSpaceDown()
{
	if (settings.style.opacity <= 0)  // reveal menu
		LerpUITransparency(settings, 1, 0.5);
	
	if (settings.style.opacity >= 1)  //hide menu
		LerpUITransparency(settings, 0, 0.5);
}

function OnEscDown() {
	paused = !paused;
}
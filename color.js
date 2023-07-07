


const color =  
{
    R : 0,
    G : 0,
    B : 0,

    x: -1,
    y: -1,

    Queued: false,
    Assigned: false,

    Hex : function() 
    {
        this.CorrectColor();
        //return "#" + this.R.toString(16) + this.G.toString(16) + this.B.toString(16);
        return rgbToHex(this.R, this.G, this.B);
    },

    GetRandomColorVariant: function(x,y)
    {
        var newColor = Object.create(color);

        newColor.R = this.R + GetRandomVariant(RandomOffset);
        newColor.G = this.G + GetRandomVariant(RandomOffset);
        newColor.B = this.B + GetRandomVariant(RandomOffset);

        newColor.x = x;
        newColor.y = y;

        newColor.Assigned = true;

        return newColor;
    },

    //sets rgb values to be between 0-255
    CorrectColor : function()
    {
        this.R = Clamp(this.R, 0, 255);
        this.G = Clamp(this.G, 0, 255);
        this.B = Clamp(this.B, 0, 255);
    },
}

const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function GetRandomColor() {
    var newColor = Object.create(color);

    newColor.R = Math.ceil(Math.random() * 255);
    newColor.G = Math.ceil(Math.random() * 255);
    newColor.B = Math.ceil(Math.random() * 255);

    return newColor;
}

//returns integer between -n and n at random. if n is null, defaults to 1
function GetRandomVariant(n)
{
    if (n == null)
        n = 1;
    return Math.round(Math.random() * -2 * n) + n;
}


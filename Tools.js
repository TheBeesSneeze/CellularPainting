function Clamp(n, minInclusive, maxIncluse)
{
    return Math.min(Math.max(n, minInclusive), maxIncluse);
}

function RandomInt(minInclusive, maxExclusive)
{
    var r = maxExclusive - minInclusive;

    return Math.floor(Math.random() * r) + minInclusive;
}

function RandomBool() {
    return Math.random() < 0.5;
}
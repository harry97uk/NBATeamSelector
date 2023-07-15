export function formatSlugID(ua) {
    return ua.name === "Galway" ? "gaillimh" : ua.name.toLowerCase().replaceAll(/\s/g, '-').replaceAll(/[,\.]/g, "");
}

export function convertStringToNumber(str) {
    return Number(str)
}

export function filterNumericValues(values) {
    return values.filter((value) => typeof value === "number" && !isNaN(value));
}
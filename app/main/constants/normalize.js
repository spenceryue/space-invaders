export function normalize(image) {
    const lines = image.split("\n");
    const maxLength = lines.reduce((max, { length }) => Math.max(max, length), 0);
    return lines.map((line) => line.padEnd(maxLength, " ").split(""));
}

export function setAt(frame, image, rowStart, columnStart) {
    // TODO: Does this work for unicode stuff like `🚀`?
    // Should ignore white space...
    // Should use text measurer to figure out letter glyph width.
    image.forEach((line, row) => line.forEach((letter, column) => (frame[rowStart + row][columnStart + column] = letter)));
}
setAt.centered = (frame, image, rowStart, columnStart) => {
    const [rowOffset, columnOffset] = [image.length, image[0].length].map((x) => -Math.ceil(x / 2));
    setAt(frame, image, rowStart + rowOffset, columnStart + columnOffset);
};

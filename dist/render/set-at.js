export function setAt(frame, image, rowStart, columnStart) {
    // TODO: Does this work for unicode stuff like `🚀`?
    // Should ignore white space...
    // Should use text measurer to figure out letter glyph width.
    image.forEach((line, row) => line.forEach((letter, column) => (frame[rowStart + row][columnStart + column] = letter)));
}

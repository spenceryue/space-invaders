import { GRID_SIZE } from "./constants.js";
export const LEVELS = [
    {
        aliens: [...Array(Math.floor((GRID_SIZE.ROWS - 10) / 5))].flatMap((_, row) => [...Array(Math.floor((GRID_SIZE.COLUMNS - 10) / 5))].map((_, column) => ({
            column: 5 + 3 * column,
            kind: "MINION",
            row: 5 + row,
        }))),
        shields: [...Array(3)].flatMap((_, row) => [...Array(Math.floor((GRID_SIZE.COLUMNS - 10) / 2))].map((_, column) => ({
            column: Math.floor(column / 5) * 10 + (column % 5),
            kind: "MINION",
            row: GRID_SIZE.ROWS - 8 + row,
        }))),
    },
];

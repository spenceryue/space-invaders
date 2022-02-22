import { Events } from "./api.js";
import { GRID_SIZE } from "./constants.js";

export const LEVELS: Events["NEW_LEVEL"][] = [
    {
        aliens: [...Array(Math.floor((GRID_SIZE.ROWS - 10) / 5))].flatMap((_, row) =>
            [...Array(Math.floor((GRID_SIZE.COLUMNS - 10) / 5))].map((_, column) => ({
                column: 5 + 3 * column,
                kind: "MINION" as const,
                row: 5 + row,
            }))
        ),
        shields: [...Array(3)].flatMap((_, row) =>
            [...Array(Math.floor((GRID_SIZE.COLUMNS - 10) / 2))].map((_, column) => ({
                column: 5 + Math.floor(column / 5) * 10 + (column % 5),
                row: GRID_SIZE.ROWS - 8 + row,
            }))
        ),
    },
];

import { type State } from "./api.js";
import { normalize } from "./normalize.js";

export const ALIEN_BONUS = normalize("👽");

export const ALIEN_BULLET = normalize(`↑`);

export const ALIEN_MINION = normalize("👾");

export const GRID_SIZE = {
    COLUMNS: 60,
    ROWS: 60,
};

export const HUMAN_BULLET = normalize(`↑`);

export const HUMAN_BULLET_SPEED: State.bullet["speed"] = 2;

export const SHIP = normalize(`\
 ▴
/▲\\\
`);

export const STATE_EMPTY: State = {
    aliens: [],
    bullets: [],
    scale: 1,
    shields: [],
    ship: { column: 0, row: 0 },
    time: 0,
};

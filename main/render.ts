import { type State } from "./api.js";
import { type atom } from "./atom.js";
import { ALIEN_BONUS, ALIEN_BULLET, ALIEN_MINION, GRID_SIZE, HUMAN_BULLET, SHIELD, SHIP } from "./constants.js";
import { getState } from "./get-state.js";
import { setAt } from "./render/set-at.js";

export function render(state: atom.of<State>, rootElement: HTMLElement): void {
    const frame = [...Array(GRID_SIZE.ROWS)].map(() => Array(GRID_SIZE.COLUMNS).fill(" "));

    const { aliens, bullets, scale, shields, ship, time } = state.get();

    // Composite everything onto `frame`.
    {
        aliens.forEach(({ column, kind, row }) =>
            setAt(frame, { BONUS: ALIEN_BONUS, MINION: ALIEN_MINION }[kind], row, column)
        );

        bullets.forEach(({ column, kind, row, /* TODO: Use for bullet trail? */ speed }) =>
            setAt(frame, { ALIEN: ALIEN_BULLET, HUMAN: HUMAN_BULLET }[kind], row, column)
        );

        shields.forEach(({ column, row }) => (frame[row][column] = SHIELD));

        setAt(frame, SHIP, ship.row - SHIP.length, ship.column - SHIP[0].length);
    }

    rootElement.textContent = frame.map((row) => row.join("")).join("\n");

    rootElement.style.color = "white";
    rootElement.style.backgroundColor = "#000d";
    rootElement.style.whiteSpace = "pre";
    rootElement.style.fontFamily = "monospace";

    requestAnimationFrame((time) => render(state.set(getState.FRAME(state.get(), time)), rootElement));
}

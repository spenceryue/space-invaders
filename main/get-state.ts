import { type Events, type State } from "./api.js";
import { GRID_SIZE, HUMAN_BULLET_SPEED } from "./constants.js";

export type getState = getState.Signature & {
    [E in keyof Events]: (old: State, ...[input]: getState.MaybeOptional<Events[E]>) => State;
};

export namespace getState {
    export type MaybeOptional<T> = [T] extends [NonNullable<T>] ? [input: T] : [input?: T];

    export type Signature = (old: State, ...events: Events.Pair[]) => State;
}

export const getState: getState = (old, ...events) =>
    events.reduce(
        (old, [event, input]) => getState[event](old, input /* Type narrowing fails at `getState[event]` */ as never),
        old
    );

getState.FRAME = (old, time) => ({
    ...old,
    // aliens: TODO: prune dead
    bullets: old.bullets
        .map((bullet) => ({ ...bullet, row: bullet.row - bullet.speed }))
        .filter(/* TODO: prune collided */ Boolean)
        .filter(({ row }) => 0 <= row && row < GRID_SIZE.ROWS),
    // shields: TODO: prune hit
    // ship: TODO: multiple "lives" or 1-hit KO?
    time,
});

getState.INIT = (old, { NEW_LEVEL, RESIZE }) => getState(old, ["NEW_LEVEL", NEW_LEVEL], ["RESIZE", RESIZE]);

getState.KEYDOWN = (old, key) => ({
    ...old,
    bullets:
        key === " "
            ? [...old.bullets, { column: old.ship.column, kind: "HUMAN", row: old.ship.row, speed: HUMAN_BULLET_SPEED }]
            : old.bullets,
    ship: { ...old.ship, column: old.ship.column + (key === "ArrowLeft" ? -1 : key === "ArrowRight" ? 1 : 0) },
});

getState.NEW_LEVEL = (old, { aliens, shields }) => ({
    ...old,
    aliens,
    bullets: [],
    shields,
    ship: {
        column: GRID_SIZE.COLUMNS / 2,
        row: GRID_SIZE.ROWS - 1,
    },
});

getState.RESIZE = (old, { height, width }) => ({
    ...old,
    scale: Math.min(...[height / GRID_SIZE.ROWS, width / GRID_SIZE.COLUMNS].map(Math.floor)),
});

export type State = {
    aliens: State.alien[];
    bullets: State.bullet[];
    /** Pixels per cell. */
    scale: number;
    shields: State.position[];
    ship: State.position;
    time: number;
};

export namespace State {
    export type alien = position & {
        kind: "BONUS" | "MINION";
    };

    export type bullet = position & {
        kind: "ALIEN" | "HUMAN";
        /** Tiles per second. */
        speed: number;
    };

    export type position = {
        column: number;
        row: number;
    };
}

export type Events = {
    FRAME: State["time"];
    INIT: Pick<Events, "NEW_LEVEL" | "RESIZE">;
    KEYDOWN: Events.Key;
    NEW_LEVEL: Pick<State, "aliens" | "shields">;
    RESIZE: Events.Dimensions;
};

export namespace Events {
    export type Dimensions = Pick<DOMRect, "height" | "width">;

    export type Key = " " | "ArrowDown" | "ArrowLeft" | "ArrowRight" | "ArrowUp" | "Enter";

    export namespace Key {
        export const is = (maybeKey: string): maybeKey is Key =>
            ((
                allKeys: Record<Key, undefined> = {
                    " ": undefined,
                    ArrowDown: undefined,
                    ArrowLeft: undefined,
                    ArrowRight: undefined,
                    ArrowUp: undefined,
                    Enter: undefined,
                }
            ) => maybeKey in allKeys)();
    }

    export type Pair = { [E in keyof Events]: readonly [E, Events[E]] }[keyof Events];
}

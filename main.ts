/// <reference lib="DOM" />

import { atom } from "./main/atom.js";
import { STATE_EMPTY } from "./main/constants.js";
import { getState } from "./main/get-state.js";
import { LEVELS } from "./main/levels.js";
import { render } from "./main/render.js";
import { useKeyboard } from "./main/use-keyboard.js";
import { useResizeObserver } from "./main/use-resize-observer.js";

// State:
//   Level 1 map aliens
//   Player ship
//   Bullets

// Inputs each frame:
//    Key presses,
// Outputs each frame:
//    maybe fewer aliens
//    new ship position
//    more bullets, cull old bullets

// requestAnimationFrame:
//     Render as text -- Text buffer for what's on the screen
//        1. Render the map
//        2. Render the ship
//        3. Render the UI (score, time)

// Keyboard -> reduce -> State
// Resize   -> reduce -> State
//                             ↘
// rAF ->                        spaceInvaders -> DOM

// spaceInvaders(State) -> State, DOM
//   useKeyboard(State) ↗ State

// State -> State -> State -> State -> State -> State -> State
//        ↗        ↗       ↗        ↗       ↗        ↗
// Event ↗  Event ↗ Event ↗  Event ↗ Event ↗  Event ↗

// [0, 1, 2, 3].reduce((Context, element) => Context, initialValue)
// initialValue -> Context -> Context -> Context
//               ↗         ↗          ↗
//             0          1          2

function main() {
    const rootElement = document.body;

    const state = atom(
        getState.INITIALIZE(STATE_EMPTY, {
            NEW_LEVEL: LEVELS[0],
            RESIZE: rootElement.getBoundingClientRect(),
        })
    );

    useKeyboard(state);

    useResizeObserver(state, rootElement);

    render(state, rootElement);
}

main();

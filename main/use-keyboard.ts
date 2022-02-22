import { Events, State } from "./api.js";
import { type atom } from "./atom.js";
import { getState } from "./get-state.js";

export function useKeyboard(state: atom.of<State>): () => void {
    const trigger = ({ key }: KeyboardEvent) => Events.Key.is(key) && state.set(getState.KEYDOWN(state.get(), key));

    addEventListener("keydown", trigger);

    return () => removeEventListener("keydown", trigger);
}

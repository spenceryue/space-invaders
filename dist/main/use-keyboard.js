import { Events } from "./api.js";
import { getState } from "./get-state.js";
export function useKeyboard(state) {
    const trigger = ({ key }) => Events.Key.is(key) && state.set(getState.KEYDOWN(state.get(), key));
    addEventListener("keydown", trigger);
    return () => removeEventListener("keydown", trigger);
}

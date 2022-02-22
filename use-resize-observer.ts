import { State } from "./api.js";
import { atom } from "./atom.js";
import { getState } from "./get-state.js";

export function useResizeObserver(state: atom.of<State>, rootElement: HTMLElement): () => void {
    const trigger: ResizeObserverCallback = ([
        {
            borderBoxSize: [{ blockSize, inlineSize }],
        },
    ]) => state.set(getState.RESIZE(state.get(), { height: blockSize, width: inlineSize }));

    const observer = new ResizeObserver(trigger);

    observer.observe(rootElement);

    return () => observer.disconnect();
}

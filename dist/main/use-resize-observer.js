import { getState } from "./get-state.js";
export function useResizeObserver(state, rootElement) {
    const trigger = ([{ borderBoxSize: [{ blockSize, inlineSize }], },]) => state.set(getState.RESIZE(state.get(), { height: blockSize, width: inlineSize }));
    const observer = new ResizeObserver(trigger);
    observer.observe(rootElement);
    return () => observer.disconnect();
}

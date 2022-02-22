export type atom = <T>(initial: T) => atom.of<T>;

export const atom: atom = (
    initial,
    value = initial,
    result: atom.of<typeof value> = { get: () => value, set: (next) => ((value = next), result) }
) => result;

export namespace atom {
    export type of<T> = {
        get(): T;
        set(next: T): of<T>;
    };
}

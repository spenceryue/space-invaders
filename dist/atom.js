export const atom = (initial, value = initial, result = { get: () => value, set: (next) => ((value = next), result) }) => result;

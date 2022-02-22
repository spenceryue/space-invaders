export var Events;
(function (Events) {
    let Key;
    (function (Key) {
        Key.is = (maybeKey) => ((allKeys = {
            " ": undefined,
            ArrowDown: undefined,
            ArrowLeft: undefined,
            ArrowRight: undefined,
            ArrowUp: undefined,
            Enter: undefined,
        }) => maybeKey in allKeys)();
    })(Key = Events.Key || (Events.Key = {}));
})(Events || (Events = {}));

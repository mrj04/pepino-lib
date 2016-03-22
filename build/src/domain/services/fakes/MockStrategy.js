"use strict";
class MockStrategy {
    constructor(matchingText, codeGenerated) {
        this._matchingText = matchingText;
        this._codeGenerated = codeGenerated;
    }
    canGenerate(text) {
        return text === this._matchingText;
    }
    generate(text) {
        return this._codeGenerated;
    }
}
exports.MockStrategy = MockStrategy;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9zZXJ2aWNlcy9mYWtlcy9Nb2NrU3RyYXRlZ3kudHMiXSwibmFtZXMiOlsiTW9ja1N0cmF0ZWd5IiwiTW9ja1N0cmF0ZWd5LmNvbnN0cnVjdG9yIiwiTW9ja1N0cmF0ZWd5LmNhbkdlbmVyYXRlIiwiTW9ja1N0cmF0ZWd5LmdlbmVyYXRlIl0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFHYjtJQUtJQSxZQUFZQSxZQUFvQkEsRUFBRUEsYUFBcUJBO1FBQ25EQyxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxZQUFZQSxDQUFDQTtRQUNsQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsYUFBYUEsQ0FBQ0E7SUFDeENBLENBQUNBO0lBRURELFdBQVdBLENBQUNBLElBQVlBO1FBQ3BCRSxNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtJQUN2Q0EsQ0FBQ0E7SUFFREYsUUFBUUEsQ0FBQ0EsSUFBWUE7UUFDakJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO0lBQy9CQSxDQUFDQTtBQUNMSCxDQUFDQTtBQWpCWSxvQkFBWSxlQWlCeEIsQ0FBQSIsImZpbGUiOiJkb21haW4vc2VydmljZXMvZmFrZXMvTW9ja1N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==

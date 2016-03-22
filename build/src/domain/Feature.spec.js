"use strict";
var chai = require("chai");
var expect = chai.expect;
var Feature_1 = require("./Feature");
describe("A Feature", () => {
    describe("when instantiating a feature", () => {
        var feature = new Feature_1.Feature("test", new Array());
        it("should be an instance of a feature object", (done) => {
            expect(feature).to.be.an.instanceOf(Feature_1.Feature);
            done();
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9GZWF0dXJlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2IsSUFBTyxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6Qix3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFHbEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUVsQixRQUFRLENBQUMsOEJBQThCLEVBQUU7UUFFckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssRUFBWSxDQUFDLENBQUM7UUFFekQsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLENBQUMsSUFBSTtZQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJkb21haW4vRmVhdHVyZS5zcGVjLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==

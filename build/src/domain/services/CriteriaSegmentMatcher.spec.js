"use strict";
var chai = require("chai");
var expect = chai.expect;
var Feature_1 = require("../../domain/Feature");
var Scenario_1 = require("../../domain/Scenario");
var CriteriaSegment_1 = require("../../domain/CriteriaSegment");
var PepinoModule = require("../../domain/services/CriteriaSegmentMatcher");
describe("Segment Type Matcher", () => {
    describe("when getting a plain-jane matching segment type", () => {
        var matcher = new PepinoModule.Pepino.CriteriaSegmentMatcher();
        var segment = "matching segment";
        var scenario1 = new Scenario_1.Scenario("scenario", new Array(new CriteriaSegment_1.CriteriaSegment("Given", segment), new CriteriaSegment_1.CriteriaSegment("When", segment)));
        var scenario2 = new Scenario_1.Scenario("scenario", new Array(new CriteriaSegment_1.CriteriaSegment("Then", segment)));
        var features = new Array(new Feature_1.Feature("test1", new Array(scenario1)), new Feature_1.Feature("test2", new Array(scenario2)));
        it("should be return a matching segment", () => {
            expect(matcher.get(segment, features)[0].type).to.equal("Given");
        });
        it("should be return multiple matching segments", () => {
            expect(matcher.get(segment, features)[1].type).to.equal("When");
        });
        it("should be return segments from multiple features", () => {
            expect(matcher.get(segment, features)[2].type).to.equal("Then");
        });
    });
    describe("when getting a matching segment type with variables", () => {
        var matcher = new PepinoModule.Pepino.CriteriaSegmentMatcher();
        var stepSegmentWithVariable = "matching segment with \"$variable\" and \"$anotherVariable\"";
        var criteriaSegment = "matching segment with \"something\" and \"something else\"";
        var scenario1 = new Scenario_1.Scenario("scenario", new Array(new CriteriaSegment_1.CriteriaSegment("Given", criteriaSegment), new CriteriaSegment_1.CriteriaSegment("When", criteriaSegment)));
        var scenario2 = new Scenario_1.Scenario("scenario", new Array(new CriteriaSegment_1.CriteriaSegment("Then", criteriaSegment)));
        var features = new Array(new Feature_1.Feature("feature 1", new Array(scenario1)), new Feature_1.Feature("feature 2", new Array(scenario2)));
        it("should return a matching segment", () => {
            expect(matcher.get(stepSegmentWithVariable, features)[0].text).to.equal(criteriaSegment);
        });
        it("should return multiple matching segments", () => {
            expect(matcher.get(stepSegmentWithVariable, features)[1].text).to.equal(criteriaSegment);
        });
        it("should return segments from multiple features", () => {
            expect(matcher.get(stepSegmentWithVariable, features)[2].text).to.equal(criteriaSegment);
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9zZXJ2aWNlcy9Dcml0ZXJpYVNlZ21lbnRNYXRjaGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2IsSUFBTyxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6Qix3QkFBc0Isc0JBQXNCLENBQUMsQ0FBQTtBQUM3Qyx5QkFBdUIsdUJBQXVCLENBQUMsQ0FBQTtBQUMvQyxnQ0FBOEIsOEJBQThCLENBQUMsQ0FBQTtBQUM3RCxJQUFZLFlBQVksV0FBTSw4Q0FBOEMsQ0FBQyxDQUFBO0FBRTdFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtJQUU3QixRQUFRLENBQUMsaURBQWlELEVBQUU7UUFFeEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDL0QsSUFBSSxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDakMsSUFBSSxTQUFTLEdBQUksSUFBSSxtQkFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLEtBQUssQ0FDdkMsSUFBSSxpQ0FBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLGlDQUFlLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxRixJQUFJLFNBQVMsR0FBSSxJQUFJLG1CQUFRLENBQUMsVUFBVSxFQUFFLElBQUksS0FBSyxDQUN2QyxJQUFJLGlDQUFlLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRCxJQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FDcEIsSUFBSSxpQkFBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUssQ0FBVyxTQUFTLENBQUMsQ0FBQyxFQUNwRCxJQUFJLGlCQUFPLENBQUMsT0FBTyxFQUFFLElBQUksS0FBSyxDQUFXLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxRCxFQUFFLENBQUMscUNBQXFDLEVBQUU7WUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNkNBQTZDLEVBQUU7WUFDN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsa0RBQWtELEVBQUU7WUFDbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxxREFBcUQsRUFBRTtRQUU1RCxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUMvRCxJQUFJLHVCQUF1QixHQUFHLDhEQUE4RCxDQUFDO1FBQzdGLElBQUksZUFBZSxHQUFHLDREQUE0RCxDQUFDO1FBRW5GLElBQUksU0FBUyxHQUFJLElBQUksbUJBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxLQUFLLENBQ3ZDLElBQUksaUNBQWUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLEVBQUUsSUFBSSxpQ0FBZSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUcsSUFBSSxTQUFTLEdBQUksSUFBSSxtQkFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLEtBQUssQ0FDdkMsSUFBSSxpQ0FBZSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQ3BCLElBQUksaUJBQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLENBQVcsU0FBUyxDQUFDLENBQUMsRUFDeEQsSUFBSSxpQkFBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FBVyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFOUQsRUFBRSxDQUFDLGtDQUFrQyxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUYsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUU7WUFDMUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5RixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtZQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJkb21haW4vc2VydmljZXMvQ3JpdGVyaWFTZWdtZW50TWF0Y2hlci5zcGVjLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==

"use strict";
var chai = require("chai");
var expect = chai.expect;
var Step_1 = require("../../domain/Step");
var PepinoModule = require("../../domain/services/CucumberStepFunctionGenerator");
var MockStrategy_1 = require("./fakes/MockStrategy");
describe("The Cucumber Function Generator", () => {
    describe("when generating cucumber code from a feature with steps", () => {
        var mock1 = new MockStrategy_1.MockStrategy("step 1", "byron");
        var mock2 = new MockStrategy_1.MockStrategy("step 2", "javascript");
        var generator = new PepinoModule.Pepino.CucumberStepFunctionGenerator(new Array(mock1, mock2));
        var steps = new Array(new Step_1.Step("step 1", "some segment"), new Step_1.Step("step 2", "some segment"));
        var code = generator.generate("Given", "some segment", steps);
        var lines = code.split("\n");
        it("should generate the test function signature for the given segment", () => {
            expect(lines[0]).to.equal("\tthis.Given(/^some segment$/, function() {");
        });
        it("should convert the first step text into the correct javascript code", () => {
            expect(lines[1]).to.equal("\t\tbyron");
        });
        it("should convert the second step text into the correct javascript code", () => {
            expect(lines[2]).to.equal("\t\tjavascript");
        });
        it("should finish the function", () => {
            expect(lines[3]).to.equal("\t});");
        });
    });
    describe("when a steps does not have a matching code generation strategy", () => {
        var no_matching_strategies = new Array();
        var generator = new PepinoModule.Pepino.CucumberStepFunctionGenerator(no_matching_strategies);
        var steps = new Array(new Step_1.Step("some step", "some segment"));
        var code = generator.generate("given", "some segment", steps);
        var lines = code.split("\n");
        it("should return the code in commented form", () => {
            expect(lines[1]).to.equal("\t\t//some step");
        });
    });
    describe("when generating cucumber code from a feature with steps", () => {
        //Scenario:
        //   Given an authenticated user
        //   And the product creation page
        //   And the user has filled in all the required fields correctly
        //   When the user finally submits the form 
        //   Then the page title should be "New Products"           
        //   And the product should be visible in the product list 
        //Steps:
        //   Then the page title should be "$pageTitle"
        //     Verify page title is "$pageTitle"
        var steps1 = new Array(new Step_1.Step("Verify page title is \"$pageTitle\"", "the page title should be \"$pageTitle\""));
        var mock1 = new MockStrategy_1.MockStrategy("Verify page title is \"$pageTitle\"", "assert(title, pageTitle);");
        var codeGenerationStrategies = new Array(mock1);
        var generator = new PepinoModule.Pepino.CucumberStepFunctionGenerator(codeGenerationStrategies);
        var code = generator.generate("Then", "the page title should be \"New Products\"", steps1);
        var lines = code.split("\n");
        describe("Generating a segment with variables", () => {
            it("should generate the test function signature with a variable", () => {
                expect(lines[0]).to.equal("\tthis.Then(/^the page title should be \"([^\"]*)\"$/, function(pageTitle) {");
            });
            it("should use the variable in the step", () => {
                expect(lines[1]).to.equal("\t\tassert(title, pageTitle);");
            });
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9zZXJ2aWNlcy9DdWN1bWJlclN0ZXBGdW5jdGlvbkdlbmVyYXRvci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiLElBQU8sSUFBSSxXQUFXLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIscUJBQW1CLG1CQUFtQixDQUFDLENBQUE7QUFHdkMsSUFBWSxZQUFZLFdBQU0scURBQXFELENBQUMsQ0FBQTtBQUNwRiw2QkFBMkIsc0JBQXNCLENBQUMsQ0FBQTtBQUVsRCxRQUFRLENBQUMsaUNBQWlDLEVBQUU7SUFFeEMsUUFBUSxDQUFDLHlEQUF5RCxFQUFFO1FBRWhFLElBQUksS0FBSyxHQUFHLElBQUksMkJBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxLQUFLLEdBQUcsSUFBSSwyQkFBWSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUVyRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQ2pFLElBQUksS0FBSyxDQUEwQixLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV0RCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FDakIsSUFBSSxXQUFJLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxFQUNsQyxJQUFJLFdBQUksQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFOUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QixFQUFFLENBQUMsbUVBQW1FLEVBQUU7WUFDcEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxxRUFBcUUsRUFBRTtZQUN0RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRTtZQUN2RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFO1lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZ0VBQWdFLEVBQUU7UUFFdkUsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLEtBQUssRUFBMkIsQ0FBQztRQUNsRSxJQUFJLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQ2pFLHNCQUFzQixDQUFDLENBQUM7UUFFNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQ2pCLElBQUksV0FBSSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU5RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdCLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRTtZQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMseURBQXlELEVBQUU7UUFFaEUsV0FBVztRQUNYLGdDQUFnQztRQUNoQyxrQ0FBa0M7UUFDbEMsaUVBQWlFO1FBQ2pFLDRDQUE0QztRQUM1Qyw0REFBNEQ7UUFDNUQsMkRBQTJEO1FBRTNELFFBQVE7UUFDUiwrQ0FBK0M7UUFDL0Msd0NBQXdDO1FBRXhDLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxDQUFPLElBQUksV0FBSSxDQUFDLHFDQUFxQyxFQUNuQyx5Q0FBeUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsSUFBSSxLQUFLLEdBQUcsSUFBSSwyQkFBWSxDQUFDLHFDQUFxQyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFDakcsSUFBSSx3QkFBd0IsR0FBRyxJQUFJLEtBQUssQ0FBMEIsS0FBSyxDQUFDLENBQUM7UUFFekUsSUFBSSxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDaEcsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFM0YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QixRQUFRLENBQUMscUNBQXFDLEVBQUU7WUFFNUMsRUFBRSxDQUFDLDZEQUE2RCxFQUFFO2dCQUM5RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1lBQzlHLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHFDQUFxQyxFQUFFO2dCQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImRvbWFpbi9zZXJ2aWNlcy9DdWN1bWJlclN0ZXBGdW5jdGlvbkdlbmVyYXRvci5zcGVjLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==

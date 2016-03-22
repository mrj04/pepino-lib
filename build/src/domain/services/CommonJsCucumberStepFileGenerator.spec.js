"use strict";
var chai = require("chai");
var expect = chai.expect;
var PepinoModule = require("../../domain/services/CommonJsCucumberStepFileGenerator");
describe("The CommonJs Step File Generator", () => {
    describe("when generating a commonjs file", () => {
        var generator = new PepinoModule.Pepino.CommonJsCucumberStepFileGenerator();
        var code = generator.generate(new Array("one", "two", "three"));
        var lines = code.split("\n");
        it("should generate a commonjs module", () => {
            expect(lines[0].trim()).to.equal("module.exports = function() {");
            expect(lines[lines.length - 1].trim()).to.equal("};");
        });
        it("should include the functions in the file with a blank line between each", () => {
            expect(lines[1].trim()).to.equal("one");
            expect(lines[3].trim()).to.equal("two");
            expect(lines[5].trim()).to.equal("three");
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9zZXJ2aWNlcy9Db21tb25Kc0N1Y3VtYmVyU3RlcEZpbGVHZW5lcmF0b3Iuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFDYixJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBR3pCLElBQVksWUFBWSxXQUFNLHlEQUF5RCxDQUFDLENBQUE7QUFFeEYsUUFBUSxDQUFDLGtDQUFrQyxFQUFFO0lBRXpDLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRTtRQUV4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsaUNBQWlDLEVBQUUsQ0FBQztRQUM1RSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFTLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUV4RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtZQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUVBQXlFLEVBQUU7WUFDM0UsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImRvbWFpbi9zZXJ2aWNlcy9Db21tb25Kc0N1Y3VtYmVyU3RlcEZpbGVHZW5lcmF0b3Iuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=

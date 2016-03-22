"use strict";
var chai = require("chai");
var expect = chai.expect;
var fs = require('fs');
var glob = require('glob');
var f = require("../../domain/services/StepParser");
describe("The Step Parser", () => {
    var parser = new f.Pepino.PepinoLangStepParser();
    describe("when parsing a step file", () => {
        var stepText = `
            I have navigated to the search screen
              Navigate to http://mysite.com
            
            I search for "$SearchTerm"
              Type "$SearchTerm" into <#search> element
              Click the <#submit> button
            
            I should find "$ExpectedResult" in the results
              Verify "$ExpectedResult" is in <#results> element
        `;
        var steps = parser.parse(stepText);
        it("should be an array of steps", (done) => {
            expect(steps).to.be.an.instanceof(Array);
            done();
        });
        it("should match the first step text with first segment text", (done) => {
            expect(steps[0].segment).to.equal('I have navigated to the search screen');
            expect(steps[0].text).to.equal('Navigate to http://mysite.com');
            done();
        });
        it("should match the second and third step texts with second segment text", (done) => {
            expect(steps[1].segment).to.equal('I search for "$SearchTerm"');
            expect(steps[1].text).to.equal('Type "$SearchTerm" into <#search> element');
            expect(steps[2].segment).to.equal('I search for "$SearchTerm"');
            expect(steps[2].text).to.equal('Click the <#submit> button');
            done();
        });
        it("should match the third step text with fourth segment text", (done) => {
            expect(steps[3].segment).to.equal('I should find "$ExpectedResult" in the results');
            expect(steps[3].text).to.equal('Verify "$ExpectedResult" is in <#results> element');
            done();
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9zZXJ2aWNlcy9TdGVwUGFyc2VyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2IsSUFBTyxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6QixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQVksQ0FBQyxXQUFNLGtDQUFrQyxDQUFDLENBQUE7QUFHdEQsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBRXhCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBRWpELFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUVqQyxJQUFJLFFBQVEsR0FBRzs7Ozs7Ozs7OztTQVVkLENBQUM7UUFFRixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5DLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLElBQUk7WUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDBEQUEwRCxFQUFFLENBQUMsSUFBSTtZQUNoRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUNoRSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHVFQUF1RSxFQUFFLENBQUMsSUFBSTtZQUM3RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztZQUU1RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUU3RCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDJEQUEyRCxFQUFFLENBQUMsSUFBSTtZQUNqRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUNwRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztZQUNwRixJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJkb21haW4vc2VydmljZXMvU3RlcFBhcnNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==

"use strict";
var chai = require("chai");
var expect = chai.expect;
var Feature_1 = require("../../domain/Feature");
var f = require("../../domain/services/FeatureParser");
var FeatureParserError_1 = require("../../domain/services/errors/FeatureParserError");
describe("The Feature Parser", () => {
    var parser = new f.Pepino.GherkinFeatureParser();
    describe("when parsing an empty feature", () => {
        it("should throw an exception informing of the empty feature file", () => {
            expect(function () { parser.parse(""); }).to.throw(FeatureParserError_1.FeatureParserError);
        });
    });
    describe("when parsing an empty feature", () => {
        it("should throw an exception informing of the empty feature file", () => {
            expect(function () { parser.parse(""); }).to.throw(FeatureParserError_1.FeatureParserError);
        });
    });
    describe("when parsing a valid feature", () => {
        var featureText = `
            Feature: The Cool Feature
            
            Scenario: Test 1
              Given a scenario
              When something happens
              Then it should succeed
            
            Scenario: Test 2
        `;
        var feature = parser.parse(featureText);
        it("should be an instance of a feature", (done) => {
            expect(feature).to.be.an.instanceOf(Feature_1.Feature);
            done();
        });
        it("should have a feature name", (done) => {
            expect(feature.name).to.equal('The Cool Feature');
            done();
        });
        it("should have an array of scenario definitions", (done) => {
            expect(feature.scenarios.length).to.be.greaterThan(0);
            done();
        });
        it("should have a scenario with the same name as the feature file", (done) => {
            expect(feature.scenarios[0].name).to.equal("Test 1");
            done();
        });
        it("should have scenarios with criteria segments", (done) => {
            expect(feature.scenarios[0].segments.length).to.be.greaterThan(0);
            done();
        });
        it("should have criteria segements with expected type ", (done) => {
            expect(feature.scenarios[0].segments[0].type).to.equal("Given");
            done();
        });
        it("should have criteria segements with expected text ", (done) => {
            expect(feature.scenarios[0].segments[0].text).to.equal("a scenario");
            done();
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9zZXJ2aWNlcy9GZWF0dXJlUGFyc2VyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2IsSUFBTyxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6Qix3QkFBc0Isc0JBQXNCLENBQUMsQ0FBQTtBQUM3QyxJQUFZLENBQUMsV0FBTSxxQ0FBcUMsQ0FBQyxDQUFBO0FBQ3pELG1DQUFpQyxpREFBaUQsQ0FBQyxDQUFBO0FBRW5GLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtJQUUzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUVqRCxRQUFRLENBQUMsK0JBQStCLEVBQUU7UUFFdEMsRUFBRSxDQUFDLCtEQUErRCxFQUFFO1lBQ2hFLE1BQU0sQ0FBQyxjQUFZLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLHVDQUFrQixDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywrQkFBK0IsRUFBRTtRQUV0QyxFQUFFLENBQUMsK0RBQStELEVBQUU7WUFDaEUsTUFBTSxDQUFDLGNBQVksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsdUNBQWtCLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLDhCQUE4QixFQUFFO1FBRXJDLElBQUksV0FBVyxHQUFHOzs7Ozs7Ozs7U0FTakIsQ0FBQztRQUVGLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFeEMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLENBQUMsSUFBSTtZQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFLENBQUMsSUFBSTtZQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLENBQUMsSUFBSTtZQUNwRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLCtEQUErRCxFQUFFLENBQUMsSUFBSTtZQUNyRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsOENBQThDLEVBQUUsQ0FBQyxJQUFJO1lBQ3BELE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLENBQUMsSUFBSTtZQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLENBQUMsSUFBSTtZQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyRSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJkb21haW4vc2VydmljZXMvRmVhdHVyZVBhcnNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==

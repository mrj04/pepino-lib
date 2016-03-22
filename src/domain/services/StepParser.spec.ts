"use strict";
import chai = require("chai");
var expect = chai.expect;
import * as f from "../../domain/services/StepParser";
import {Step} from "../../domain/Step";

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

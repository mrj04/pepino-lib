"use strict";
import chai = require("chai");
var expect = chai.expect;
import {Step} from "../../domain/Step";
import {CriteriaSegment} from "../../domain/CriteriaSegment";
import {ICodeGenerationStrategy} from "../../domain/ICodeGenerationStrategy";
import * as PepinoModule from "../../domain/services/CucumberStepFunctionGenerator";
import {MockStrategy} from "./fakes/MockStrategy";

describe("The Cucumber Function Generator", () => {
    
    describe("when generating cucumber code from a feature with steps", () => {

        var mock1 = new MockStrategy("step 1", "byron");
        var mock2 = new MockStrategy("step 2", "javascript");
        
        var generator = new PepinoModule.Pepino.CucumberStepFunctionGenerator(
            new Array<ICodeGenerationStrategy>(mock1, mock2));
        
        var steps = new Array<Step>(
            new Step("step 1", "some segment"), 
            new Step("step 2", "some segment"));
                    
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
        
        var no_matching_strategies = new Array<ICodeGenerationStrategy>();
        var generator = new PepinoModule.Pepino.CucumberStepFunctionGenerator(
            no_matching_strategies);
        
        var steps = new Array<Step>(
            new Step("some step", "some segment"));
                    
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
        
        var steps1 = new Array<Step>(new Step("Verify page title is \"$pageTitle\"",
                                                "the page title should be \"$pageTitle\""));
                                            
        var mock1 = new MockStrategy("Verify page title is \"$pageTitle\"", "assert(title, pageTitle);");    
        var codeGenerationStrategies = new Array<ICodeGenerationStrategy>(mock1);
        
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
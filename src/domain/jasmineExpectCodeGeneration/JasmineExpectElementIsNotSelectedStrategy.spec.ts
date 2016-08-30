"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectElementIsNotSelectedStrategy} from "./JasmineExpectElementIsNotSelectedStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect assertion", () => {
    
    describe("without variables", () => {
        var strategy = new JasmineExpectElementIsNotSelectedStrategy();
        var instructions = "Verify <#checkboxElement> not to be checked";

        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;    
        });

        it("should pass on 'have attribute' instructions", () => {
            var similar_instructions = "Verify <#checkboxElement> to be checked";    
            expect(strategy.canGenerate(similar_instructions)).to.be.false;    
        });

        it("should convert the assert to jasmine expect code", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.element(\"#checkboxElement\").isSelected()).toBe(false);");
        }); 
    });

    describe("with variable in the element", () => {
        var strategy = new JasmineExpectElementIsNotSelectedStrategy();
        var instructions = "Verify <$checkboxElement> not to be checked";
        
        it("should convert the assert to jasmine expect code with correct variable element", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.element(checkboxElement).isSelected()).toBe(false);");
        });  
    });
});

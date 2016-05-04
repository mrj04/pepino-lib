"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectSelectionStrategy} from "./JasmineExpectSelectionStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect selection label assertion", () => {
    
    var strategy = new JasmineExpectSelectionStrategy();
        
    describe("without variables", () => {
        var instructions = "Verify \"something\" is selected in <#results> element";
        
        it("should be able to generate instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });
        
        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;    
        });
        
        it("should pass on similar verify instructions", () => {
            var similar_instructions = "Verify \"something\" is in <#results> element";    
            expect(strategy.canGenerate(similar_instructions)).to.be.false;    
        });
        
        it("should pass on instructions to verify option value without variables", () => {
            var similar_instructions = "Verify the value \"something\" is selected in <#results> element";    
            expect(strategy.canGenerate(similar_instructions)).to.be.false;    
        });
        
        it("should pass on instructions to verify option value with variables", () => {
            var similar_instructions = "Verify the value \"$something\" is selected in <$results> element";    
            expect(strategy.canGenerate(similar_instructions)).to.be.false;    
        });
        
        it("should convert the assert to jasmine expect code", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getText(\"#results option:checked\")).toContain(\"something\");");
        });  
    });
    
    describe("with variable in the contents", () => {
        
        var instructions = "Verify \"$something\" is selected in <#results> element";
        
        it("should be able to generate instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });
        
        it("should convert the assert to jasmine expect code with correct variable contents", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getText(\"#results option:checked\")).toContain(something);");
        });  
    });
    
    describe("with variable in the element", () => {
        
        var instructions = "Verify \"something\" is selected in <$results> element";
        
        it("should be able to generate instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });
                
        it("should convert the assert to jasmine expect code with correct variable element", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getText(results + \" option:checked\")).toContain(\"something\");");
        });  
    });
    
    describe("with variables in the element and content", () => {
        
        var instructions = "Verify \"$elementValue\" is selected in <$selectElement>";
        
        it("should be able to generate instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });
        
        it("should convert the assert to jasmine expect code with correct variable element", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getText(selectElement + \" option:checked\")).toContain(elementValue);");
        });  
    });
    
});

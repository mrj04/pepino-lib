"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectElementAttributeStrategy} from "./JasmineExpectElementAttributeStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect assertion", () => {
    
    describe("without variables", () => {
        var strategy = new JasmineExpectElementAttributeStrategy();
        var instructions = "Verify <#checkboxElement> to have attribute \"attribute\"";
        
        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });
        
        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;    
        });
        
        it("should pass on 'not have attribute' instructions", () => {
            var similar_instructions = "Verify <#checkboxElement> to not have attribute \"attribute\"";    
            expect(strategy.canGenerate(similar_instructions)).to.be.false;    
        });

        it("should convert the assert to jasmine expect code", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getHTML(\"#checkboxElement\")).toContain(\"attribute\");");
        }); 
    });

    describe("with variable in the contents", () => {
        var strategy = new JasmineExpectElementAttributeStrategy();
        var instructions = "Verify <#checkboxElement> to have attribute \"$attribute\""; 
        
        it("should convert the assert to jasmine expect code with correct variable contents", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getHTML(\"#checkboxElement\")).toContain(attribute);");
        });  
    });

    describe("with variable in the element", () => {
        var strategy = new JasmineExpectElementAttributeStrategy();
        var instructions = "Verify <$checkboxElement> to have attribute \"attribute\"";
        
        it("should convert the assert to jasmine expect code with correct variable element", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getHTML(checkboxElement)).toContain(\"attribute\");");
        });  
    });
});

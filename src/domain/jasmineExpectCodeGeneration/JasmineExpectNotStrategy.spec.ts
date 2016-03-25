"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectNotStrategy} from "./JasmineExpectNotStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect not assertion", () => {
        
    var strategy = new JasmineExpectNotStrategy();
        
    describe("without variables", () => {

        var instructions = "Verify \"something\" is not in <#results> element";
        
        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });
        
        it("should pass on similar instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;    
        });
        
        it("should pass on unrecognized instructions", () => {
            var similar_instructions = "Verify \"something\" is in <#results> element";    
            expect(strategy.canGenerate(similar_instructions)).to.be.false;    
        });
        
        it("should convert the assert to jasmine expect code", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getText(\"#results\").join()).toNotContain(\"something\");");
        });               
    });

    describe("with variable in the contents", () => {
        
        var instructions = "Verify \"$someString\" is not in <#results> element";
        
        it("should convert the assert to jasmine expect code with correct variable name", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getText(\"#results\").join()).toNotContain(someString);");
        });  
    });
    
    describe("with variable in the element", () => {
        var instructions = "Verify \"someString\" is in <$someElement> element";
        
        it("should convert the assert to jasmine expect code with correct variable element", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getText(someElement).join()).toNotContain(\"someString\");");
        });  
    });
});
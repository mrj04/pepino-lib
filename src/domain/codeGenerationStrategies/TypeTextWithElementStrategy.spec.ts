"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {TypeTextWithElementStrategy} from "./TypeTextWithElementStrategy";

describe("when converting pepino-lang instructions to type text with no target element", () => {

    describe("without variable", () => {
            
        var strategy = new TypeTextWithElementStrategy();
        var instructions = "Type \"some text\" into <#element>";
        
        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });
        
        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;    
        });
        
        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.setValue(\"#element\", \"some text\");");
        });          
    });      
    
    describe("with variable", () => {
            
        var strategy = new TypeTextWithElementStrategy();
        var instructions = "Type \"$someText\" into <#element>";
        
        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.setValue(\"#element\", someText);");
        });          
    });      
              
});

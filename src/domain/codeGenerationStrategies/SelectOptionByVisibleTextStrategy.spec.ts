"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {SelectOptionByVisibleTextStrategy} from "./SelectOptionByVisibleTextStrategy";

describe("when converting pepino-lang instructions to select an option by visible text from a list", () => {

    var strategy = new SelectOptionByVisibleTextStrategy();
        
    describe("without variable", () => {
            
        var instructions = "Select option named \"apple\" from <#fruit>";
        
        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;    
        });
        
        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;    
        });
        
        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.selectByVisibleText(\"#fruit\", \"apple\");");
        });          
    });      
    
    describe("with variable in element", () => {
            
        var instructions = "Select option named \"apple\" from <$fruit>";
        
        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.selectByVisibleText(fruit, \"apple\");");
        });          
    });      
    
    describe("with variable in option name", () => {
            
        var instructions = "Select option named \"$apple\" from <#fruit>";
        
        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.selectByVisibleText(\"#fruit\", apple);");
        });          
    });      
              
});

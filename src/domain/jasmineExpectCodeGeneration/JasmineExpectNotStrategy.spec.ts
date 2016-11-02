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

		it("should pass on unrecognized instructions with checked", () => {
            var similar_instructions = "Verify <#results> to be checked";    
            expect(strategy.canGenerate(similar_instructions)).to.be.false;    
        });
        
        it("should convert the assert to jasmine expect code", () => {
            var expectedJSCommand = "var content = this.browser.getText(\"#results\");\n\n\
            if(Object.prototype.toString.call(content) === '[object Array]') {\n\
                expect(content.join()).toNotContain(\"something\");\n\
            } else {\n\
                expect(content).toNotContain(\"something\");\n\
            }";           
            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);
        });               
    });

    describe("with variable in the contents", () => {
        
        var instructions = "Verify \"$someString\" is not in <#results> element";
        
        it("should convert the assert to jasmine expect code with correct variable name", () => {
            var expectedJSCommand = "var content = this.browser.getText(\"#results\");\n\n\
            if(Object.prototype.toString.call(content) === '[object Array]') {\n\
                expect(content.join()).toNotContain(someString);\n\
            } else {\n\
                expect(content).toNotContain(someString);\n\
            }";           
            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");   
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);
        });  
    });
    
    describe("with variable in the element", () => {
        var instructions = "Verify \"someString\" is in <$someElement> element";
        
        it("should convert the assert to jasmine expect code with correct variable element", () => {
            var expectedJSCommand = "var content = this.browser.getText(someElement);\n\n\
            if(Object.prototype.toString.call(content) === '[object Array]') {\n\
                expect(content.join()).toNotContain(\"someString\");\n\
            } else {\n\
                expect(content).toNotContain(\"someString\");\n\
            }";  
            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);
        });  
    });

    describe('When instruction has global value', () => {
        var instructions = "Verify globalvalue \"someString\" is in <$someElement> element";

        it('should convert the step to cucumberjs code', () => {
            var expectedJSCommand = "var content = this.browser.getText(someElement);\n\n\
            if(Object.prototype.toString.call(content) === '[object Array]') {\n\
                expect(content.join()).toNotContain(globalValues[\'somestring\']);\n\
            } else {\n\
                expect(content).toNotContain(globalValues[\'somestring\']);\n\
            }";  
            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);
        });
    });     
});
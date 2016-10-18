"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectStrategy} from "./JasmineExpectStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect assertion", () => {

    describe("without variables", () => {
        var strategy = new JasmineExpectStrategy();
        var instructions = "Verify \"something\" is in <#results> element";

        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should pass on 'expect not' instructions", () => {
            var similar_instructions = "Verify \"something\" is not in <#results> element";
            expect(strategy.canGenerate(similar_instructions)).to.be.false;
        });

        it("should pass on 'selected option' instructions", () => {
            var similar_instructions = "Verify \"something\" is selected in <#results> element";
            expect(strategy.canGenerate(similar_instructions)).to.be.false;
        });

        it("should convert the assert to jasmine expect code", () => {
            var expectedJSCommand = "var content = this.browser.getText(\"#results\");\n\n\
            if(Object.prototype.toString.call(content) === '[object Array]') {\n\
                expect(content.join()).toContain(\"something\");\n\
            } else {\n\
                expect(content).toContain(\"something\");\n\
            }";           
            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);
        });
    });

    describe("with variable in the contents", () => {
        var strategy = new JasmineExpectStrategy();
        var instructions = "Verify \"$someString\" is in <#results> element";

        it("should convert the assert to jasmine expect code with correct variable contents", () => {
            var expectedJSCommand = "var content = this.browser.getText(\"#results\");\n\n\
            if(Object.prototype.toString.call(content) === '[object Array]') {\n\
                expect(content.join()).toContain(someString);\n\
            } else {\n\
                expect(content).toContain(someString);\n\
            }";           
            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");   
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);
        });
    });

    describe("with variable in the element", () => {
        var strategy = new JasmineExpectStrategy();
        var instructions = "Verify \"someString\" is in <$someElement> element";

        it("should convert the assert to jasmine expect code with correct variable element", () => {
            var expectedJSCommand = "var content = this.browser.getText(someElement);\n\n\
            if(Object.prototype.toString.call(content) === '[object Array]') {\n\
                expect(content.join()).toContain(\"someString\");\n\
            } else {\n\
                expect(content).toContain(\"someString\");\n\
            }";  
            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);
        });
    });
});

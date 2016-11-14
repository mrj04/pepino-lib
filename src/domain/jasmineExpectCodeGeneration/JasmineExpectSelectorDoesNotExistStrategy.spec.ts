"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectSelectorDoesNotExistStrategy} from "./JasmineExpectSelectorDoesNotExistStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect assertion", () => {
    describe("without variables", () => {
        const strategy = new JasmineExpectSelectorDoesNotExistStrategy();
        const instructions = "Verify <#object> does not exist";

        it("should be able to generate css property instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should convert the assert to jasmine expect code", () => {
            var expectedJSCommand = 
            "try {\n\
                expect(browser.isVisible(\"#object\")).toEqual(false);\n\
            } catch (error) {\n\
                if (\"#object\" === '') {\n\
                    expect(false).toEqual(false);\n\
                } else {\n\
                    expect(error).toEqual(false);\n\
                }\n\
            }"

            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);
        });
    });

    describe("with variable in the object", () => {
        const strategy = new JasmineExpectSelectorDoesNotExistStrategy();
        const instructions = "Verify <$object> does not exist";

        it("should convert the assert to jasmine expect code with correct variable object", () => {
            var expectedJSCommand = 
            "try {\n\
                expect(browser.isVisible(object)).toEqual(false);\n\
            } catch (error) {\n\
                if (object === '') {\n\
                    expect(false).toEqual(false);\n\
                } else {\n\
                    expect(error).toEqual(false);\n\
                }\n\
            }"

            var cleanedExpectedJSCommand = expectedJSCommand.replace(/\s+/g," ");
            var results = strategy.generate(instructions).replace(/\s+/g," ");

            expect(results).to.equal(cleanedExpectedJSCommand);            
        });
    });
});

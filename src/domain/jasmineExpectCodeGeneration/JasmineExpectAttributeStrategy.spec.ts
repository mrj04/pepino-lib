"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectAttributeStrategy} from "./JasmineExpectAttributeStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect assertion", () => {
    describe("without variables", () => {
        const strategy = new JasmineExpectAttributeStrategy();
        const instructions = "Verify that object <#object> has attribute \"attribute\"";

        it("should be able to generate css property instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should pass on attribute with value", () => {
            expect(strategy.canGenerate("Verify that object \"object\" has attribute \"attribute\" with value \"value\"")).to.be.false;
        });

        it("should convert the assert to jasmine expect code", () => {
            expect(strategy.generate("Verify that object <#object> has attribute \"attribute\""))
                .to.equal("expect(browser.getAttribute(\"#object\", \"attribute\")).not.toBeNull();");
        });
    });

    describe("with variable in the object", () => {
        const strategy = new JasmineExpectAttributeStrategy();
        const instructions = "Verify that object <$object> has css property \"attribute\"";

        it("should convert the assert to jasmine expect code with correct variable object", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getAttribute(object, \"attribute\")).not.toBeNull();");
        });
    });

    describe("with variable in the property", () => {
        const strategy = new JasmineExpectAttributeStrategy();
        const instructions = "Verify that object <#object> has css property \"$attribute\"";

        it("should convert the assert to jasmine expect code with correct variable property", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getAttribute(\"#object\", attribute)).not.toBeNull();");
        });
    });

    describe("with variable in the value", () => {
        const strategy = new JasmineExpectAttributeStrategy();
        const instructions = "Verify that object <#object> has css property \"attribute\"";

        it("should convert the assert to jasmine expect code with correct variable value", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getAttribute(\"#object\", \"attribute\")).not.toBeNull();");
        });
    });
});

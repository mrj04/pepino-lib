"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {TypeTextWithElementStrategy} from "./TypeTextWithElementStrategy";

describe("Type Text With Element Strategy", () => {

    var strategy = new TypeTextWithElementStrategy();

    describe("without variable", () => {

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

    describe("with element that contains quotes", () => {

        var instructions = "Type \"$someText\" into <input[name=\"something\"]>";

        it("should escape the quotes", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.setValue(\"input[name=\\\"something\\\"]\", someText);");
        });
    });

    describe("with variable", () => {

        var instructions = "Type \"$someText\" into <#element>";

        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.setValue(\"#element\", someText);");
        });
    });

    describe('When instruction has generator date', () => {
        it('should not generate code because of invalid generator type', () => {
            expect(strategy.canGenerate('type $gen:email3 into <element>')).to.be.false;
        });

        it('should generate code with valid generator type', () => {
            expect(strategy.canGenerate('type $gen:email into <element>')).to.be.true;
        });

        it('should convert the step to cucumberjs code', () => {
            var code = strategy.generate('type $gen:email into <element>');
            console.log(code);
            expect(code.length).to.not.equal(0);
        });
    });

});

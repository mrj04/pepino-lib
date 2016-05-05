"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {TypeTextWithoutElementStrategy} from "./TypeTextWithoutElementStrategy";

describe("when converting pepino-lang instructions to type text with no target element", () => {

    var strategy = new TypeTextWithoutElementStrategy();
    var instructions = "Type \"some text\"";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should pass on instructions including element", () => {
        expect(strategy.canGenerate("Type \"some text\" into <#element>")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions)).to.equal("this.browser.keys(\"some text\");");
    });

    describe("with variable", () => {

        var strategy = new TypeTextWithoutElementStrategy();
        var instructions = "Type \"$someText\"";

        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.keys(someText);");
        });
    });
});

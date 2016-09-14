"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {AddValueToElementStrategy} from "./AddValueToElementStrategy";

describe("when converting pepino-lang instructions to add a value to a dropdown an element", () => {

    var strategy = new AddValueToElementStrategy();
    var instructions = "Add \"value\" to <#element>";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.addValue(\"#element\", \"value\");");
    });
});

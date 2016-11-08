"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {MoveMouseToElementStrategy} from "./MoveMouseToElementStrategy";

describe("when converting pepino-lang instructions to move mouse to an element", () => {

    var strategy = new MoveMouseToElementStrategy();
    var instructions = "Move Mouse To <#element>";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass an unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("client.moveToObject(\"#element\");");
    });
});

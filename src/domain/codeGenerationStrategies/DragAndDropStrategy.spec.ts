"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {DragAndDropStrategy} from "./DragAndDropStrategy";

describe("when converting pepino-lang instructions to click an element", () => {

    var strategy = new DragAndDropStrategy();
    var instructions = "Drag <#elementOne> and drop it to <#elementTwo>";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.dragAndDrop(\"#elementOne\", \"#elementTwo\");");
    });
});

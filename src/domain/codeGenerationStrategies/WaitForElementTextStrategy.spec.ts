"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {WaitForElementTextStrategy} from "./WaitForElementTextStrategy";

describe("when converting pepino-lang instructions to wait for an element", () => {

    var strategy = new WaitForElementTextStrategy();
    var validInstructions = "Wait for <#elm> to have content";
    var unrecognizedInstructions = "Wait for <#elm> to be visible";

    it("should be able to generate for wait instructions", () => {
        expect(strategy.canGenerate(validInstructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate(unrecognizedInstructions)).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(validInstructions)).to.equal("this.browser.waitForText(\"#elm\", 5000);")
    });
});

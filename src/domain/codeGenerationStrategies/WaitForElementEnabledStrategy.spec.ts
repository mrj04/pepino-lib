"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {WaitForElementEnabledStrategy} from "./WaitForElementEnabledStrategy";

describe("when converting pepino-lang instructions to wait for an element", () => {

    var strategy = new WaitForElementEnabledStrategy();
    var validInstructions = "Wait for <#elm> to be enabled";
    var unrecognizedInstructions = "Wait for <#elm> to be visible";

    it("should be able to generate for wait instructions", () => {
        expect(strategy.canGenerate(validInstructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate(unrecognizedInstructions)).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(validInstructions)).to.equal("this.browser.waitForEnabled(\"#elm\", 60000);")
    });
});

"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {WaitForElementVisibleStrategy} from "./WaitForElementVisibleStrategy";

describe("when converting pepino-lang instructions to wait for an element", () => {

    var strategy = new WaitForElementVisibleStrategy();
    var text = "Wait for <#elm> to be visible";

    it("should be able to generate for wait instructions", () => {
        expect(strategy.canGenerate(text)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(text)).to.equal(`this.browser.waitForExist(\"#elm\", 60000);\n\t\tthis.browser.waitForVisible(\"#elm\", 60000);`)
    });
});

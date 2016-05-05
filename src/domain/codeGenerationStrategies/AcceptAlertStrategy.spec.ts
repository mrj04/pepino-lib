"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {AcceptAlertStrategy} from "./AcceptAlertStrategy";

describe("when converting pepino-lang instructions to accept an alert", () => {

    var strategy = new AcceptAlertStrategy();
    var instructions = "Accept alert";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should pass on similar dismiss instructions", () => {
        expect(strategy.canGenerate("Dismiss alert")).to.be.false;
    });

    it("should pass on similar accept instructions", () => {
        expect(strategy.canGenerate("Accept confirmation")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.alertAccept();");
    });
});

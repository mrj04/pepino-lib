"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {WindowSizeStrategy} from "./WindowSizeStrategy";

describe("when converting pepino-lang instructions to maximize the window browser", () => {

    var strategy = new WindowSizeStrategy();
    var instructions = "Window Size \"Maximize\"";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.windowHandleMaximize();");
    });
});

describe("when converting pepino-lang instructions to resize the window browser to 1024x768", () => {

    var strategy = new WindowSizeStrategy();
    var instructions = "Window Size \"1024x768\"";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.windowHandleSize({width:1024,height:768});");
    });
});

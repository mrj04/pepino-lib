"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {ClickElementStrategy} from "./ClickElementStrategy";

describe("when converting pepino-lang instructions to click an element", () => {
    
    var strategy = new ClickElementStrategy();
    var instructions = "Click <#element>";
    
    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;    
    });
    
    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;    
    });
    
    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.click(\"#element\");");
    });               
});

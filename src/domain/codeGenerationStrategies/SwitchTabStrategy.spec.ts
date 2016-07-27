"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {SwitchTabStrategy} from "./SwitchTabStrategy";

describe("when switching to another tab", ()=> {

    var strategy = new SwitchTabStrategy();

    describe("without variable", () => {

        var text = "Switch to \"some tab\" tab";

        it("should be able to generate for navigation instructions", () => {
            expect(strategy.canGenerate(text)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should pass on similar instructions", () => {
            expect(strategy.canGenerate("Switch to \"something\" window")).to.be.false;
        });

        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(text)).to.contain("switchTab(this.browser, \"some tab\")");
        });
    });

    describe("with tab name variable", () => {

        var text = "Switch to \"$tabName\" tab";

        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(text)).to.contain("switchTab(this.browser, tabName)");
        });
    });

});
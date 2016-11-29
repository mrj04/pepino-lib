"use strict";
import chai = require("chai");
const expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {ScrollToSelectorStrategy} from "./ScrollToSelectorStrategy";

describe("The scroll to selector strategy", () => {
    describe("when scrolling to a selector", () => {

        const strategy = new ScrollToSelectorStrategy();

        describe("without variable", () => {

            const text = "Scroll to <#someSelector>";

            it("should be able to generate for scrolling instructions", () => {
                expect(strategy.canGenerate(text)).to.be.true;
            });

            it("should pass on unrecognized instructions", () => {
                expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
            });

            it("should convert the step to cucumberjs code", () => {
                expect(strategy.generate(text).replace(/\s+/g, '')).to.equal(
                    `this.browser.scroll(\"#someSelector\");
                    this.browser.waitUntil(function(){
                        return this.isVisibleWithinViewport(\"#someSelector\");
                    });`.replace(/\s+/g, ''));
            });
        });

        describe("with selector variable", () => {

            const text = "Scroll to <$someSelector>";

            it("should convert the step to cucumberjs code", () => {
                expect(strategy.generate(text).replace(/\s+/g, '')).to.equal(
                    `this.browser.scroll(someSelector);
                    this.browser.waitUntil(function(){
                        return this.isVisibleWithinViewport(someSelector);
                    });`.replace(/\s+/g, ''));
            });
        });
    });
});
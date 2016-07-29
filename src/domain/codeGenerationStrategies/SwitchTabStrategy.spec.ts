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

    describe("the function to switch tabs by name", () => {

        it("should find the correct tab and switch", () => {
            var text = "Switch to \"tab3\" tab";
            var code = strategy.generate(text)
            var tabIds = ['tab1', 'tab2', 'tab3'];
            var currentTabId = 'tab1';
            this.browser = {
                getCurrentTabId: () => { return currentTabId; },
                switchTab: (tabId: string) => {
                    currentTabId = tabId;
                },
                getTitle: () => { return currentTabId; },
                getTabIds: () => { return tabIds; },
            };

            eval(code);

            expect(this.browser.getCurrentTabId()).to.equal('tab3');
        });

    })
});
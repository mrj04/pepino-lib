"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {NavigateStrategy} from "./NavigateStrategy";

describe("The navigate strategy", ()=> {

    var strategy = new NavigateStrategy();

    describe("when converting pepino-lang instructions to navigate to a url", () => {

        var text = "Navigate to \"http://mysite.com\"";

        it("should be able to generate for navigation instructions", () => {
            expect(strategy.canGenerate(text)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(text)).to.equal("this.browser.url(\"http://mysite.com\");")
        });

    });

     describe("when the url is a variable", () => {

        var text = "Navigate to \"$url\"";

        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(text)).to.equal("this.browser.url(url);");
        });
     });
});
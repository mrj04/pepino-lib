"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {NavigateStrategy} from "./NavigateStrategy";

describe("when converting pepino-lang instructions to navigate to a url", () => {
    
    var strategy = new NavigateStrategy();
    var text = "Navigate to http://mysite.com";
    
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

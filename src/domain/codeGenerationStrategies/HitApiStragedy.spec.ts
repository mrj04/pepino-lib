"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {HitApiStragedy} from "./HitApiStragedy";

describe("The hit api strategy", ()=> {

    var strategy = new HitApiStragedy();

    describe("when converting pepino-lang instructions to hit an api", () => {

        var text = "Hit api \"http://mysite.com\"";

        it("should be able to generate for hit instructions", () => {
            expect(strategy.canGenerate(text)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

    });

    describe("when the url is a variable", () => {

        var text = "Hit api \"$url\"";

        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(text)).to.contain("url");
        });
    });
});
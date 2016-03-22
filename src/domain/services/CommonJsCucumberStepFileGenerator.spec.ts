"use strict";
import chai = require("chai");
var expect = chai.expect;
import {Step} from "../../domain/Step";
import {ICodeGenerationStrategy} from "../../domain/ICodeGenerationStrategy";
import * as PepinoModule from "../../domain/services/CommonJsCucumberStepFileGenerator";

describe("The CommonJs Step File Generator", () => {

    describe("when generating a commonjs file", () => {

        var generator = new PepinoModule.Pepino.CommonJsCucumberStepFileGenerator();
        var code = generator.generate(new Array<string>("one", "two", "three"));

        var lines = code.split("\n");
        
        it("should generate a commonjs module", () => {
            expect(lines[0].trim()).to.equal("module.exports = function() {");
            expect(lines[lines.length - 1].trim()).to.equal("};");
        });
        
        it("should include the functions in the file with a blank line between each", () => {
           expect(lines[1].trim()).to.equal("one");
           expect(lines[3].trim()).to.equal("two");
           expect(lines[5].trim()).to.equal("three");
        });        
    });
});

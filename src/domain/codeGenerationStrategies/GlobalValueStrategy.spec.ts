"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {GlobalValueStrategy} from "./GlobalValueStrategy";

describe("when converting pepino-lang instructions to set global variable values", () => {

    var strategy = new GlobalValueStrategy();
    var instructions = "GlobalValue \"variable\" equals \"value\"";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should be able to generate typing instructions when lowercase is included", () => {
        expect(strategy.canGenerate(instructions + " lowercase")).to.be.true;
    });

    it("should be able to generate typing instructions when uppercase is included", () => {
        expect(strategy.canGenerate(instructions + " uppercase")).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code when value is hardcoded", () => {
        expect(strategy.generate(instructions))
            .to.equal("globalValues['variable'] = 'value';");
    });

    it("should convert the step to cucumberjs code when value is random", () => {
        var code: string = strategy.generate(instructions);

        expect(code.indexOf("globalValues['variable'] = '"))
            .to.not.equal(-1);
    });
    
    it("should convert the step to cucumberjs code when value is random and lowercase " +
       "command is included", () => {
        var code: string = strategy.generate(instructions + " lowercase");

        expect(code.indexOf("globalValues['variable'] = '"))
            .to.not.equal(-1);
    });   

    it("should convert the step to cucumberjs code when value is random and uppercase " +
       "command is included", () => {
        var code: string = strategy.generate(instructions + " uppercase");

        expect(code.indexOf("globalValues['variable'] = '"))
            .to.not.equal(-1);
    });        
});

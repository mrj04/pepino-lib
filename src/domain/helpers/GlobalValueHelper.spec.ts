"use strict";
import chai = require("chai");
var expect = chai.expect;
import {GlobalValueHelper} from "./GlobalValueHelper";

describe("Global Value Helper", () => {
    var instruction = "GlobalValue \"variable\"";

    describe('When trying to generate cucumber js code', () => {
        it('Should return code as string', () => {
            expect(GlobalValueHelper.generate(instruction)).to.equal("globalValues['variable']");
        });
    });
});

    
"use strict";
import chai = require("chai");
var expect = chai.expect;


import * as backend  from "./BackendStepFileGenerator";

var generator = new backend.Pepino.BackendStepFileGenerator();


describe("Backend file generator", ()=> {

    describe("When generating backen step file", ()=>{
        
        var funcionts = new Array<string>("one", "two", "three")
 
        var code = generator.generate(funcionts);
        
      
        it("should generate a commonjs module", () => {
            expect(code).to.contain("module.exports = function() {//");
            expect(code).to.contain(funcionts[0]);
            expect(code).to.contain(funcionts[1]);
            expect(code).to.contain(funcionts[2]);
        });    

    });
});
"use strict";
import chai = require("chai");
var expect = chai.expect;
import {VariableHelper} from "./VariableHelper";

describe("The Variable Helper",  () => {
    
    describe("when getting a string for injection into javascript", () => {

        describe("without variable", () => {
            
            it("should return the same string wrapped in quotes", () => {
                expect(VariableHelper.getString("hello")).to.equal("\"hello\"");                
            });            
        });
        
        describe("with variable", () => {
            
            it("should return the variable name", () => {
                expect(VariableHelper.getString("$someVariable")).to.equal("someVariable");                
            });            
        });
        
        describe("with undefined", () => {
            
            it("should return an empty string", () => {
                expect(VariableHelper.getString(undefined)).to.equal("");                
            });            
        });                   
    });    
});
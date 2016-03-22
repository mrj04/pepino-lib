"use strict";
import chai = require("chai");
var expect = chai.expect;
import {StringHelper} from "./StringHelper";

describe("The String Helper",  () => {
    describe("when capitalizing the first letter", () => {

        it("return a one word with the first letter capitalized", (done) => {
            expect(StringHelper.capitalizeFirstLetter("something")).to.equal("Something");
            done();
        });
        
        it("return a multiple words with the first letter capitalized", (done) => {
            expect(StringHelper.capitalizeFirstLetter("here are multiple words")).to.equal("Here are multiple words");
            done();
        });    
    });
    
    describe("when extracting text between greater than and less than symbols", () => {

        it("should be able to extract one word", (done) => {
            expect(StringHelper.extractTextInGreaterThanLessThan("this text is in <brackets>")[0]).to.equal("brackets");
            done();
        });
        
        it("should be able to extract multiple words", (done) => {
            expect(StringHelper.extractTextInGreaterThanLessThan("this text is <in brackets>")[0]).to.equal("in brackets");
            done();
        });
        
        it("should be able to extract multiple bracketed words", (done) => {
            expect(StringHelper.extractTextInGreaterThanLessThan("this text is <in brackets>")[0]).to.equal("in brackets");
            done();
        });
        
        it("should return an empty array when no symbols exist", (done) => {
            expect(StringHelper.extractTextInGreaterThanLessThan("no symbols").length).to.equal(0);
            done();
        });
    });

    describe("when extracting text between quotes", () => {

        it("should be able to extract one word", (done) => {
                expect(StringHelper.extractTextInQuotes("this text is in \"quotes\"")[0]).to.equal("quotes");
                done();
        });
        
        it("should be able to extract multiple words", (done) => {
                expect(StringHelper.extractTextInQuotes("this text is \"in quotes\"")[0]).to.equal("in quotes");
                done();
        });
        
        it("should be able to extract multiple quoted strings", (done) => {
                expect(StringHelper.extractTextInQuotes("this text is \"in quotes\" and \"and this in quotes\"")[1])
                    .to.equal("and this in quotes");
                done();
        });
        
        it("should return an empty array when no quotes exist", (done) => {
                expect(StringHelper.extractTextInQuotes("no quotes").length).to.equal(0);
                done();
        });
    });
});
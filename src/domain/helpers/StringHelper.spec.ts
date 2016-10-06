"use strict";
import chai = require("chai");
var expect = chai.expect;
import {StringHelper} from "./StringHelper";

describe("The String Helper",  () => {

    describe("when checking a string for non-token contents where does not contain string", () =>  {

        it("should return false when it can't find a simple string inside the text", () => {
            expect(StringHelper.containsNonTokenText("something", "blue")).to.be.false;
        });
    });

    describe("when checking a string for non-token contents", () =>  {

        it("should be able to find a simple string without case sensitivity", () => {
            expect(StringHelper.containsNonTokenText("sOmEthIng", "some")).to.be.true;
        });

        it("should be able to find a simple string inside the text", () => {
            expect(StringHelper.containsNonTokenText("something", "some")).to.be.true;
        });

        it("should return true when contents is outside a quoted token", () => {
            expect(StringHelper.containsNonTokenText("hey, something is \"here\"", "some")).to.be.true;
        });

        it("should return false when contents is inside a quoted token", () => {
            expect(StringHelper.containsNonTokenText("hey, something is \"here\"", "here")).to.be.false;
        });
    });

    describe("when capitalizing the first letter", () => {

        it("return a one word with the first letter capitalized", () => {
            expect(StringHelper.capitalizeFirstLetter("something")).to.equal("Something");
        });

        it("return a multiple words with the first letter capitalized", () => {
            expect(StringHelper.capitalizeFirstLetter("here are multiple words")).to.equal("Here are multiple words");
        });
    });

    describe("when escaping quotes", () => {

        it("should return the same string with escaped quotes", () => {
            expect(StringHelper.escapeQuotes("Some \"string\" in quotes")).to.equal("Some \\\"string\\\" in quotes");
        });
    });

    describe("when extracting text between greater than and less than symbols", () => {

        it("should be able to extract one word", () => {
            expect(StringHelper.extractTextInGreaterThanLessThan("this text is in <brackets>")[0]).to.equal("brackets");
        });

        it("should be able to extract multiple words", () => {
            expect(StringHelper.extractTextInGreaterThanLessThan("this text is <in.brackets>")[0]).to.equal("in.brackets");
        });

        it("should be able to extract multiple bracketed words", () => {
            expect(StringHelper.extractTextInGreaterThanLessThan("this text is <in[brackets]>")[0]).to.equal("in[brackets]");
        });

        it("should return an empty array when no symbols exist", () => {
            expect(StringHelper.extractTextInGreaterThanLessThan("no symbols").length).to.equal(0);
        });
    });

    describe("when extracting text between quotes", () => {

        it("should be able to extract one word", () => {
                expect(StringHelper.extractTextInQuotes("this text is in \"quotes\"")[0]).to.equal("quotes");
        });

        it("should be able to extract multiple words", () => {
                expect(StringHelper.extractTextInQuotes("this text is \"in quotes\"")[0]).to.equal("in quotes");
        });

        it("should be able to extract multiple quoted strings", () => {
                expect(StringHelper.extractTextInQuotes("this text is \"in quotes\" and \"and this in quotes\"")[1])
                    .to.equal("and this in quotes");
        });

        it("should return an empty array when no quotes exist", () => {
                expect(StringHelper.extractTextInQuotes("no quotes").length).to.equal(0);
        });
    });

    describe('When extracting id from text', () => {
        it('Should be able to extract one word', () => {
            expect(StringHelper.extractId('#id')).to.be.equal('id');
        });

        it('Should not be able to extract anything if no number sign was found', () => {
            expect(StringHelper.extractId('id')).to.be.equal('');
        });
    });

    describe('When extracting classname from text', () => {
        it('Should be able to extract one word', () => {
            expect(StringHelper.extractClassname('.classname')).to.be.equal('classname');
        });

        it('Should not be able to extract anything if no number sign was found', () => {
            expect(StringHelper.extractClassname('classname')).to.be.equal('');
        });
    });
});
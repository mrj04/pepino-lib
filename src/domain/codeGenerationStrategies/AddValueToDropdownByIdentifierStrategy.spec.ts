"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {AddValueToDropdownByIdentifierStrategy} from "./AddValueToDropdownByIdentifierStrategy";

describe("when converting pepino-lang instructions to add a value to a dropdown by identifier", () => {

    var strategy = new AddValueToDropdownByIdentifierStrategy();
    var instructions = "Add \"value\" to dropdown that has identifier \"element\"";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    describe('Evaluating parts(non variables) of the step', () => {
        describe('When first part of the step is not present', () => {
            it("should not be able to generate de code", () => {
                expect(strategy.canGenerate("\"value\" to dropdown that has identifier <#element>")).to.be.false;
            });
        });

        describe('When second part of the step', () => {
            it("should not be able to generate the code", () => {
                expect(strategy.canGenerate("add \"value\"<#element>")).to.be.false;
            });
        });
    });

    it("should convert the step to cucumberjs code", () => {
        var expectedJSCommand = "var value = \"value\";\n\
            var element = \"element\";\n\n\
            this.browser.execute(function(a, b){\n\
                var objectFound = document.getElementById(b);\n\
                var option = document.createElement('option');\n\
                option.setAttribute('value', a);\n\
                var textnode = document.createTextNode(a);\n\
                option.appendChild(textnode);\n\
                objectFound.appendChild(option);\n\
            },value, element);";
        
        var cleanedExpectedJSCommand = expectedJSCommand.replace(/(\t\r\n|\n|\r|\t)/gm,"");
        var results = strategy.generate(instructions).replace(/(\t\r\n|\n|\r|\t)/gm,"");

        expect(results)
            .to.equal(cleanedExpectedJSCommand);
    });
});

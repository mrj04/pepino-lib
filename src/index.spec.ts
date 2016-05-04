"use strict";
import chai = require("chai");
var expect = chai.expect;
var converter = require("./index");

describe("The index", () => {

    describe("when converting a normal step file", () => {

        var stepText = `
            I have navigated to the search screen
              Navigate to http://mysite.com

            I search for "$SearchTerm"
              Type "$SearchTerm" into <#search> element
              Click the <#submit> button

            I should find "$ExpectedResult" in the results
              Verify "$ExpectedResult" is in <#results> element
        `;

        var cucumberJs = converter.convert(stepText);

        it("should generate a the cucumberJs code", () => {
            expect(cucumberJs).to.contain("defineStep(/^I have navigated to the search screen");
        });
    });

    describe("when converting a step file with select elements", () => {

        var stepText = `
            the value of "$selectElement" should be "$elementValue"
                Verify the value "$elementValue" is selected in <$selectElement>

            the selected option of "$selectElement" should be "$elementValue"
                Verify "$elementValue" is selected in <$selectElement>
        `;

        var cucumberJs = converter.convert(stepText);

        it("should generate a the cucumberJs code got get value", () => {
            expect(cucumberJs).to.contain("expect(browser.getValue(selectElement + \" option:checked\")).toContain(elementValue);");
        });

        it("should generate a the cucumberJs code got get text", () => {
            expect(cucumberJs).to.contain("expect(browser.getText(selectElement + \" option:checked\")).toContain(elementValue);");
        });
    });
});

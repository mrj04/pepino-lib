"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectContainerHasElementStrategy} from "./JasmineExpectContainerHasElementStrategy";

describe('JasmineExpectContainerHasElementStrategy', () => {
    var strategy = new JasmineExpectContainerHasElementStrategy();
    describe('When verifying step instruction', () => {
        it('should be able to generate code if instruction was correctly written', () => {
            expect(strategy.canGenerate('verify \"container\" contains \"element\"')).to.be.true;
        });

        it('should not be able to generate code if word "verify" is missing', () => {
            expect(strategy.canGenerate('\"container\" contains \"element\"')).to.be.false;
        });

        it('should not be able to generate code if word "contains" is missing', () => {
            expect(strategy.canGenerate('verify \"container\"  \"element\"')).to.be.false;
        });
    });

    describe('When converting step instruction to a jasmine-style code', () => {
        it('should convert it successfully', () => {
            var convertedInstruction = strategy.generate('verify <$container> contains <$element>');
            var expectedCode = "var container = container;\n\
            var expectedElement = element;\n\
            var element;\n\
            element = this.browser.execute(function(a, b){\n\t\
            return document.querySelector(a + \" \" + b);\n\t\
            });\n\
            expect(element.value).not.toBe(null);";
            
            expect(convertedInstruction.replace(/(\s\t\r\n|\n|\r|\t|\s)/gm,""))
                .to.be.equal(expectedCode.replace(/(\s\t\r\n|\n|\r|\t|\s)/gm,""));
        });
    });
});

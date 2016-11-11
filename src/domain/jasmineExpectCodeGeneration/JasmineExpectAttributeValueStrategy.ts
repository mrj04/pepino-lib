"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";
import {StepHelper} from "../helpers/StepHelper";

export class JasmineExpectAttributeValueStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const hasAttribute = lowercase.indexOf("has attribute") > -1;
        const hasValue = lowercase.indexOf("value") > -1;
        return lowercase.startsWith("verify ") && hasAttribute && hasValue;
    }

    generate(text: string): string {
        const element = StepHelper.extractSelector(text, 0);
        var startIndex = text.toLowerCase().indexOf("has attribute");
        text = text.substring(startIndex);
        const attribute = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        text = text.substring(text.lastIndexOf(attribute) + attribute.length + 1);
        const value = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);

        return `expect(browser.getAttribute(${element}, ${attribute})).toEqual(${value});`;
    }
}

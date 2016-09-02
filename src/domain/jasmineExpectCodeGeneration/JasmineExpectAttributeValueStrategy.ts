"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectAttributeValueStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const hasAttribute = lowercase.indexOf("attribute") > -1;
        const hasValue = lowercase.indexOf("value") > -1;
        return lowercase.startsWith("verify ") && hasAttribute && hasValue;
    }

    generate(text: string): string {
        const object = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        text = text.substring(text.lastIndexOf(object) + object.length + 1);
        const attribute = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        text = text.substring(text.lastIndexOf(attribute) + attribute.length + 1);
        const value = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);

        return `expect(browser.getAttribute(${object}, ${attribute})).toEqual(${value});`;
    }
}

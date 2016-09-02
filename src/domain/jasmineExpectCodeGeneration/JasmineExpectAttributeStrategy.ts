"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectAttributeStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const hasAttribute = lowercase.indexOf("attribute") > -1;
        const hasValue = lowercase.indexOf("value") > -1;
        return lowercase.startsWith("verify ") && hasAttribute && !hasValue;
    }

    generate(text: string): string {
        let element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        text = text.substring(text.lastIndexOf(element) + element.length + 1);
        const attribute = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);

        return `expect(browser.getAttribute(${element}, ${attribute})).not.toBeNull();`;
    }
}

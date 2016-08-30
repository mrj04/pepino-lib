"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectElementIsNotSelectedStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const isChecked = lowercase.indexOf("checked") > -1;
		const hasNegator = lowercase.indexOf(" not ") > -1;
        return lowercase.startsWith("verify ") && isChecked && hasNegator;
    }

    generate(text: string): string {
        const element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        return "expect(browser.element(" + element + ").isSelected()).toBe(false);";
    }
}

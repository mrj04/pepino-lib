"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectSelectionValueStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var isVerifyingOption = StringHelper.containsNonTokenText(lowercase, "selected");
        var isVerifyingValue = StringHelper.containsNonTokenText(lowercase, "value");
        return lowercase.startsWith("verify ") && isVerifyingOption && isVerifyingValue;
    }

    generate(text: string): string {
        var element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0], " option:checked");
        var contents = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        return "expect(browser.getValue(" + element + ")).toContain(" + contents + ");";
    }
}

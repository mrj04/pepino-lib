"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var hasNegator = lowercase.indexOf(" not ") > -1;
        var isVerifyingOption = lowercase.indexOf("selected in") > -1;
        var isChecked = lowercase.indexOf("checked") > -1;
        var isTitle = lowercase.indexOf("title") > -1;
        var hasAlert = lowercase.indexOf("alert") > -1;
        var hasText = lowercase.indexOf("text") > -1;
        var hasUrl = lowercase.indexOf("url") > -1;
        return lowercase.startsWith("verify ") && !hasNegator && !isVerifyingOption && !isChecked && 
            !isTitle && !hasAlert && !hasText && !hasUrl;
    }

    generate(text: string): string {
        var element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        var contents = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        return "expect(browser.getText(" + element + ").join()).toContain(" + contents + ");";
    }
}

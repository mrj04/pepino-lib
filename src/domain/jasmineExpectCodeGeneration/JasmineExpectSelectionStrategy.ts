"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectSelectionStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var isVerifyingOption = lowercase.indexOf("selected in") > -1;
        var isVerifyingValue = lowercase.indexOf("value") > -1;
        return lowercase.startsWith("verify ") && isVerifyingOption && !isVerifyingValue;        
    }

    generate(text: string): string {
        var element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0], " option:checked");        
        var contents = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);        
        return "expect(browser.getText(" + element + ")).toContain(" + contents + ");";        
    }
}

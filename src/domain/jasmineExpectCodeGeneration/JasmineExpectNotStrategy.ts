"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectNotStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var isVerify = lowercase.startsWith("verify ");
        var hasNegator = lowercase.indexOf(" not ") > -1;
        return isVerify && hasNegator;
    }

    generate(text: string): string {
        var shouldEqual = StringHelper.extractTextInQuotes(text);
        var element = StringHelper.extractTextInGreaterThanLessThan(text);
        var contents = VariableHelper.getString(shouldEqual[0]);
        return "expect(browser.getText(\"" + element + "\").join()).toNotContain(" + contents + ");";        
    }
}

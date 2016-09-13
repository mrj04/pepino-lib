"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectEmptyValueStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var isVerify = lowercase.startsWith("verify ");
        var hasIs = lowercase.indexOf(" is ") > -1;
        var isEmpty = lowercase.indexOf("empty") > -1;
        return isVerify && hasIs && isEmpty;
    }

    generate(text: string): string {
        var element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        return "expect(browser.getValue(" + element + ")).toEqual('');";
    }
}

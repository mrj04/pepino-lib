"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectUrlStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const hasUrl = lowercase.indexOf("url") > -1;
        return lowercase.startsWith("verify ") && hasUrl;
    }

    generate(text: string): string {
        const url = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        return `expect(browser.getUrl()).toEqual(${url});`;
    }
}

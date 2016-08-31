"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectTitleStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const isTitle = lowercase.indexOf("title") > -1;
        return lowercase.startsWith("verify ") && isTitle;
    }

    generate(text: string): string {
        const title = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        return `expect(browser.getTitle()).toEqual(${title});`;
    }
}

"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectAlertTextStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const hasAlert = lowercase.indexOf("alert") > -1;
        const hasText = lowercase.indexOf("text") > -1;
        return lowercase.startsWith("verify ") && hasAlert && hasText;
    }

    generate(text: string): string {
        const content = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        return `expect(browser.alertText()).toContain(${content});`;
    }
}

"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class PressKeyStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("press key ");
    }

    generate(text: string): string {
        var paramKeys = StringHelper.extractTextInQuotes(text);
        return "this.browser.keys(" + paramKeys + ");";
    }
}
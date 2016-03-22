"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class TypeTextWithoutElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("type ") 
            && lowercase.indexOf("into") === -1;
    }

    generate(text: string): string {
        var keys = StringHelper.extractTextInQuotes(text)[0];
        return "this.browser.keys(" + VariableHelper.getString(keys) + ");";
    }
}
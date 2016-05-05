"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {VariableHelper} from "../helpers/VariableHelper";
import {StringHelper} from "../helpers/StringHelper";

export class NavigateStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        return text.toLowerCase().startsWith("navigate to ");
    }

    generate(text: string): string {
        var urls = StringHelper.extractTextInQuotes(text);
        var contents = VariableHelper.getString(urls[0]);
        return "this.browser.url(" + contents + ");";
    }
}

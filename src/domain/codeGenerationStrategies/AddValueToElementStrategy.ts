"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class AddValueToElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var hasTo = lowercase.indexOf(" to ") > -1;
        return lowercase.startsWith("add ") && hasTo;
    }

    generate(text: string): string {
        var element = StringHelper.extractTextInGreaterThanLessThan(text);
        var values = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        return "this.browser.addValue(\"" + element + "\", " + values + ");";
    }
}

"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class ClickElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("click ");
    }

    generate(text: string): string {
        var element = StringHelper.extractTextInGreaterThanLessThan(text);
        return "this.browser.click(\"" + element + "\");";
    }
}

"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {VariableHelper} from "../helpers/VariableHelper";
import {StringHelper} from "../helpers/StringHelper";

export class ScrollToSelectorStrategy implements ICodeGenerationStrategy {
    canGenerate(text: string): boolean {
        const isScroll = StringHelper.containsNonTokenText(text, "scroll");
        return isScroll;
    }

    generate(text: string): string {
        const selector = StringHelper.extractTextInGreaterThanLessThan(text);
        const contents = VariableHelper.getString(selector[0]);

        const code = `this.browser.scroll(${contents});`;
        return code;
    }
}
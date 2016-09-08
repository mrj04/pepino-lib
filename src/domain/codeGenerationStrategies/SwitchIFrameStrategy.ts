"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class SwitchIFrameStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const hasIframe = StringHelper.containsNonTokenText(text, "iframe");
        return hasIframe;
    }

    generate(text: string): string {
        const element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        return `this.browser.frame(browser.element(${element}).value);`;
    }
}
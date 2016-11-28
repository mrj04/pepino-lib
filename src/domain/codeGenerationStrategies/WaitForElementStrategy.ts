"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";

export class WaitForElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        return text.toLowerCase().startsWith("wait for <") && text.toLowerCase().endsWith("> to be visible");
    }

    generate(text: string): string {
        var element = StepHelper.extractSelector(text, 0);
        return "this.browser.waitForExist(" + element + ", 60000);";
    }
}

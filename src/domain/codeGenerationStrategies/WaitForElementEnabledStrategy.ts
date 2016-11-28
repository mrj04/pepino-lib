"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";

export class WaitForElementEnabledStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        return text.toLowerCase().startsWith("wait for <") && text.toLowerCase().endsWith("> to be enabled");
    }

    generate(text: string): string {
        const element = StepHelper.extractSelector(text, 0);
        return `this.browser.waitForEnabled(${element}, 60000);`;
    }
}

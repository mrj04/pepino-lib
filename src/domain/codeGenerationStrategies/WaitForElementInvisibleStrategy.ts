"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";

export class WaitForElementInvisibleStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        return text.toLowerCase().startsWith("wait for <") && text.toLowerCase().endsWith("> to be invisible");
    }

    generate(text: string): string {
        const element = StepHelper.extractSelector(text, 0);
        return `this.browser.waitForVisible(${element}, 60000, true);`;
    }
}

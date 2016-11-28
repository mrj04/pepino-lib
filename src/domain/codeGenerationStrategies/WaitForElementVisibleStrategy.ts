"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";

export class WaitForElementVisibleStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        return text.toLowerCase().startsWith("wait for <") && text.toLowerCase().endsWith("> to be visible");
    }

    generate(text: string): string {
        const element = StepHelper.extractSelector(text, 0);
        return `this.browser.waitForExist(${element}, 60000);
		this.browser.waitForVisible(${element}, 60000);`;
    }
}

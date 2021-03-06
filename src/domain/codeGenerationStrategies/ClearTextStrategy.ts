"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";

export class ClearTextStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("clear ");
    }

    generate(text: string): string {
        var element = StepHelper.extractSelector(text, 0);
        return "this.browser.clearElement(" + element + ");";
    }
}

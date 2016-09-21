"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";

export class RightClickElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("right click ");
    }

    generate(text: string): string {
        var element = StepHelper.extractSelector(text, 0);
        return "this.browser.rightClick(" + element + ");";
    }
}

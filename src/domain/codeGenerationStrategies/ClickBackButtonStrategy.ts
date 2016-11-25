"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";

export class ClickBackButtonStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("click back button");
    }

    generate(text: string): string {
        return "this.browser.back();";
    }
}

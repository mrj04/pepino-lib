"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";

export class ResetBrowserStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase().trim();
        return lowercase === "reset browser";
    }

    generate(text: string): string {
        return "this.browser.reload();";
    }
}

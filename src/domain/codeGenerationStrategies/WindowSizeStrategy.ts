"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class WindowSizeStrategy implements ICodeGenerationStrategy {
    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("window size");
    }

    generate(text: string): string {
        var paramKeys: any = StringHelper.extractTextInQuotes(text);
        var resolution: string = paramKeys[0].toLowerCase().trim();

        if (resolution === 'maximize') {
            return "this.browser.windowHandleMaximize();";
        }

        var size: any = resolution.split('x');
        
        if (size && size.length === 2) {
            var width: any = size[0];
            var height: any = size[1];

            return "this.browser.windowHandleSize({width:" + width + ",height:" + height + "});";
        }

        return "";
    }
}

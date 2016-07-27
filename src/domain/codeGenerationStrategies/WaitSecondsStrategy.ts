"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class WaitSecondsStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var isWait = StringHelper.containsNonTokenText(text, "wait");
        var isSeconds = StringHelper.containsNonTokenText(text, "second");
        var numbers = text.match( /\d+/g );
        var hasNumericSeconds = numbers !== null && numbers.length > 0;
        return isWait && isSeconds && hasNumericSeconds;
    }

    generate(text: string): string {
        var numbers = text.match( /\d+/g );
        var ms = parseInt(numbers[0]) * 1000;
        return "this.browser.pause(" + ms + ");";
    }
}

"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class GlobalValueStrategy implements ICodeGenerationStrategy {
    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var containsGlobalValue = lowercase.indexOf("globalvalue") > -1;
        // var hasInstructionContextInTheMiddle = lowercase.indexOf(" equals ") > -1;
        return containsGlobalValue; // && hasInstructionContextInTheMiddle;
    }

    generate(text: string): string {
        var paramKeys: any = StringHelper.extractTextInQuotes(text);
        var field: string = paramKeys[0].toLowerCase().trim();
        var value: string = paramKeys[1];

        if (field) {
            return "_this.globalValues['" + field + "'] = '" + value + "';";
        } else {
            return "_this.globalValues['" + field + "'];";
        }
    }
}

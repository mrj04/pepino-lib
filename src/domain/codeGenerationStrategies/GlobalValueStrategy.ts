"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {StepHelper} from "../helpers/StepHelper";
import {GeneratorDataHelper} from "../helpers/GeneratorDataHelper";

export class GlobalValueStrategy implements ICodeGenerationStrategy{
    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var containsGlobalValue = lowercase.indexOf("globalvalue ") !== -1;
        var containsEquals = lowercase.indexOf(" equals ") !== -1;
        var containsRandom = lowercase.indexOf(" random:") !== -1;
        var containsLowercase = lowercase.indexOf(" lowercase") !== -1 ? lowercase.endsWith(" lowercase") : true;
        var containsUppercase = lowercase.indexOf(" uppercase") !== -1 ? lowercase.endsWith(" uppercase") : true;

        if (containsRandom) {
            return containsGlobalValue && containsEquals && (containsLowercase || containsUppercase);
        } else {
            return containsGlobalValue && containsEquals;
        }
    }

    generate(text: string): string {
        var lowercase = text.toLowerCase();
        var paramKeys: any = StringHelper.extractTextInQuotes(text);
        var field: string = paramKeys[0].toLowerCase().trim();

        var value: string = '';

        if (text.indexOf(StepHelper.randomGeneratorRestrictedWord) !== -1) {
            var type = StepHelper.extractGeneratorType(text);
            value = GeneratorDataHelper.generateRandomData(type).toString();

            if (lowercase.endsWith(" lowercase")) {
                value = value.toLowerCase();
            }

            if (lowercase.endsWith(" uppercase")) {
                value = value.toUpperCase();
            }
        } else {
            value = paramKeys[1];
        }

        return "globalValues['" + field + "'] = '" + value + "';";
    }
}

"use strict";
import {StringHelper} from "../helpers/StringHelper";

export class GlobalValueStrategy {
    public static canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var containsGlobalValue = lowercase.indexOf("globalvalue") > -1;
        return containsGlobalValue;
    }

    public static generate(text: string): string {
        var paramKeys: any = StringHelper.extractTextInQuotes(text);
        var field: string = paramKeys[0].toLowerCase().trim();
        var value: string = paramKeys[1];

        if (field && value) {
            return "globalValues['" + field + "'] = '" + value + "';";
        } else {
            return "globalValues['" + field + "']";
        }
    }
}

"use strict";
import {StringHelper} from "../helpers/StringHelper";

export class GlobalValueHelper {
    static generate(text: string): string {
        var paramKeys: any = StringHelper.extractTextInQuotes(text);
        var field: string = paramKeys[0].toLowerCase().trim();

        var lowercase = text.toLowerCase();

        if (lowercase.indexOf('lowercase') !== -1) {
            return "globalValues['" + field + "'].toString().toLowerCase()";
        }

        if (lowercase.indexOf('uppercase') !== -1) {
            return "globalValues['" + field + "'].toString().toUpperCase()";
        }

        return "globalValues['" + field + "']";
    }
}

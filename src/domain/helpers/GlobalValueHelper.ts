"use strict";
import {StringHelper} from "../helpers/StringHelper";

export class GlobalValueHelper {
    static generate(text: string): string {
        var paramKeys: any = StringHelper.extractTextInQuotes(text);
        var field: string = paramKeys[0].toLowerCase().trim();
        return "globalValues['" + field + "']";
    }
}

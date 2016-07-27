"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class AcceptAlertStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var isAccept = StringHelper.containsNonTokenText(text, "accept");
        var isAlert = StringHelper.containsNonTokenText(text, "alert");
        return isAccept && isAlert;
    }

    generate(text: string): string {
        return "this.browser.alertAccept();";
    }
}

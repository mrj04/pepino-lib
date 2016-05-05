"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class DismissAlertStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var isDismiss = StringHelper.containsNonTokenText(text, "dismiss");
        var isAlert = StringHelper.containsNonTokenText(text, "alert");
        return isDismiss && isAlert;
    }

    generate(text: string): string {
        return "this.browser.switchTo().alert().dismiss();";
    }
}

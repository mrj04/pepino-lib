"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class ToggleCheckboxStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const isToggle = StringHelper.containsNonTokenText(text, "toggle");
        const isCheckbox = StringHelper.containsNonTokenText(text, "checkbox");
        return isToggle && isCheckbox;
    }

    generate(text: string): string {
        const element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        return "this.browser.click(" + element + ");";
    }
}
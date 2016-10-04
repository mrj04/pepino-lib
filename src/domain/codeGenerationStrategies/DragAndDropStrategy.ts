"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";

export class DragAndDropStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith('drag ') && lowercase.indexOf(' and drop it to ') != -1;
    }

    generate(text: string): string {
        var selectorToDrag = StepHelper.extractSelector(text, 0);
        var selectorContainer = StepHelper.extractSelector(text, 1);
        return "this.browser.dragAndDrop(" + selectorToDrag + ", " + selectorContainer + ");";
    }
}

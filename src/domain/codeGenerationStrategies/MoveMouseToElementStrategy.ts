"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class MoveMouseToElementStrategy implements ICodeGenerationStrategy {
    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("move mouse to");
    }

    generate(text: string): string {
        const element = StepHelper.extractSelector(text, 0);

        return "client.moveToObject(" + element + ");";
    }
}

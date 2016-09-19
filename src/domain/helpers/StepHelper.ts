"use strict";
import * as _ from "underscore";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class StepHelper {
    private static characterIndicatorForVariables: string = '$';
    static extractSelectorById(instruction: string, index: number): string {
        var selector = "";
        var elementsArray = StringHelper.extractTextInGreaterThanLessThan(instruction);

        if (elementsArray[index].indexOf(this.characterIndicatorForVariables) === -1) {
            selector = "\"" + StringHelper.extractId(elementsArray[index]) + "\"";
        } else {
            selector = VariableHelper.getString(elementsArray[index]);
        }

        return selector;
    }

    static extractSelectorByClassname(instruction: string, index: number): string {
        var selector = "";
        var elementsArray = StringHelper.extractTextInGreaterThanLessThan(instruction);

        if (elementsArray[index].indexOf(this.characterIndicatorForVariables) === -1) {
            selector = "\"" + StringHelper.extractClassname(elementsArray[index]) + "\"";
        } else {
            selector = VariableHelper.getString(elementsArray[index]);
        }

        return selector;
    }
}

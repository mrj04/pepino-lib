"use strict";
import * as _ from "underscore";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";
import {GlobalValueHelper} from "../helpers/GlobalValueHelper";

export class StepHelper {
    private static characterIndicatorForVariables: string = '$';
    static randomGeneratorRestrictedWord: string = 'random';

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

    static extractSelectorByName(instruction: string, index: number): string {
        var selector = "";
        var elementsArray = StringHelper.extractTextInQuotes(instruction);

        if (elementsArray[index].indexOf(this.characterIndicatorForVariables) > -1) {
            selector = VariableHelper.getString(elementsArray[index]);
        } else {
            selector = "\"" + elementsArray[index] + "\"";
        }

        return selector;
    }

    static extractSelector(instruction: string, index: number): string {
        var selector = "";
        var elementsArray = StringHelper.extractTextInGreaterThanLessThan(instruction);
        var instructionLowerCase = instruction.toLowerCase();

        if (elementsArray[index].indexOf(this.characterIndicatorForVariables) > -1) {
            selector = VariableHelper.getString(elementsArray[index]);
        } else {
            selector = "\"" + elementsArray[index] + "\"";
        }

        if (instructionLowerCase.indexOf(" where content ") > -1) {
            var content;
            var nextPrev;

            if (instructionLowerCase.indexOf(" globalvalue ") > -1) {
                 content = GlobalValueHelper.generate(instruction);
            } else {
                var keys = StringHelper.extractTextInQuotes(instruction);
                content = VariableHelper.getString(keys[0]);            
            }

            if (instructionLowerCase.indexOf("for next element") > -1) {
                selector = "getSelectorByContent(this.browser, " + selector +  ", "
                + content + ", 'nextElement')"                
            } else if (instructionLowerCase.indexOf("for previous element") > -1) {
                selector = "getSelectorByContent(this.browser, " + selector +  ", "
                + content + ", 'previousElement')"
            } else {
                selector = "getSelectorByContent(this.browser, " + selector +  ", " + content + ")"
            }
        }        

        return selector;
    }

    static extractGeneratorType(instruction: string): string {
        var instructionParts: string[] = instruction.split(' ');

        var generatorPart = _.find(instructionParts, (part: string) => {
            return part.startsWith(this.randomGeneratorRestrictedWord);
        });

        if (generatorPart) {
            return generatorPart.substr(7, generatorPart.length - 5);
        } else {
            return '';
        }
    }
}

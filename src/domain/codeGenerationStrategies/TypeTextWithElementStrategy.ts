"use strict";
import chance = require('chance');
import * as _ from "underscore";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";
import {StepHelper} from "../helpers/StepHelper";
import {GeneratorDataHelper} from "../helpers/GeneratorDataHelper";
import {GlobalValueStrategy} from "./GlobalValueStrategy";

export class TypeTextWithElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {        
        var lowercase = text.toLowerCase();
        var isGeneratorTypeValid = true;
        var isGlobalValueStrategy = true;

        if (text.indexOf(StepHelper.randomGeneratorRestrictedWord) !== -1) {
            var content = StepHelper.extractGeneratorType(text);
            isGeneratorTypeValid = GeneratorDataHelper.isGeneratorTypeValid(content);
        }

        if (text.toLowerCase().indexOf("globalvalue") !== -1) {
            isGlobalValueStrategy = GlobalValueStrategy.canGenerate(text);
        }

        return lowercase.startsWith("type ")
            && lowercase.indexOf("into") > -1 && isGeneratorTypeValid && isGlobalValueStrategy;
    }

    generate(text: string): string {
        var contents = '';
        if (text.indexOf(StepHelper.randomGeneratorRestrictedWord) !== -1) {
            var type = StepHelper.extractGeneratorType(text);
            contents = '\"' + GeneratorDataHelper.generateRandomData(type).toString() + '\"';
        } else {
            if (text.toLowerCase().indexOf("globalvalue") !== -1) {
                contents = GlobalValueStrategy.generate(text);
            } else {
                var keys = StringHelper.extractTextInQuotes(text);
                contents = VariableHelper.getString(keys[0]);
            }
        }

        var element = StringHelper.extractTextInGreaterThanLessThan(text)[0];

        return "this.browser.setValue(\"" + element + "\", " + contents + ");";
    }
}

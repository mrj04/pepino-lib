"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";
import {StepHelper} from "../helpers/StepHelper";

export class AddValueToDropdownByIdentifierStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var hasAddAtTheBeginning = lowercase.startsWith("add ");
        var hasInstructionContextInTheMiddle = lowercase.indexOf(" to dropdown that has identifier ") > -1;
        return hasAddAtTheBeginning && hasInstructionContextInTheMiddle;
    }

    generate(text: string): string {
        var keys = StringHelper.extractTextInQuotes(text);
        var value = VariableHelper.getString(keys[0]);
        var element = StepHelper.extractSelectorById(keys[0], 0);

        var jsCommand = "var value = " + value + ";\n\
            var element = " + element + ";\n\n\
            this.browser.execute(function(a, b){\n\
                var objectFound = document.getElementById(b);\n\
                var option = document.createElement('option');\n\
                option.setAttribute('value', a);\n\
                var textnode = document.createTextNode(a);\n\
                option.appendChild(textnode);\n\
                objectFound.appendChild(option);\n\
            },value, element);";
        
         return jsCommand;
    }
}

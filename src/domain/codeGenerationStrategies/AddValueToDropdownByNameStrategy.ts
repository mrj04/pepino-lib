"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class AddValueToDropdownByNameStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var hasAddAtTheBeginning = lowercase.startsWith("add ");
        var hasInstructionContextInTheMiddle = lowercase.indexOf(" to dropdown that has name ") > -1;
        return hasAddAtTheBeginning && hasInstructionContextInTheMiddle;
    }

    generate(text: string): string {
        var keys = StringHelper.extractTextInQuotes(text);
        var value = VariableHelper.getString(keys[0]);
        var element = VariableHelper.getString(keys[1]);

        var jsCommand = "var value = " + value + ";\n\
            var element = " + element + ";\n\n\
            this.browser.execute(function(a, b){\n\
                var objectsFound = document.getElementsByName(b);\n\
                var index = Array.prototype.findIndex.call(objectsFound, function(object) {\n\
                    return object.tagName === 'SELECT';\n\
                });\n\n\
                if (index > -1) {\n\
                    var option = document.createElement('option');\n\
                    option.setAttribute('value', a);\n\
                    var textnode = document.createTextNode(a);\n\
                    option.appendChild(textnode);\n\
                    objectsFound[index].appendChild(option);\n\
                }\n\
            },value, element);";
        
         return jsCommand;
    }
}

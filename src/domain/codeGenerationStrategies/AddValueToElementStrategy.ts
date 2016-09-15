"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class AddValueToElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var hasTo = lowercase.indexOf(" to ") > -1;
        return lowercase.startsWith("add ") && hasTo;
    }

    generate(text: string): string {
        var keys = StringHelper.extractTextInQuotes(text);
        var element = StringHelper.extractTextInGreaterThanLessThan(text);
        var value = VariableHelper.getString(keys[0]);
        
        var jsCommand = "function(b){\n\t\
           var option = document.createElement('option');\n\t\
           option.setAttribute('value', b);\n\t\
           var textnode = document.createTextNode(b);\n\t\
           option.appendChild(textnode);\n\t\
           document.getElementsByName('"+element+"')[0].appendChild(option);\n\t\
        }";
        
        return "this.browser.execute("+ jsCommand + "," + value + ");";
    }
}

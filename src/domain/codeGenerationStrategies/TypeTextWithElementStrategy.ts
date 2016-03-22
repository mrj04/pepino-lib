"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class TypeTextWithElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("type ") 
            && lowercase.indexOf("into") > -1;
    }

    generate(text: string): string {
        var keys = StringHelper.extractTextInQuotes(text);
        var element = StringHelper.extractTextInGreaterThanLessThan(text);
        
        var contents = keys[0].startsWith("$") 
            ? keys[0].replace("$","") 
            : "\"" + keys + "\"";
        
        return "this.browser.setValue(\"" + element + "\", " + contents + ");";
    }    
}

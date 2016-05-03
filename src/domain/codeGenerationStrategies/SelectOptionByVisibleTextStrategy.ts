"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class SelectOptionByVisibleTextStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
         return lowercase.startsWith("select option ") 
             && lowercase.indexOf("named") > -1;        
    }

    generate(text: string): string {
        var keys = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        var element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);        
        
        return "this.browser.selectByVisibleText(" + element + ", " + keys + ");";        
    }    
}

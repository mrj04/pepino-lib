"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class WaitForElementStrategy implements ICodeGenerationStrategy {
    
    canGenerate(text: string): boolean {
        return text.toLowerCase().startsWith("wait for ");       
    }            
    
    generate(text: string): string {
        var element = StringHelper.extractTextInGreaterThanLessThan(text);        
        return "this.browser.waitForExist(\"" + element + "\");";        
    }
}

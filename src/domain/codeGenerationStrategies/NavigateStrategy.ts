"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";

export class NavigateStrategy implements ICodeGenerationStrategy {
    
    canGenerate(text: string): boolean {
        return text.toLowerCase().startsWith("navigate to ");       
    }            
    
    generate(text: string): string {
        var url = text.toLowerCase().replace("navigate to ", "");
        return "this.browser.url(\"" + url + "\");";        
    }
}

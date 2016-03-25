"use strict";
import * as _ from "underscore";

export class VariableHelper {

    static getString(str: string): string {
        if(!str) return "";
        
        var contents = str.startsWith("$") 
            ? str.replace("$","") 
            : "\"" + str + "\"";
        
        return contents;                
    }
}

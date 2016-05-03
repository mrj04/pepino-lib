"use strict";
import * as _ from "underscore";

export class VariableHelper {

    static getString(str: string, opt?: string): string {
        if(!str) return "";
        
        if(str.startsWith("$")){
            var option = opt ? " + \"" + opt + "\"" : "";
            return str.replace("$","") + option;
        }
        else{
            var option = opt ? opt : "";
            return "\"" + str + option + "\"";
        }                                                     
    }
}

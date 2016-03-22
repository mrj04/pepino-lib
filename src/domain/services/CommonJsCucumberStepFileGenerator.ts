"use strict";
export module Pepino {

    export interface IStepFileGenerator {
        generate(functions: Array<string>): string;
    }

    export class CommonJsCucumberStepFileGenerator implements IStepFileGenerator {
        generate(functions: Array<string>): string {                        
            return "module.exports = function() {\n" + functions.join("\n\n") + "\n };";
        }               
    }       
}
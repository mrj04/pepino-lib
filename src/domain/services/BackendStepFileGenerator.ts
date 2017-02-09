"use strict";

import * as fileGen from './CommonJsCucumberStepFileGenerator';
export module Pepino {
    export class BackendStepFileGenerator implements fileGen.Pepino.IStepFileGenerator{

         generate(functions: Array<string>): string {
            return `/* jslint node: true */
                    'use strict';
                    var prettyJson = require('prettyjson');
                    var stepContext = {};
                    var apickli = require('apickli');
                   
                    module.exports = function() {//`
                    +  functions.join("\n\n") + "\n };";
        }
    }
}
"use strict";
import * as fileGen from './services/CommonJsCucumberStepFileGenerator';
import * as backendFileGen from './services/BackendStepFileGenerator';




export module Pepino {

    export interface IFileGeneratorFactory {

        create(text: string): fileGen.Pepino.IStepFileGenerator;
    }

    export class FileGeneratorFactory implements IFileGeneratorFactory {

        create(text: string) :  fileGen.Pepino.IStepFileGenerator{
            //console.log(text);
            if(text.toLowerCase().includes('backend'))
            {
                return new backendFileGen.Pepino.BackendStepFileGenerator();
            }
            return new fileGen.Pepino.CommonJsCucumberStepFileGenerator();
        }
    }
}
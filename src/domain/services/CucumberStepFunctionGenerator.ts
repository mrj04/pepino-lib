"use strict";
import * as PepinoModule from "../../domain/services/IStepFunctionGenerator";
import {Step} from "../../domain/Step";
import {ICodeGenerationStrategy} from "../../domain/ICodeGenerationStrategy";
import {StringHelper} from "../../domain/helpers/StringHelper";
import * as _ from 'underscore';
import {IllegalStepError} from "./errors/IllegalStepError";

export module Pepino {

    class NullCodeGenerationStrategy {
        generate(text: string): string {
            return "//" + text;
        }
    }

    export class CucumberStepFunctionGenerator implements PepinoModule.Pepino.IStepFunctionGenerator {

        _codeGenerators: Array<ICodeGenerationStrategy>;

        constructor(codeGenerationStrategies: Array<ICodeGenerationStrategy>) {
            this._codeGenerators = codeGenerationStrategies;
        }

        generate(steps: Array<Step>): string {
            this.EnsureStepsOnlyHaveOneSegment(steps);
            return this.generateEntireFunction(steps);                        
        }

        private EnsureStepsOnlyHaveOneSegment(steps: Array<Step>){
            var groups = _.unique(steps, (step) => {
                return step.segment;
            });
            if(groups.length > 1) {
                throw new IllegalStepError(groups[1].segment);
            }            
        }
        
        private generateEntireFunction(steps: Array<Step>): string {
            const tab = "\t";
            
            var stepSegmentText = _.first(steps).segment;
            var variables = StringHelper.extractTextInQuotes(stepSegmentText);                       
            var lines = [tab + this.generateFunctionSignature(stepSegmentText, variables)];

            _.each(steps, (step) => {
                var gen = _.find(this._codeGenerators, (g) => { return g.canGenerate(step.text) })
                    || new NullCodeGenerationStrategy();
                    
                var generatedCode = gen.generate(step.text);
                lines.push(tab + tab + generatedCode);

            });

            lines.push(tab + "});");
            lines.push("");

            return lines.join('\n');
        }

        private generateFunctionSignature(stepSegmentText: string, variables: Array<string>): string {
            const anyString: string = "\"([^\"]*)\"";
            var args = _.map(variables, (v) => {
                return v.replace("$", "");
            }).join(", ");            
            var doctoredText = stepSegmentText;
            variables.forEach((v)=> {
                if(v.startsWith("$")) {
                    doctoredText = doctoredText.replace("\"" + v + "\"", anyString);
                }
            });
            
            return "this.defineStep(/^" + doctoredText + "$/, function(" + args + ") {";
        };
    }
}
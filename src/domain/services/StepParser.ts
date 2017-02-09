"use strict";
import {Step} from '../Step';
export module Pepino {

    export interface IStepParser {
        parse(s: string): Array<Step>;
    }

    export class PepinoLangStepParser implements IStepParser {
        parse(s: string) {
            var lines = s.split("\n");
            var steps = new Array<Step>();

            for (var i = 0; i < lines.length - 1; i++) {

                if (lines[i].length > 0) {

                    var segment: any = lines[i].trim();
                    while(segment){
                        i++;
                        if(i>=lines.length) break;
                        var stepText = lines[i].trim();
                        if(stepText.length===0){
                            segment = false;
                        }
                        else{
                            steps.push(new Step(stepText, segment))
                        }
                    }
                    var line = lines[i];

                }
            }

            return steps;
        }
    }
}
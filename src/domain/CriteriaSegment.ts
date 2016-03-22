"use strict";
import {Step} from "./Step";
import * as _ from 'underscore';

export class CriteriaSegment {

    constructor(type: string, text: string) {
        this.type = type;
        this.text = text;
        this.steps = new Array<Step>();
    }

    type: string;
    text: string;
    steps: Array<Step>;

    addSteps(steps: Array<Step>): CriteriaSegment {
        steps.forEach((s) => {
            var alreadyHasStep = _.find(this.steps, (existingStep) => {
                return existingStep.text === s.text;
            });

            var isForThisSegment = s.segment === this.text;
            
            if (!alreadyHasStep && isForThisSegment)
                this.steps.push(s);
        });
        return this;
    }
}

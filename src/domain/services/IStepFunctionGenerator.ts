"use strict";
import {Step} from "../../domain/Step";

export module Pepino {

    export interface IStepFunctionGenerator {
        generate(segmentType: string, criteriaSegmentText: string, steps: Array<Step>): string;
    }

}
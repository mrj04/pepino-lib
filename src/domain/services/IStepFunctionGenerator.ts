"use strict";
import {Step} from "../../domain/Step";

export module Pepino {

    export interface IStepFunctionGenerator {
        generate(steps: Array<Step>): string;
    }

}
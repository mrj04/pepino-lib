"use strict";
import {Feature} from "../../domain/Feature";
import {Scenario} from "../../domain/Scenario";
import {CriteriaSegment} from "../../domain/CriteriaSegment";
import * as gherkin from 'gherkin';
import * as _ from 'underscore';
import {FeatureParserError} from "./errors/FeatureParserError";

var parser = new gherkin.Parser();

export module Pepino {

    export interface IFeatureParser {
        parse(s: string): Feature;
    }

    export class GherkinFeatureParser implements IFeatureParser {
        parse(s: string) {
            try{
                var f = parser.parse(s);
                var name: string = f.name;
                var scenarios: Array<Scenario> = _.map(f.scenarioDefinitions, (s) => {
                    var steps = _.map(s.steps, (step)=>{
                        return new CriteriaSegment(step.keyword.trim(), step.text);
                    });
                    return new Scenario(s.name, steps);
                });
                return new Feature(name, scenarios);
            }
            catch(err){
                throw new FeatureParserError("The last feature file attempted resulted in an error.", err);
            }                        
        }
    }
}
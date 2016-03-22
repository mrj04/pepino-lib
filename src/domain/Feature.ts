"use strict";
import {Scenario} from "./Scenario";

export class Feature {
    
    name: string;
    scenarios: Array<Scenario>;
    
    constructor(n: string, s: Array<Scenario>) {
        this.name = n; 
        this.scenarios = s;            
    }       
}
"use strict";
import {CriteriaSegment} from "./CriteriaSegment";

export class Scenario {
    
    constructor(name: string, segments: Array<CriteriaSegment>) {
        this.name = name; 
        this.segments = segments;                        
    }
    
    name: string;  
    segments: Array<CriteriaSegment>;      
}

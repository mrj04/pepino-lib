"use strict";
import {Feature} from "../../domain/Feature";
import {CriteriaSegment} from "../../domain/CriteriaSegment";
import * as _ from 'underscore';
import {StringHelper} from "../../domain/helpers/StringHelper";

export module Pepino {

    export interface ICriteriaSegmentMatcher {
        get(segmentText: string, features: Array<Feature>): Array<CriteriaSegment>;
    }

    export class CriteriaSegmentMatcher implements ICriteriaSegmentMatcher {
        get(segmentText: string, features: Array<Feature>): Array<CriteriaSegment> {
                        
            var segments = new Array<CriteriaSegment>();
            _.each(features, (f) => {
                _.each(f.scenarios, (s) => {
                    _.each(s.segments, (seg) => {                        
                        if(this.withoutQuotedStrings(segmentText)===this.withoutQuotedStrings(seg.text)){
                            segments.push(seg);
                        }                        
                    });
                });
            });
            return segments;
        }
        
        private withoutQuotedStrings(text: string): string{
            var quotedStrings = StringHelper.extractTextInQuotes(text);
            quotedStrings.forEach((s)=> {
                text = text.replace(s, "");
            });
            return text;
        }
    }       
}
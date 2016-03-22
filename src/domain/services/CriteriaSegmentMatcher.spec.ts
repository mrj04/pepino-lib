"use strict";
import chai = require("chai");
var expect = chai.expect;
import {Feature} from "../../domain/Feature";
import {Scenario} from "../../domain/Scenario";
import {CriteriaSegment} from "../../domain/CriteriaSegment";
import * as PepinoModule from "../../domain/services/CriteriaSegmentMatcher";

describe("Segment Type Matcher", () => {

    describe("when getting a plain-jane matching segment type", () => {

        var matcher = new PepinoModule.Pepino.CriteriaSegmentMatcher();
        var segment = "matching segment";             
        var scenario1 =  new Scenario("scenario", new Array<CriteriaSegment>(
                    new CriteriaSegment("Given", segment), new CriteriaSegment("When", segment)));
        
        var scenario2 =  new Scenario("scenario", new Array<CriteriaSegment>(
                    new CriteriaSegment("Then", segment)));
                    
        var features = new Array<Feature>(
            new Feature("test1", new Array<Scenario>(scenario1)),
            new Feature("test2", new Array<Scenario>(scenario2)));
        
        it("should be return a matching segment", () => {
             expect(matcher.get(segment, features)[0].type).to.equal("Given");            
        });
        
        it("should be return multiple matching segments", () => {
             expect(matcher.get(segment, features)[1].type).to.equal("When");            
        });
        
        it("should be return segments from multiple features", () => {
             expect(matcher.get(segment, features)[2].type).to.equal("Then");            
        });                
    });
    
    describe("when getting a matching segment type with variables", () => {

        var matcher = new PepinoModule.Pepino.CriteriaSegmentMatcher();
        var stepSegmentWithVariable = "matching segment with \"$variable\" and \"$anotherVariable\"";             
        var criteriaSegment = "matching segment with \"something\" and \"something else\"";
                     
        var scenario1 =  new Scenario("scenario", new Array<CriteriaSegment>(
                    new CriteriaSegment("Given", criteriaSegment), new CriteriaSegment("When", criteriaSegment)));
        
        var scenario2 =  new Scenario("scenario", new Array<CriteriaSegment>(
                    new CriteriaSegment("Then", criteriaSegment)));
                    
        var features = new Array<Feature>(
            new Feature("feature 1", new Array<Scenario>(scenario1)),
            new Feature("feature 2", new Array<Scenario>(scenario2)));
        
        it("should return a matching segment", () => {
             expect(matcher.get(stepSegmentWithVariable, features)[0].text).to.equal(criteriaSegment);            
        });
        
        it("should return multiple matching segments", () => {
             expect(matcher.get(stepSegmentWithVariable, features)[1].text).to.equal(criteriaSegment);            
        });
        
        it("should return segments from multiple features", () => {
             expect(matcher.get(stepSegmentWithVariable, features)[2].text).to.equal(criteriaSegment);            
        });                
    });
});



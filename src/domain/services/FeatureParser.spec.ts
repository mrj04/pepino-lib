"use strict";
import chai = require("chai");
var expect = chai.expect;
import {Feature} from "../../domain/Feature";
import * as f from "../../domain/services/FeatureParser";
import {FeatureParserError} from "../../domain/services/errors/FeatureParserError";

describe("The Feature Parser", () => {
    
    var parser = new f.Pepino.GherkinFeatureParser();
    
    describe("when parsing an empty feature", () => {
        
        it("should throw an exception informing of the empty feature file", () => {
            expect(function() {parser.parse(""); }).to.throw(FeatureParserError);   
        });
    });
    
    describe("when parsing an empty feature", () => {
        
        it("should throw an exception informing of the empty feature file", () => {
            expect(function() {parser.parse(""); }).to.throw(FeatureParserError);   
        });
    });
        
    describe("when parsing a valid feature", () => {
        
        var featureText = `
            Feature: The Cool Feature
            
            Scenario: Test 1
              Given a scenario
              When something happens
              Then it should succeed
            
            Scenario: Test 2
        `;
        
        var feature = parser.parse(featureText);
        
        it("should be an instance of a feature", (done) => {
             expect(feature).to.be.an.instanceOf(Feature);
             done();
        });
        
        it("should have a feature name", (done) => {
            expect(feature.name).to.equal('The Cool Feature');
            done();
        });
        
        it("should have an array of scenario definitions", (done) => {
            expect(feature.scenarios.length).to.be.greaterThan(0);
            done();
        });
        
        it("should have a scenario with the same name as the feature file", (done) => {
            expect(feature.scenarios[0].name).to.equal("Test 1");
            done();
        });
        
        it("should have scenarios with criteria segments", (done) => {
            expect(feature.scenarios[0].segments.length).to.be.greaterThan(0);
            done();
        });
        
        it("should have criteria segements with expected type ", (done) => {
            expect(feature.scenarios[0].segments[0].type).to.equal("Given");
            done();
        });
        
        it("should have criteria segements with expected text ", (done) => {
            expect(feature.scenarios[0].segments[0].text).to.equal("a scenario");
            done();
        });                                      
    });
});

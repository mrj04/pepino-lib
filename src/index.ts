"use strict";
var glob = require('glob');
var fs = require("fs");
var program = require('commander');

import * as _ from 'underscore';
import * as Promise from 'bluebird'; 
import * as p from './domain/services/StepParser';
import * as s from './domain/services/CriteriaSegmentMatcher';
import * as f from './domain/services/FeatureParser';
import * as g from './domain/services/CucumberStepFunctionGenerator';
import * as fileGen from './domain/services/CommonJsCucumberStepFileGenerator';

import {CriteriaSegment} from './domain/CriteriaSegment';
import {Feature} from './domain/Feature';
import {Step} from './domain/Step';
import {ICodeGenerationStrategy} from './domain/ICodeGenerationStrategy';
import {ClickElementStrategy} from './domain/codeGenerationStrategies/ClickElementStrategy';
import {NavigateStrategy} from './domain/codeGenerationStrategies/NavigateStrategy';
import {TypeTextWithElementStrategy} from './domain/codeGenerationStrategies/TypeTextWithElementStrategy';
import {TypeTextWithoutElementStrategy} from './domain/codeGenerationStrategies/TypeTextWithoutElementStrategy';
import {JasmineExpectStrategy} from './domain/jasmineExpectCodeGeneration/JasmineExpectStrategy';

import {FeatureParserError} from "./domain/services/errors/FeatureParserError";

var stepParser = new p.Pepino.PepinoLangStepParser();
var matcher = new s.Pepino.CriteriaSegmentMatcher();
var featureParser = new f.Pepino.GherkinFeatureParser();
var codeGenerator = new g.Pepino.CucumberStepFunctionGenerator(new Array<ICodeGenerationStrategy>(
    new ClickElementStrategy(),
    new NavigateStrategy(),
    new TypeTextWithElementStrategy(),
    new TypeTextWithoutElementStrategy(),
    new JasmineExpectStrategy()
));
var stepFileGenerator = new fileGen.Pepino.CommonJsCucumberStepFileGenerator();

function getMatchingSegmentTypes(segmentText: string, features: Array<Feature>): Array<string> {    
    var segments: Array<CriteriaSegment> = matcher.get(segmentText, features);
    var matchingSegmentTypes = _.map(segments, (s)=>{
        return s.type;
    });    
    var uniqueSegmentTypes = _.unique(matchingSegmentTypes);    
    return uniqueSegmentTypes;
};

function createOverwriteStepCodeFile(stepFilename, code){
    var newFilename = stepFilename + ".js";
    fs.writeFileSync(newFilename, code);
}

function forEachTextFileIn(globPath: string, action: Function): Promise<Array<any>> {
    return new Promise<Array<any>>((resolve, reject) => {
        glob(globPath, {}, (err, files) => {
            var arr = new Array<any>();
            _.each(files, (filename) => {
                try {
                    var fileContents = fs.readFileSync(filename, 'utf8');
                    arr.push(action(fileContents, filename));
                }
                catch (err) {
                    reject(err);                    
                }                
            });
            resolve(arr);
        }); 
    });         
}

class CodedStepFile {
    constructor(codedSteps: Array<string>, filename: string){
        this.codedSteps = codedSteps;
        this.filename = filename;
    }
    
    codedSteps: Array<string>;
    filename: string;
}

function getCodedSegents(features: Array<Feature>, segments: Array<any>){
    return _.flatten(_.map(segments, (segment) => {
        var matchingSegmentTypes = getMatchingSegmentTypes(segment.text, features);
        var codeForStep = _.map(matchingSegmentTypes, (segmentType) => {
            return codeGenerator.generate(segmentType, segment.text, segment.steps);                    
        });     
        return codeForStep;
    }));
}

function getCodedStepFile(steps: Array<Step>, filename: string, features: Array<Feature>){
    var stepGroups = _.groupBy(steps, (s) => {
        return s.segment;
    });
    var segments = _.map(Object.keys(stepGroups), (key: string) => {
        return { 
            text: key,
            steps: stepGroups[key]                    
        };
    });
    
    var codedSegments = getCodedSegents(features, segments);    
    return new CodedStepFile(codedSegments, filename);    
}

function createStepCodeFilesForEachPepinoStepFile(glb: string, features: Array<Feature>){
    return forEachTextFileIn(glb, (stepFileContents, filename) => {            
        console.log(filename);
        var steps = stepParser.parse(stepFileContents);
        return getCodedStepFile(steps, filename, features);                        
    });
};

function getCacheOfFeatures(glb: string){
    return forEachTextFileIn(glb, (featureFileContents, featureFilename) => {
        console.log(featureFilename);
        try{
            return featureParser.parse(featureFileContents);
        }
        catch(err){
            if(typeof err === 'FeatureParserError'){
                console.log(err.message);
            }
            else{
                throw err;
            }
        }
    })
}

function writeCodeFiles(codeStepFiles: Array<CodedStepFile>){
    _.each(codeStepFiles, (file) => {
        var commonJsFile = stepFileGenerator.generate(file.codedSteps);
        createOverwriteStepCodeFile(file.filename, commonJsFile); 
    });            
}

console.log("Pepino CLI");

program  
  .option('-f, --features <glob>', 'Glob to feature files.')
  .option('-s, --steps <glob>', 'Glob to step files.')
  .parse(process.argv);

try{
    
    var features = program.features || "./features/**/*.feature";
    if(features.indexOf("/**/") === -1){
        features = features + "/**/*.feature";
    }
    
    var steps = program.steps || features.replace(".feature", ".step");

    getCacheOfFeatures(features)
        .then((features) => {
            return createStepCodeFilesForEachPepinoStepFile(steps, features);
        })
        .then(writeCodeFiles);
        
}
catch(err){
    
    console.log(err);
    program.help();
        
}
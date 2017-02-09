"use strict";

import * as cumbfile from "./services/CommonJsCucumberStepFileGenerator";
import * as backendfile from "./services/BackendStepFileGenerator";
import * as fact  from "./IFileGeneratorFactory";
import chai = require("chai");
var expect = chai.expect;
var factory = new fact.Pepino.FileGeneratorFactory();

describe("File generator factory", ()=> {

    describe("When creating a browser step file generator",()=>{

        var browserStep = `
            I have navigated to the search screen
              Navigate to http://mysite.com

            I search for "$SearchTerm"
              Type "$SearchTerm" into <#search> element
              Click the <#submit> button

            I should find "$ExpectedResult" in the results
              Verify "$ExpectedResult" is in <#results> element
        `;

        var fileConverter = factory.create(browserStep);

        it("Should create CommonJsCucumberStepFileGenerator",()=> {
            expect(fileConverter).to.be.instanceOf(cumbfile.Pepino.CommonJsCucumberStepFileGenerator);
        })

    });

    describe("When creating a backend step file generator",()=>{
        var backendStep = `
            I have to set the Api url
              Backend  http://mysite.com
        `;


        var fileConverter = factory.create(backendStep);


        it("Should create BackendStepFileGenerator", ()=>{
            expect(fileConverter).to.be.instanceof(backendfile.Pepino.BackendStepFileGenerator);
        });
    });

});
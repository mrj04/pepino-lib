"use strict";
import chai = require("chai");
var expect = chai.expect;
import {GeneratorDataHelper} from "./GeneratorDataHelper";

describe('Generator Data Helper', () => {
    var typeOfData: string;
    var result: any;

    describe('When generating boolean', () => {
        it('Should return a boolean', () => {
            typeOfData = typeof GeneratorDataHelper.generateRandomData('bool');
            expect(typeOfData).to.be.equal('boolean');
        });
    });

    describe('When generating a firstname', () => {
        it('Should return a string', () => {
            typeOfData = typeof GeneratorDataHelper.generateRandomData('firstname');
            expect(typeOfData).to.be.equal('string');
        });
    });

    describe('When type is unrecognizable', () => {
        it('Should return undefined', () => {
            result = GeneratorDataHelper.generateRandomData('unknown');
            expect(result).to.be.undefined;
        });
    });

    describe('When validating a non existing type', () => {
        it('Should return false', () => {
            expect(GeneratorDataHelper.isGeneratorTypeValid('unknown')).to.be.false;
        });
    });

    describe('When validating an existing type', () => {
        it('Should return true', () => {
            expect(GeneratorDataHelper.isGeneratorTypeValid('email')).to.be.true;
        });
    });

});1

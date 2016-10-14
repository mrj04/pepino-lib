"use strict";
import chai = require("chai");
var expect = chai.expect;
import {StepHelper} from "./StepHelper";

describe('The Step Helper', () => {
    describe('When extracting the id of a selector from the step when it comes as a variable', () => {
        var step: string = 'Step example <$idOne> and <$idTwo>';
        
        it('Should return the id without dollar symbol from first index', () => {
            var element: string = StepHelper.extractSelectorById(step, 0);
            expect(element).to.be.equal('idOne');
        });

        it('Should return the id without dollar symbol from second index', () => {
            var element: string = StepHelper.extractSelectorById(step, 1);
            expect(element).to.be.equal('idTwo');
        });
    });

    describe('When extracting the id of a selector from the step when it comes as a hardcoded value', () => {
        var step: string = 'Step example <#idOne> and <#idTwo>';
        
        it('Should return the id without number sign from first index', () => {
            var element: string = StepHelper.extractSelectorById(step, 0);
            expect(element).to.be.equal('\"idOne\"');
        });

        it('Should return the id without number sign from second index', () => {
            var element: string = StepHelper.extractSelectorById(step, 1);
            expect(element).to.be.equal('\"idTwo\"');
        });
    });

    describe('When extracting the classname of a selector from the step when it comes as a variable', () => {
        var step: string = 'Step example <$classnameOne> and <$classnameTwo>';
        
        it('Should return the classname without dollar symbol from first index', () => {
            var element: string = StepHelper.extractSelectorById(step, 0);
            expect(element).to.be.equal('classnameOne');
        });

        it('Should return the classname without dollar symbol from second index', () => {
            var element: string = StepHelper.extractSelectorById(step, 1);
            expect(element).to.be.equal('classnameTwo');
        });
    });

    describe('When extracting the classname of a selector from the step when it comes as a hardcoded value', () => {
        var step: string = 'Step example <.classnameOne> and <.classnameTwo>';
        
        it('Should return the classname without period symbol from first index', () => {
            var element: string = StepHelper.extractSelectorByClassname(step, 0);
            expect(element).to.be.equal('\"classnameOne\"');
        });

        it('Should return the classname without period symbol from second index', () => {
            var element: string = StepHelper.extractSelectorByClassname(step, 1);
            expect(element).to.be.equal('\"classnameTwo\"');
        });
    });

    describe('When extracting the name of a selector from the step when it comes as a variable', () => {
        var step: string = 'Step example \"$nameOne\"';
        
        it('Should return the name without dollar symbol', () => {
            var element: string = StepHelper.extractSelectorByName(step, 0);
            expect(element).to.be.equal('nameOne');
        });
    });

    describe('When extracting the selector from the step when it comes as a variable', () => {
        var step: string = 'Step example <$nameOne>';
        
        it('Should return the name without dollar symbol', () => {
            var element: string = StepHelper.extractSelector(step, 0);
            expect(element).to.be.equal('nameOne');
        });
    });

    describe('When extracting the selector from the step when it comes as a hardcoded value', () => {
        var step: string = 'Step example <input#nameOne>';
        
        it('Should return the name without dollar symbol', () => {
            var element: string = StepHelper.extractSelector(step, 0);
            expect(element).to.be.equal('"input#nameOne"');
        });
    });

    describe('extractGeneratorType', () => {
        describe('When extracting generator type', () => {
            it('Should return the type', () => {
                var type: string = StepHelper.extractGeneratorType('command command $gen:email command command');
                expect(type).to.be.equal('email');
            });
        });

        describe('When generator part of the instruction only has the prefix', () => {
            it('Should return an empty string', () => {
                var type: string = StepHelper.extractGeneratorType('command command $gen: command command');
                expect(type).to.be.equal('');
            });
        });

        describe('When generator part of the instruction only has the prefix', () => {
            it('Should return an empty string', () => {
                var type: string = StepHelper.extractGeneratorType('command command command command command');
                expect(type).to.be.equal('');
            });
        });
    });
});

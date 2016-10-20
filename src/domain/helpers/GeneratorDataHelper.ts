"use strict";
import * as _ from "underscore";
import chance = require('chance');

interface IGeneratorType {
}

export class GeneratorDataHelper {
    private static generatorTypes: any = {
        'bool': () => {
            return chance().bool();
        },
        'float': () => {
            return chance().floating();
        },
        'int': () => {
            return chance().integer();
        },
        'string': () => {
            return chance().string();
        },
        'age': () => {
            return chance().age();
        },
        'email': () => {
            return chance().email();
        },
        'firstname': () => {
            return chance().first();
        },
        'lastname': () => {
            return chance().last();
        },
        'completeName': () => {
            return chance().name();
        },
        'domain': () => {
            return chance().domain();
        },
        'address': () => {
            return chance().address();
        },
        'city': () => {
            return chance().city();
        },
        'country': () => {
            return chance().country();
        },
        'coordinates': () => {
            return chance().coordinates();
        },
        'phone': () => {
            return chance().phone();
        },
        'zip': () => {
            return chance().zip();
        },
        'datetime': () => {
            return chance().date();
        },
        'normalDate': () => {
            return chance().date({string: true});
        },
        'visa': () => {
            return chance().cc({type: 'visa'});
        },
        'masterCard': () => {
            return chance().cc({type: 'mc'});
        },
        'americanExpress': () => {
            return chance().cc({type: 'amex'});
        }
    }

    static generateRandomData(type: string): any {
        if (!this.generatorTypes[type]) {
            return undefined;
        }
        return this.generatorTypes[type]();
    }

    static isGeneratorTypeValid(type: string): boolean {
        return this.generatorTypes[type] !== undefined;
    }
}

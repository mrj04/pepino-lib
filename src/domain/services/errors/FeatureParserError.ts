"use strict";

export class FeatureParserError {

    constructor(message: string, innerError?: any){
        this.message = message;
        this.innerError = innerError;
    }
    
    message: string;
    innerError: any;
}

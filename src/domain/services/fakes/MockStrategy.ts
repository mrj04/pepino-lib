"use strict";
import {ICodeGenerationStrategy} from '../../ICodeGenerationStrategy';

export class MockStrategy implements ICodeGenerationStrategy {

    _matchingText: string;
    _codeGenerated: string;

    constructor(matchingText: string, codeGenerated: string) {
        this._matchingText = matchingText;
        this._codeGenerated = codeGenerated;
    }

    canGenerate(text: string): boolean {
        return text === this._matchingText;
    }

    generate(text: string): string {
        return this._codeGenerated;
    }
}
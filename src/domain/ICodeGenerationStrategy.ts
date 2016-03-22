"use strict";
export interface ICodeGenerationStrategy {
    canGenerate(text: string): boolean;
    generate(text: string): string;
}
"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectCssPropertySimilarStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const hasCss = lowercase.indexOf("css") > -1;
        const hasSimilar = lowercase.indexOf("similar") > -1;
        const hasProperty = lowercase.indexOf("property") > -1;
        return lowercase.startsWith("verify ") && hasProperty && hasCss && hasSimilar;
    }

    generate(text: string): string {
        const object = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        text = text.substring(text.indexOf(object) + object.length + 1);
        const property = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        text = text.substring(text.indexOf(property) + property.length + 1);
        const value = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);

        return `expect(JSON.stringify(browser.getCssProperty(${object}, ${property})).toUpperCase()).toContain(${value}.toUpperCase());`;
    }
}

"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectElementAttributeStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const isAttribute = StringHelper.containsNonTokenText(lowercase, " have attribute ");
		const hasNegator = lowercase.indexOf(" not ") > -1;
        return lowercase.startsWith("verify ") && isAttribute && !hasNegator;
    }

    generate(text: string): string {
        const element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        const contents = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        return "expect(browser.getHTML(" + element + ")).toContain(" + contents + ");";
    }
}

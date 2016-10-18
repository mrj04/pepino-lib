"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var hasNegator = lowercase.indexOf(" not ") > -1;
        var isVerifyingOption = lowercase.indexOf("selected in") > -1;
        var hasIsIn = lowercase.indexOf(" is in ") > -1;
        return lowercase.startsWith("verify ") && hasIsIn && !hasNegator && !isVerifyingOption;
    }

    generate(text: string): string {
        var element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        var contents = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);

        var jsCommand = "var content = this.browser.getText(" + element + ");\n\n\
        if(Object.prototype.toString.call(content) === '[object Array]') {\n\
            expect(content.join()).toContain(" + contents + ");\n\
        } else {\n\
            expect(content).toContain(" + contents + ");\n\
        }";

        return jsCommand;
    }
}

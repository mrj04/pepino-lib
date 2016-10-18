"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectNotStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var isVerify = lowercase.startsWith("verify ");
        var hasNegator = lowercase.indexOf(" not ") > -1;
        var isChecked = lowercase.indexOf("checked") > -1;
        return isVerify && hasNegator && !isChecked;
    }

    generate(text: string): string {
        var element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        var contents = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);

        var jsCommand = "var content = this.browser.getText(" + element + ");\n\n\
        if(Object.prototype.toString.call(content) === '[object Array]') {\n\
            expect(content.join()).toNotContain(" + contents + ");\n\
        } else {\n\
            expect(content).toNotContain(" + contents + ");\n\
        }";

        return jsCommand;
    }
}

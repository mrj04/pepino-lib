"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StepHelper} from "../helpers/StepHelper";

export class JasmineExpectContainerHasElementStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("verify ") && lowercase.indexOf(" contains ") != -1;
    }

    generate(text: string): string {
        var container = StepHelper.extractSelector(text, 0);
        var expectedElement = StepHelper.extractSelector(text, 1);

        var jsCommand = "var container = " + container + ";\n\
            var expectedElement = " + expectedElement + ";\n\
            var element;\n\
            element = this.browser.execute(function(a, b){\n\t\
            return document.querySelector(a + \" \" + b);\n\t\
            });\n\
            expect(element.value).not.toBe(null);";

        return jsCommand;
    }
}

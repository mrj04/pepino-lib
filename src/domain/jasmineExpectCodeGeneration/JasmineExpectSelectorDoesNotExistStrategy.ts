"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";
import {StepHelper} from "../helpers/StepHelper";

export class JasmineExpectSelectorDoesNotExistStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        var isVerify = lowercase.startsWith("verify ");
        var doesNotExist = lowercase.indexOf("does not exist") > -1;
        return isVerify && doesNotExist;
    }

    generate(text: string): string {
        const element = StepHelper.extractSelector(text, 0);
        
        const jsCommand = "try {\n\
            expect(browser.isVisible(" + element + ")).toEqual(false);\n\
        } catch (error) {\n\
            if (" + element + " === '') {\n\
                expect(false).toEqual(false);\n\
            } else {\n\
                expect(error).toEqual(false);\n\
            }\n\
        }";

        return jsCommand;
    }
}

"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";

export class PressKeyStrategy implements ICodeGenerationStrategy {

    private keysList: any = {
        'back space': "\"\uE003\"",
        'tab': "\"\uE004\"",
        'enter': "\"\uE007\"",
        'escape': "\"\uE00C\"",
        'page up': "\"\uE00E\"",
        'page down': "\"\uE00F\"",
        'home': "\"\uE011\"",
        'end': "\"\uE010\"",
        'delete': "\"\uE017\"",
        'arrow left': "\"\uE012\"",
        'arrow right': "\"\uE014\"",
        'arrow up': "\"\uE013\"",
        'arrow down': "\"\uE015\"",
        'control': "\"\uE009\"",
        'shift': "\"\uE008\""
    }

    canGenerate(text: string): boolean {
        var lowercase = text.toLowerCase();
        return lowercase.startsWith("press key ");
    }

    generate(text: string): string {
        var paramKeys: any = StringHelper.extractTextInQuotes(text);
        var lowerKey: string = paramKeys[0].toLowerCase();
        var key: string = this.keysList[lowerKey] ? this.keysList[lowerKey] : "\"" + paramKeys[0] + "\"";

        return "this.browser.keys("  + key + ");";
    }
}

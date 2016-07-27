"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {VariableHelper} from "../helpers/VariableHelper";
import {StringHelper} from "../helpers/StringHelper";

export class SwitchTabStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        var isSwitch = StringHelper.containsNonTokenText(text, "switch");
        var isTab = StringHelper.containsNonTokenText(text, "tab");
        return isSwitch && isTab;
    }

    generate(text: string): string {
        var tabName = StringHelper.extractTextInQuotes(text);
        var contents = VariableHelper.getString(tabName[0]);

        var nameOfFunction = "fn" + new Date().getTime() + "_switchTab";

        var switchTab = function(browser, tabTitle) {
            var currentTabId = browser.getCurrentTabId();
            browser.getTabIds().forEach((id) => {
                browser.switchTab(id);
                if(browser.getTitle().indexOf(tabTitle) > -1) {
                    return false;
                }
                else {
                    browser.switchTab(currentTabId);
                }
            });
        }

        return "var " + nameOfFunction + " = " + switchTab.toString() + "; " + nameOfFunction + "(this.browser, " + contents + ");";
    }
}
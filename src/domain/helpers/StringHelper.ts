"use strict";
import * as _ from "underscore";

export class StringHelper {

    private static textInQuotes: RegExp = /"(.*?)"/g

    static extractTextInQuotes(str: string): Array<string> {
        return this.getArrayOfMatches(str, this.textInQuotes);
    }

    static extractTextInGreaterThanLessThan(str: string): Array<string> {
        return this.getArrayOfMatchesForLessThanGreaterThan(str);
    }

    static escapeQuotes(str: string): string {
        return str.replace(new RegExp("\"", 'g'), "\\\"");
    }

    private static getArrayOfMatches(str: string, exp: RegExp): Array<string> {
        var matches = new Array<string>();
        var match = exp.exec(str);
        while (match !== null) {
            matches.push(match[1]);
            match = exp.exec(str);
        }
        return _.map(matches, (m) => { return this.escapeQuotes(m); });
    }

    private static getArrayOfMatchesForLessThanGreaterThan(str: string): Array<string> {
        var matches = new Array<string>();
        var parts = new Array<string>();
        parts = str.split(' ');

        var elements = _.filter(parts, (part: string) => {
            return part.charAt(0) === '<' && part.charAt(part.length - 1) === '>';
        });

        matches = _.map(elements, (element: string) => {
            return element.substr(1, element.length - 2);
        });
        return _.map(matches, (m) => { return this.escapeQuotes(m); });
    }

    static capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static containsNonTokenText(text: string, contents: string) {
        var textWithoutTokens = text.replace(this.textInQuotes, "");
        return textWithoutTokens.toLowerCase().indexOf(contents.toLowerCase()) > -1;
    }

    static extractId(str: string): string {
        if (str.indexOf("#") !== -1) {
            return str.substring(str.indexOf("#") + 1, str.length);
        }
        return '';
    }

    static extractClassname(str: string): string {
        if (str.indexOf(".") !== -1) {
            return str.substring(str.indexOf(".") + 1, str.length);
        }
        return '';
    }
}
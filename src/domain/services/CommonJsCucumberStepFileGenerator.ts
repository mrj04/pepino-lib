"use strict";
export module Pepino {

    export interface IStepFileGenerator {
        generate(functions: Array<string>): string;
    }

    export class CommonJsCucumberStepFileGenerator implements IStepFileGenerator {

        private GetCssPathFunction(): string {
            return "function getCssPath(browser, element, content) {\n\
                return browser.execute(function(element, content) {\n\
                    var treeObject = {};\n\
                    var elementFound = {};\n\
                    if (typeof element === 'string') {\n\
                        parser = new DOMParser();\n\
                        docNode = parser.parseFromString(element,'text/xml');\n\
                        element = docNode.firstChild;\n\
                    }\n\
                    function getPath (el) {\n\
                        if (!(el instanceof Element)) return;\n\
                        var path = [];\n\
                        while (el.nodeType === Node.ELEMENT_NODE) {\n\
                            var selector = el.nodeName.toLowerCase();\n\
                            if (el.id) {\n\
                                selector += '#' + el.id;\n\
                            } else {\n\
                                var sib = el, nth = 1;\n\
                                while (sib.nodeType === Node.ELEMENT_NODE && (sib = sib.previousSibling) && nth++);\n\
                                selector += ':nth-child('+nth+')';\n\
                            }\n\
                            path.unshift(selector);\n\
                            el = el.parentNode;\n\
                        }\n\
                        return path.join(' > ');\n\
                    }\n\
                    function treeHTML(element, object, found) {\n\
                        object['type'] = element.nodeName;\n\
                        var nodeList = element.childNodes;\n\
                        if (nodeList != null) {\n\
                            if (nodeList.length) {\n\
                                object['content'] = [];\n\
                                for (var i = 0; i < nodeList.length; i++) {\n\
                                    if (nodeList[i].nodeType == 3) {\n\
                                        object['content'].push(nodeList[i].nodeValue);\n\
                                        if (nodeList[i].nodeValue.indexOf(content) > -1) {\n\
                                            elementFound['cssPath'] = getPath(element);\n\
                                        }\n\
                                    } else {\n\
                                        object['content'].push({});\n\
                                        treeHTML(nodeList[i], object['content'][object['content'].length -1], found);\n\
                                    }\n\
                                }\n\
                            }\n\
                        }\n\
                    }\n\
                    treeHTML(element, treeObject, elementFound);\n\
                    return elementFound;\n\
                }, element, content);\n\
            }\n\n\
            ";
        }

        private CleanHtmlFunction(): string {
            return "function cleanHtml(html) {\n\
                var sanitize = require('sanitize-html');\n\
                return sanitize(html, {\n\
                    allowedTags: false,\n\
                    allowedAttributes: false\n\
                });\n\
            }\n\n\
            ";
        }

        private GetSelectorByContent(): string {
            return "function getSelectorByContent(browser, selector, content, nextPrev) {\n\
                var html = browser.getHTML(selector, true);\n\
                html = cleanHtml(html);\n\
                var element = getCssPath(browser, html, content);\n\
                var cssPath = '';\n\
                if (element.value.cssPath) {\n\
                    var elementsArray = element.value.cssPath.split(' > ');\n\
                    if (elementsArray.length > 0) {\n\
                        elementsArray[0] = selector;\n\
                        cssPath = elementsArray.join('>');\n\
						if (nextPrev === 'nextElement' || nextPrev === 'previousElement') {\n\
							elementsArray = elementsArray.slice(0,-1);\n\
							var parentSelector  = elementsArray.join('>');\n\
							var elements = browser.elements(parentSelector + '>*');\n\
							if(elements.value.length > 1) {\n\
								var nextCssPath = '';\n\
								var previousCssPath = '';\n\
								for (var index = 0; index < elements.value.length; index++) {\n\
									var childHtml = browser\n\
									.getHTML(parentSelector + '>*:nth-child(' + (index + 1) + ')', true);\n\
									childHtml = cleanHtml(childHtml);\n\
									var childElement = getCssPath(browser, childHtml, content);\n\
									if (childElement.value.cssPath) {\n\
										if (index > 0 && index < elements.value.length) {\n\
											previousCssPath = parentSelector + '>*:nth-child(' + index + ')';\n\
										}\n\
										if(index + 2 <= elements.value.length) {\n\
											nextCssPath = parentSelector + '>*:nth-child(' + (index + 2) + ')';\n\
										}\n\
										break;\n\
									}\n\
								}\n\
								if (nextPrev === 'nextElement') {\n\
									cssPath = nextCssPath;\n\
								} else {\n\
									cssPath = previousCssPath;\n\
								}\n\
							}\n\
						}\n\
                    }\n\
                }\n\
                return cssPath;\n\
            }\n\n\
            ";
        }

        private CssPathFunctions(): string {
            return this.GetCssPathFunction() 
            + this.CleanHtmlFunction() 
            + this.GetSelectorByContent();
        }

        generate(functions: Array<string>): string {
            return "module.exports = function() {\n\
            var globalValues = {};\n\n"
            + this.CssPathFunctions()
            + functions.join("\n\n") + "\n };";
        }
    }
}
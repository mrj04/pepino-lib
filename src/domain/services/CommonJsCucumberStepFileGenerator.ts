"use strict";
export module Pepino {

    export interface IStepFileGenerator {
        generate(functions: Array<string>): string;
    }

    export class CommonJsCucumberStepFileGenerator implements IStepFileGenerator {

        private GetCssPathFunction(): string {
            return "function getCssPath(browser, element, content, inElement) {\n\
                return browser.execute(function(element, content, inElement) {\n\
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
                                            if (inElement.length > 0 && element.nodeName === inElement) {\n\
                                                elementFound['cssPath'] = getPath(element);\n\
                                            } else if (inElement.length === 0) {\n\
                                                elementFound['cssPath'] = getPath(element);\n\
                                            }\n\
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
                }, element, content, inElement);\n\
            }\n\n\
            ";
        }

        private CleanHtmlFunction(): string {
            return "function cleanHtml(html) {\n\
                var sanitize;\n\
                try {\n\
                    sanitize = require('pepino/node_modules/sanitize-html');\n\
                } catch(e) {\n\
                    sanitize = require('sanitize-html');\n\
                }\n\
                return sanitize(html, {\n\
                    allowedTags: false,\n\
                    allowedAttributes: false\n\
                });\n\
            }\n\n\
            ";
        }

        private GetSelectorByContent(): string {
            return "function getSelectorByContent(browser, selector, content, forElement, inElement) {\n\
                var rawSelector = selector;\n\
                var elementsArray;\n\
                if (selector.indexOf('>') > -1) {\n\
                    elementsArray = selector.split('>');\n\
                    elementsArray = elementsArray.slice(0,-1);\n\
                    selector = elementsArray.join('>');\n\
                }\n\
                var html = browser.getHTML(selector, true);\n\
                html = cleanHtml(html);\n\
                var element = getCssPath(browser, html, content, inElement);\n\
                var cssPath = '';\n\
                if (element.value.cssPath) {\n\
                    elementsArray = element.value.cssPath.split(' > ');\n\
                    if (elementsArray.length > 0) {\n\
                        elementsArray[0] = selector;\n\
                        cssPath = elementsArray.join('>');\n\
						if (forElement === 'nextElement' || forElement === 'previousElement' || forElement === 'parentElement') {\n\
							elementsArray = elementsArray.slice(0,-1);\n\
							var parentSelector = elementsArray.join('>');\n\
							var elements = browser.elements(parentSelector + '>*');\n\
							if(elements.value.length > 1) {\n\
                                var currentCssPath = '';\n\
								var nextCssPath = '';\n\
								var previousCssPath = '';\n\
								for (var index = 0; index < elements.value.length; index++) {\n\
									var childHtml = browser\n\
									.getHTML(parentSelector + '>*:nth-child(' + (index + 1) + ')', true);\n\
									childHtml = cleanHtml(childHtml);\n\
									var childElement = getCssPath(browser, childHtml, content, inElement);\n\
									if (childElement.value.cssPath) {\n\
                                        currentCssPath = parentSelector + '>*:nth-child(' + (index + 1) + ')';\n\
										if (index > 0 && index < elements.value.length) {\n\
											previousCssPath = parentSelector + '>*:nth-child(' + index + ')';\n\
										}\n\
										if(index + 2 <= elements.value.length) {\n\
											nextCssPath = parentSelector + '>*:nth-child(' + (index + 2) + ')';\n\
										}\n\
										break;\n\
									}\n\
								}\n\
								if (forElement === 'parentElement') {\n\
									var rawSelectorElements = rawSelector.split('>');\n\
									var parentSelectorElements = currentCssPath.split('>');\n\
									parentSelectorElements = \n\
									parentSelectorElements.slice(0, rawSelectorElements.length - parentSelectorElements.length);\n\
									cssPath = parentSelectorElements.join('>');\n\
								} else if (forElement === 'previousElement') {\n\
                                    cssPath = previousCssPath;\n\
                                } else {\n\
                                    cssPath = nextCssPath;\n\
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
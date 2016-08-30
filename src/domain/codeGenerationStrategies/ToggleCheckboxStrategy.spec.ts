"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {ToggleCheckboxStrategy} from "./ToggleCheckboxStrategy";

describe("when converting pepino-lang instructions to toggle a checkbox", () => {
	describe('without variables', () => {
		var strategy = new ToggleCheckboxStrategy();
		var instructions = "ToggleCheckbox <#checkboxElement>";

		it("should be able to generate typing instructions", () => {
			expect(strategy.canGenerate(instructions)).to.be.true;
		});

		it("should pass on unrecognized instructions", () => {
			expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
		});
	
		it("should convert the step to cucumberjs code", () => {
			expect(strategy.generate(instructions))
				.to.equal("this.browser.click(\"#checkboxElement\");");
		});
	});

	describe('with variables', () => {
		var strategy = new ToggleCheckboxStrategy();
		var instructions = "ToggleCheckbox <#checkboxElement>";

		it("should convert the assert to jasmine expect code with correct variable element", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.click(\"#checkboxElement\");");
        });  
	});
});

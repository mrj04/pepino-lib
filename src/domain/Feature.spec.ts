"use strict";
import chai = require("chai");
var expect = chai.expect;
import {Feature} from "./Feature";
import {Scenario} from "./Scenario";

describe("A Feature", () => {

    describe("when instantiating a feature", () => {

        var feature = new Feature("test", new Array<Scenario>());

        it("should be an instance of a feature object", (done) => {
             expect(feature).to.be.an.instanceOf(Feature);
             done();
        });
    });
});
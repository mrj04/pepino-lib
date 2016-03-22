"use strict";
var Feature_1 = require("../../domain/Feature");
var Scenario_1 = require("../../domain/Scenario");
var CriteriaSegment_1 = require("../../domain/CriteriaSegment");
var gherkin = require('gherkin');
var _ = require('underscore');
var FeatureParserError_1 = require("./errors/FeatureParserError");
var parser = new gherkin.Parser();
var Pepino;
(function (Pepino) {
    class GherkinFeatureParser {
        parse(s) {
            try {
                var f = parser.parse(s);
                var name = f.name;
                var scenarios = _.map(f.scenarioDefinitions, (s) => {
                    var steps = _.map(s.steps, (step) => {
                        return new CriteriaSegment_1.CriteriaSegment(step.keyword.trim(), step.text);
                    });
                    return new Scenario_1.Scenario(s.name, steps);
                });
                return new Feature_1.Feature(name, scenarios);
            }
            catch (err) {
                throw new FeatureParserError_1.FeatureParserError("The last feature file attempted resulted in an error.", err);
            }
        }
    }
    Pepino.GherkinFeatureParser = GherkinFeatureParser;
})(Pepino = exports.Pepino || (exports.Pepino = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9zZXJ2aWNlcy9GZWF0dXJlUGFyc2VyLnRzIl0sIm5hbWVzIjpbIlBlcGlubyIsIlBlcGluby5HaGVya2luRmVhdHVyZVBhcnNlciIsIlBlcGluby5HaGVya2luRmVhdHVyZVBhcnNlci5wYXJzZSJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2Isd0JBQXNCLHNCQUFzQixDQUFDLENBQUE7QUFDN0MseUJBQXVCLHVCQUF1QixDQUFDLENBQUE7QUFDL0MsZ0NBQThCLDhCQUE4QixDQUFDLENBQUE7QUFDN0QsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDaEMsbUNBQWlDLDZCQUE2QixDQUFDLENBQUE7QUFFL0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFbEMsSUFBYyxNQUFNLENBd0JuQjtBQXhCRCxXQUFjLE1BQU0sRUFBQyxDQUFDO0lBTWxCQTtRQUNJQyxLQUFLQSxDQUFDQSxDQUFTQTtZQUNYQyxJQUFHQSxDQUFDQTtnQkFDQUEsSUFBSUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxJQUFJQSxHQUFXQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDMUJBLElBQUlBLFNBQVNBLEdBQW9CQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxtQkFBbUJBLEVBQUVBLENBQUNBLENBQUNBO29CQUM1REEsSUFBSUEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsSUFBSUE7d0JBQzVCQSxNQUFNQSxDQUFDQSxJQUFJQSxpQ0FBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQy9EQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSEEsTUFBTUEsQ0FBQ0EsSUFBSUEsbUJBQVFBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN2Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0hBLE1BQU1BLENBQUNBLElBQUlBLGlCQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUN4Q0EsQ0FDQUE7WUFBQUEsS0FBS0EsQ0FBQUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ1BBLE1BQU1BLElBQUlBLHVDQUFrQkEsQ0FBQ0EsdURBQXVEQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMvRkEsQ0FBQ0E7UUFDTEEsQ0FBQ0E7SUFDTEQsQ0FBQ0E7SUFqQllELDJCQUFvQkEsdUJBaUJoQ0EsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUF4QmEsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBd0JuQiIsImZpbGUiOiJkb21haW4vc2VydmljZXMvRmVhdHVyZVBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=

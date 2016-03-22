"use strict";
var _ = require('underscore');
var p = require('./domain/services/StepParser');
var g = require('./domain/services/CucumberStepFunctionGenerator');
var fileGen = require('./domain/services/CommonJsCucumberStepFileGenerator');
var ClickElementStrategy_1 = require('./domain/codeGenerationStrategies/ClickElementStrategy');
var NavigateStrategy_1 = require('./domain/codeGenerationStrategies/NavigateStrategy');
var TypeTextWithElementStrategy_1 = require('./domain/codeGenerationStrategies/TypeTextWithElementStrategy');
var TypeTextWithoutElementStrategy_1 = require('./domain/codeGenerationStrategies/TypeTextWithoutElementStrategy');
var JasmineExpectStrategy_1 = require('./domain/jasmineExpectCodeGeneration/JasmineExpectStrategy');
var stepParser = new p.Pepino.PepinoLangStepParser();
var codeGenerator = new g.Pepino.CucumberStepFunctionGenerator(new Array(new ClickElementStrategy_1.ClickElementStrategy(), new NavigateStrategy_1.NavigateStrategy(), new TypeTextWithElementStrategy_1.TypeTextWithElementStrategy(), new TypeTextWithoutElementStrategy_1.TypeTextWithoutElementStrategy(), new JasmineExpectStrategy_1.JasmineExpectStrategy()));
var stepFileGenerator = new fileGen.Pepino.CommonJsCucumberStepFileGenerator();
class converter {
    constructor(fileGenerator, parser, stepGenerator) {
        this.fileGenerator = fileGenerator;
        this.parser = parser;
        this.stepGenerator = stepGenerator;
    }
    converter(pepinoStepFile) {
        var steps = this.parser.parse(pepinoStepFile);
        var stepsBySegment = _.groupBy(steps, (step) => {
            return step.segment;
        });
        var functions = _.map(Object.keys(stepsBySegment), (key) => {
            return this.stepGenerator.generate(stepsBySegment[key]);
        });
        var commonJsFile = this.fileGenerator.generate(functions);
        return commonJsFile;
    }
}
module.exports = new converter(stepFileGenerator, stepParser, codeGenerator);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbImNvbnZlcnRlciIsImNvbnZlcnRlci5jb25zdHJ1Y3RvciIsImNvbnZlcnRlci5jb252ZXJ0ZXIiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksQ0FBQyxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBRWhDLElBQVksQ0FBQyxXQUFNLDhCQUE4QixDQUFDLENBQUE7QUFDbEQsSUFBWSxDQUFDLFdBQU0saURBQWlELENBQUMsQ0FBQTtBQUNyRSxJQUFZLE9BQU8sV0FBTSxxREFBcUQsQ0FBQyxDQUFBO0FBRy9FLHFDQUFtQyx3REFBd0QsQ0FBQyxDQUFBO0FBQzVGLGlDQUErQixvREFBb0QsQ0FBQyxDQUFBO0FBQ3BGLDRDQUEwQywrREFBK0QsQ0FBQyxDQUFBO0FBQzFHLCtDQUE2QyxrRUFBa0UsQ0FBQyxDQUFBO0FBQ2hILHNDQUFvQyw0REFBNEQsQ0FBQyxDQUFBO0FBR2pHLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0FBQ3JELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLEtBQUssQ0FDcEUsSUFBSSwyQ0FBb0IsRUFBRSxFQUMxQixJQUFJLG1DQUFnQixFQUFFLEVBQ3RCLElBQUkseURBQTJCLEVBQUUsRUFDakMsSUFBSSwrREFBOEIsRUFBRSxFQUNwQyxJQUFJLDZDQUFxQixFQUFFLENBQzlCLENBQUMsQ0FBQztBQUNILElBQUksaUJBQWlCLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7QUFFL0U7SUFFSUEsWUFBb0JBLGFBQWdEQSxFQUNoREEsTUFBNEJBLEVBQzVCQSxhQUF5REE7UUFGekRDLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFtQ0E7UUFDaERBLFdBQU1BLEdBQU5BLE1BQU1BLENBQXNCQTtRQUM1QkEsa0JBQWFBLEdBQWJBLGFBQWFBLENBQTRDQTtJQUM3RUEsQ0FBQ0E7SUFFREQsU0FBU0EsQ0FBQ0EsY0FBc0JBO1FBQzVCRSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtRQUU5Q0EsSUFBSUEsY0FBY0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsSUFBSUE7WUFDdkNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3hCQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVIQSxJQUFJQSxTQUFTQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQTtZQUNuREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNURBLENBQUNBLENBQUNBLENBQUNBO1FBRUhBLElBQUlBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1FBRTFEQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQTtJQUN4QkEsQ0FBQ0E7QUFDTEYsQ0FBQ0E7QUFFRCxpQkFBUyxJQUFJLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9

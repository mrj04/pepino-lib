"use strict";
var Pepino;
(function (Pepino) {
    class CommonJsCucumberStepFileGenerator {
        generate(functions) {
            return "module.exports = function() {\n" + functions.join("\n\n") + "\n };";
        }
    }
    Pepino.CommonJsCucumberStepFileGenerator = CommonJsCucumberStepFileGenerator;
})(Pepino = exports.Pepino || (exports.Pepino = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi9zZXJ2aWNlcy9Db21tb25Kc0N1Y3VtYmVyU3RlcEZpbGVHZW5lcmF0b3IudHMiXSwibmFtZXMiOlsiUGVwaW5vIiwiUGVwaW5vLkNvbW1vbkpzQ3VjdW1iZXJTdGVwRmlsZUdlbmVyYXRvciIsIlBlcGluby5Db21tb25Kc0N1Y3VtYmVyU3RlcEZpbGVHZW5lcmF0b3IuZ2VuZXJhdGUiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiLElBQWMsTUFBTSxDQVduQjtBQVhELFdBQWMsTUFBTSxFQUFDLENBQUM7SUFNbEJBO1FBQ0lDLFFBQVFBLENBQUNBLFNBQXdCQTtZQUM3QkMsTUFBTUEsQ0FBQ0EsaUNBQWlDQSxHQUFHQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQTtRQUNoRkEsQ0FBQ0E7SUFDTEQsQ0FBQ0E7SUFKWUQsd0NBQWlDQSxvQ0FJN0NBLENBQUFBO0FBQ0xBLENBQUNBLEVBWGEsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBV25CIiwiZmlsZSI6ImRvbWFpbi9zZXJ2aWNlcy9Db21tb25Kc0N1Y3VtYmVyU3RlcEZpbGVHZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9

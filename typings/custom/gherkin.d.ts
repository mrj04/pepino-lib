// Type definitions for gherkin-js
// Project: https://github.com/cucumber/gherkin-javascript
// Definitions by: Byron Sommardahl <https://github.com/bsommardahl>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'gherkin'{
    export class Pickles{
        name: string;
        scenarioDefinitions: Array<ScenarioDefinition>;
    }

    export class Parser{
        parse: (featureFile: string) => Pickles;                
    }
    
    export class ScenarioDefinition{
        name: string;
        steps: Array<StepDefinition>;
    }
    
    export class StepDefinition{
        keyword: string;
        text: string;
    }
}
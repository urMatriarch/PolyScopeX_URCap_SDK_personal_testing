/// <reference lib="webworker" />
import {
    ApplicationBehaviors,
    ApplicationNode, OptionalPromise,
    registerApplicationBehavior,
    ScriptBuilder
} from '@universal-robots/contribution-api';
import { ApptestNode } from './apptest.node';
import { ApplicationBehaviorAPI } from '@universal-robots/contribution-api';

const api = new ApplicationBehaviorAPI(self);
export function makeVariable(): number{
    try {
        const declaration = api.variableService.createVariable('test', 'pose');
        console.log("Created a variable")
        return 1;
    } catch (error) {
        console.error("Something went wrong:", error);
        return 0;
    }
};

// factory is required
const createApplicationNode = (): OptionalPromise<ApptestNode> => ({
    type: 'marquardt-apptest-apptest',    // type is required
    version: '1.0.0'     // version is required
});

// generatePreamble is optional
const generatePreambleScriptCode = (node: ApptestNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    return builder;
};

// upgradeNode is optional
const upgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: ApptestNode): ApptestNode =>
      defaultNode;

// downgradeNode is optional
const downgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: ApptestNode): ApptestNode =>
      defaultNode;

const behaviors: ApplicationBehaviors = {
    factory: createApplicationNode,
    generatePreamble: generatePreambleScriptCode,
    upgradeNode: upgradeApplicationNode,
    downgradeNode: downgradeApplicationNode
};

registerApplicationBehavior(behaviors);

/// <reference lib="webworker" />
import {
  OperatorScreenBehaviors,
  registerOperatorScreenBehavior
} from '@universal-robots/contribution-api';

const behaviors: OperatorScreenBehaviors = {
  factory: () => {
    return {
      type: "marquardt-test-test1",
      version: "1.0.0",
    };
  },
};

registerOperatorScreenBehavior(behaviors);

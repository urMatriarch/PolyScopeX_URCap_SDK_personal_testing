import {
  registerSidebarBehavior,
  SidebarItemBehaviors,
} from "@universal-robots/contribution-api";

const behaviors: SidebarItemBehaviors = {
  factory: () => {
    return {
      type: "marquardt-test-test",
      version: "1.0.0",
    };
  },
};

registerSidebarBehavior(behaviors);

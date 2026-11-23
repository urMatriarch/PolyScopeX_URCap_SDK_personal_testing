import { ApplicationNode } from '@universal-robots/contribution-api';

export interface ApptestNode extends ApplicationNode {
  type: string;
  version: string;
}

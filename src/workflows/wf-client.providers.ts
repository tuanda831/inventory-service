import { Connection, WorkflowClient } from '@temporalio/client';

export const wfClientProvider = [
  {
    provide: WorkflowClient,
    useFactory: (connection: Connection) => new WorkflowClient({ connection }),
    inject: [Connection],
  },
];

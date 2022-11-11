import { Connection } from '@temporalio/client';

export const workflowConnectionProvider = [
  {
    provide: Connection,
    useFactory: async () => {
      return await Connection.connect();
    },
  },
];

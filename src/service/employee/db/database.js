import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import Employee from './employee';
import schema from './schema';

const adapter = new SQLiteAdapter({
    schema,
});

export const database = new Database({
    adapter,
    modelClasses: [Employee],
    actionsEnabled: true,
});
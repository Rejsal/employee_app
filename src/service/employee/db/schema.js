import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'employee',
      columns: [
        {name: 'eid', type: 'number'},
        {name: 'name', type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'profile_image', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'website', type: 'string'},
        {name: 'company', type: 'string'},
      ],
    }),
  ],
});
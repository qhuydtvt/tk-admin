import React from 'react';
import { TKTable, TKDataTable, createDataProvider  } from 'tk-admin';

export default () => (
  <div>
    <TKDataTable
      renderTable={props => <TKTable {...props} />}
      provideData={createDataProvider('https://tk-cm-dummy.herokuapp.com/api/v1/customers')}
      headers={[
        {
          field: 'personalInfo.firstName',
          name: 'First name',
          sortable: true,
        },
        {
          field: 'personalInfo.lastName',
          name: 'Last name',
        },
        {
          field: 'personalInfo.email',
          name: 'Email',
        },
        {
          field: 'personalInfo.phoneNumber',
          name: 'Phone',
        },
        {
          field: 'personalInfo.socialMedia',
          name: 'Social media',
        },
        {
          field: 'regInfoList.length',
          name: 'Registration',
        },
      ]}
     />
  </div>
)

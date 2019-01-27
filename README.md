# Component for displaying data table
# `tk-table = Material-UI + axios`
## Usage
```
import {TKTable, TKDataTable, createDataProvider} from 'tk-admin';

<TKDataTable
  renderTable={props => <TKTable {...props} />}
  provideData={createDataProvider('https://tk-cm-dummy.herokuapp.com/api/v1/customers')}
  headers={[
    {
      field: 'personalInfo.firstName',
      name: 'First name',
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

```
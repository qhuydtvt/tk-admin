# Component for displaying common admin UI
## `tk-admin = material-ui + axios + formik`
## Usage

### TKTable

```
import {TKTable, TKDataTable, createDataProvider} from 'tk-admin';

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
      sortable: true,
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

### TKDrawer and TKAppbar

```
<TKDrawer
  style={styles}
  panels={panels}
  renderAppbar={() => (
    <TKAppbar
      title="Teach"
      menuItems={[
        {
          title: 'Logout',
          icon: <PowerSettingsNew />,
          onClick: () => console.log('Logout'),
        },
      ]}
    />
  )}
/>
```
# Component for displaying common admin UI
## `tk-admin = material-ui + axios + formik`
## Usage

### TKDataTable

```
import {TKTable, TKDataTable, createDataProvider, createProvideDataPage} from 'tk-admin';

const provideCustomerDataPage = createProvideDataPage('https://tk-cm-dummy.herokuapp.com/api/v1/customers');

<TKDataTable
  headers={[
    {
      title: 'First name',
      dataField: 'personalInfo.firstName',
      sortable: true,
    },
    {
      title: 'Last name',
      dataField: 'personalInfo.lastName',
      sortable: true,
    },
    {
      title: 'Email',
      dataField: 'personalInfo.email',
    },
    {
      title: 'Phone',
      dataField: 'personalInfo.phoneNumber',
    },
    {
      title: 'Registrations',
      dataField: 'regInfoList[0].courseRef'
    }
  ]}
  provide={provideCustomerDataPage}
  renderTable={props => <TKTable {...props} />}
/>
```

### Searchbar and filters

```
<TKDataTable
  ...
  renderToolbar={props => (
    <TKTableToolbar
      filterConfigs={[{
        filterField: 'course',
        provide: provideResourceOptions,
        render: props => <TKDataDropdown title="Course" {...props} />,
      }]}
      {...props}
    />
  ) }
  ...
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
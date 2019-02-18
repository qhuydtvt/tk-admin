# Component for displaying common admin UI
## `tk-admin = material-ui + axios + formik`
## Usage

### TKDataTable

```
import { TKTable, TKDataTable, createDataProvider, createProvideDataPage, createDeleteOne } from 'tk-admin';

const provideCustomerDataPage = createProvideDataPage('https://tk-cm-dummy.herokuapp.com/api/v1/customers');
const deleteOne = createDeleteOne('https://tk-cm-dummy.herokuapp.com/api/v1/customers');

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
  onRowClick={(item) => console.log(item)}  // handle row click
  provide={provideCustomerDataPage}
  deleteOne={deleteOne}
/>
```

### Filters

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

### Customize data cell rendering

```
<TKDataTable
  headers={[
    ...
    {
      title: 'Registrations', 
      dataField: 'regInfoList.length',
      renderDataCell: props => (
        <TableCell key={props.key}>
          <Button onClick={(e) => {
              props.change([], 'regInfoList');
              e.stopPropagation();
            }}
          >{props.value}</Button>
        </TableCell>)
    }
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
      {...props}
    />
  )}
/>
```
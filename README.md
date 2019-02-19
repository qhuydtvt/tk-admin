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

const panels = [
  {
    icon: <Dashboard />,
    title: 'Dashboard',
    view: () => (<AppBoard />),
    link: '/dashboard',
    noPaper: true,
  },
  <!-- Child need declare before parent -->
  {
    icon: <UserDetail />,
    title: 'UserDetail,
    view: () => (<UserDetail />),
    link: '/users/:id, 
    isChild,
  },
  {
    icon: <Users />,
    title: 'Users',
    view: () => (<Users />),
    link: '/users',
  },
];

```
<TKDrawer
  style={styles}
  panels={panels}
  basename="/homepage"
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
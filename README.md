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
      onCreate={() => console.log('onCreate')}
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
              console.log(props.value); // current value
              console.log(props.item); // current row
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
const panels = [
  {
    icon: <Dashboard />,
    title: 'Dashboard',
    view: () => <div>ABCXYZ VCL</div>,
    link: '/',
    subMenu: 'Resources',
    noMenu: true,
  },
  // noPaper: bool - no Paper
  // noMenu: bool - it will be not shown in Drawer
  // subMenu: string - if panel has subMenu prop, Drawer will render by SubMenu List
  {
    icon: <Build />,
    title: 'Exercise',
    view: () => <span>Content Here</span>,
    link: '/abc',
    noPaper: true,
  },
];

const menuItems = [
  {
    title: 'Logout',
    icon: <PowerSettingsNew />,
    onClick: () => {},
  },
  {
    title: 'Logout',
    icon: <PowerSettingsNew />,
    onClick: () => {},
  },
];

const styleAppbar = {
  // colorAppbar: 'default',
  colorTitle: '#000',
};

const styleDrawer = {
  submenu: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  color: {
    color: 'white',
  },
  hover: {
    // backgroundColor: 'rgba(220, 20, 60, 0.5)',
  },
  actived: {
    // backgroundColor: 'rgba(220, 20, 60, 0.9)',
  },
  mainColorPalette: '#fff',
  secondaryColorPalette: '#000',
  backgroundDrawer: "https://demos.creative-tim.com/material-dashboard-react/static/media/sidebar-4.fc9cb053.jpg",
  // backgroundColor: 'rgba(220, 20, 60, 0.8)'
}

const Main = (props) => {
  return (
    <div className="App">
      <TKDrawer
        panels={panels}
        // basename="/"
        // Optional
        style={styleDrawer}
        renderUpSidebar={
          props => (
            <div style={{ margin:'auto', width: '100%', color: 'white'}}>
              <p style={{ textAlign: 'center', fontSize: '20px'}}>TK Drawers</p>
            </div>
          )
        }
        renderAppbar={appBarProps => (
          <TKAppbar
            style={styleAppbar}
            title="Teach"
            menuItems={menuItems}
            {...appBarProps}
          />
        )}
      />
    </div>
  );
};
```

### TK DROPDOWN
```
  const listOptions = [
    {
      id: 1,
      firstName: 'abc',
      lastName: 'xyz',
      age: 32
    },
    {
      id: 2,
      firstName: 'ccc',
      lastName: 'bbb',
      age: 24
    },
    {
      id: 3,
      firstName: 'ddd',
      lastName: 'mmm',
      age: 56
    },
  ]

  <TKDropdown
    menuItems={listOptions}
    title="Title"
    emptyItemTitle="Choose..."
    displayText="name"
    displayValue="id"
  />

```

### TK ASYNC SELECT
```
  <TKAsyncSelect
    fetchOptions={query => axios.get(`http://jsonplaceholder.typicode.com/users?q=${query}`)}
    onChange={item => console.log(item)}
    label="Lable"
    placeholder="Search something..."
    value={this.state.value}
    displayText="name"
    displayValue="id"
  />

```

### TK SELECT
displayText / displayValue = String or Func to display field in List
if displayText / displayValue = null, default Value of Text = title, Value = value

```
  const listOptions = [
    {
      id: 1,
      firstName: 'abc',
      lastName: 'xyz',
      age: 32
    },
    {
      id: 2,
      firstName: 'ccc',
      lastName: 'bbb',
      age: 24
    },
    {
      id: 3,
      firstName: 'ddd',
      lastName: 'mmm',
      age: 56
    },
  ]

  const fullName = record => `${record.firstName} + ${record.lastName}`

  <TKSelect
    options={listOptions}
    onChange={(item) => this.changeTest(item)}
    placeholder="Test PlaceHolder TK SELECT"
    value={this.state.value}
    label="Label"
    displayText="name"
    <!-- displayText={fullName} -->
    displayValue="id"
  />
```

### StoreState Locally
changeState is a function to change state in store;

```
const state = [
  { showVideo: false },
  { showExercise: false },
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { storeState, changeState } = this.props;
    const { showVideo } = storeState;

    return (
      <div className="App">
        <span>showVideo: {storeState.showVideo ? 'True' : 'False'}</span>
        <div onClick={() => changeState({showVideo: !showVideo})}>
          <button>Click To Change State</button>
        </div>
      </div>
    );
  }
}

export default storeState(state)(App);

```
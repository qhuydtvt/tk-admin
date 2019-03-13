import React from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import _ from 'lodash';

const checkFunctionOrString = (el, inputDisplay) => {
  if (typeof (inputDisplay) === 'function') {
    return inputDisplay(el);
  }
  return _.get(el, inputDisplay);
};

const TKDropdown = (props) => {
  const {
    menuItems,
    onChange,
    value,
    title,
    name,
    style,
    emptyItemTitle,
    displayValue,
    displayText,
  } = props;
  return (
    <FormControl
      style={style}
    >
      <InputLabel htmlFor={`tk-dd-${name}`}>{title}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        inputProps={{
          name,
          id: `tk-dd-${name}`,
        }}
      >
        <MenuItem value="">
          <em>{emptyItemTitle}</em>
        </MenuItem>
        {
          menuItems.map(item => (
            <MenuItem
              value={displayValue ? checkFunctionOrString(item, displayValue) : item.value}
              key={displayValue ? checkFunctionOrString(item, displayValue) : item.value}
            >
              {displayText ? checkFunctionOrString(item, displayText) : item.title}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

TKDropdown.defaultProps = {
  menuItems: [],
  onChange: null,
  displayValue: null,
  displayText: null,
  value: '',
  style: { marginTop: '0px', marginRight: '8px' },
  emptyItemTitle: '',
  name: '"name" prop should be provided',
  title: '"title" prop should be provided',
};

TKDropdown.propTypes = {
  menuItems:
  PropTypes.oneOfType([
    PropTypes.shape([
      PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.shape({}),
        ]),
        title: PropTypes.string.isRequired,
      }),
    ]),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  displayValue: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  displayText: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({}),
  ]),
  emptyItemTitle: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.shape({}),
};

export default TKDropdown;


// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@material-ui/core';

// const TKDropdown = (props) => {
//   const {
//     menuItems,
//     onChange,
//     value,
//     title,
//     name,
//     style,
//     emptyItemTitle,
//   } = props;
//   return (
//     <FormControl
//       style={style}
//     >
//       <InputLabel htmlFor={`tk-dd-${name}`}>{title}</InputLabel>
//       <Select
//         value={value}
//         onChange={onChange}
//         inputProps={{
//           name,
//           id: `tk-dd-${name}`,
//         }}
//       >
//         <MenuItem value="">
//           <em>{emptyItemTitle}</em>
//         </MenuItem>
//         {
//           menuItems.map(item => (
//             <MenuItem value={item.value} key={item.value}>
//               {item.title}
//             </MenuItem>
//           ))
//         }
//       </Select>
//     </FormControl>
//   );
// };

// TKDropdown.defaultProps = {
//   menuItems: [],
//   onChange: null,
//   value: '',
//   style: { marginTop: '0px', marginRight: '8px' },
//   emptyItemTitle: '',
//   name: '"name" prop should be provided',
//   title: '"title" prop should be provided',
// };

// TKDropdown.propTypes = {
//   menuItems: PropTypes.shape([
//     PropTypes.shape({
//       value: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//         PropTypes.shape({}),
//       ]),
//       title: PropTypes.string.isRequired,
//     }),
//   ]),
//   onChange: PropTypes.func,
//   value: PropTypes.oneOf([
//     PropTypes.string,
//     PropTypes.number,
//     PropTypes.shape({}),
//   ]),
//   emptyItemTitle: PropTypes.string,
//   title: PropTypes.string,
//   name: PropTypes.string,
//   style: PropTypes.shape({}),
// };

// export default TKDropdown;

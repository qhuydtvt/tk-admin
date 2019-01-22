import _ from 'lodash';

export function nestFmkProps(formProps, nestedFieldName) {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateForm,
  } = formProps;

  const combineWithFieldName = subField => (
    subField.startsWith('[') ? `${nestedFieldName}${subField}` : `${nestedFieldName}.${subField}`
  );

  const nestedHandleChange = (event) => {
    setFieldValue(combineWithFieldName(event.target.name), event.target.value);
  };

  const nestedSetFieldTouched = (name, value) => {
    setFieldTouched(combineWithFieldName(name), value);
  };

  const nestedSetFieldValue = (name, value) => {
    setFieldValue(combineWithFieldName(name), value);
  };

  const nestedHandleBlur = (event) => {
    nestedSetFieldTouched(event.target.name, true);
    validateForm(values);
  };

  const nestedValidateForm = (fieldValues) => {
    const valuesToValidate = _.cloneDeep(values);
    _.set(valuesToValidate, nestedFieldName, fieldValues);
    validateForm(valuesToValidate);
  };

  return {
    ...formProps,
    values: _.get(values, nestedFieldName),
    errors: _.get(errors, nestedFieldName) ? _.get(errors, nestedFieldName) : {},
    touched: _.get(touched, nestedFieldName) ? _.get(touched, nestedFieldName) : {},
    handleChange: nestedHandleChange,
    handleBlur: nestedHandleBlur,
    setFieldValue: nestedSetFieldValue,
    setFieldTouched: nestedSetFieldTouched,
    validateForm: nestedValidateForm,
  };
}

export function nestFmkValidate(validate, nestedFieldName) {
  return (values) => {
    const errors = {};
    const subErrors = validate(_.get(values, nestedFieldName));
    if (!!subErrors && !_.isEmpty(subErrors)) {
      _.set(errors, nestedFieldName, subErrors);
    }
    return errors;
  };
}

export function nestFmkArrayValidate(validate) {
  return (values) => {
    const errors = [];
    values.forEach((value, index) => {
      const subError = validate(value);
      if (!!subError && !_.isEmpty(subError)) {
        errors[index] = subError;
      }
    });
    return errors;
  };
}

import React from 'react';
import { string, shape, arrayOf, func } from 'prop-types';
import { NativeSelect } from '@material-ui/core';

function MySelect({ size, variant, options, defaultValue, value, onChange }) {
  return (
    <NativeSelect
      size={size}
      variant={variant}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {defaultValue ? (
        <option disabled value="">
          {defaultValue}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </NativeSelect>
  );
}

MySelect.propTypes = {
  size: string,
  variant: string,
  options: arrayOf(shape({ value: string, name: string })),
  defaultValue: string,
  value: string,
  onChange: func,
};

export default MySelect;

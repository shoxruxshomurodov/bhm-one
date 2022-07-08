import React from "react";
import Select from "react-select";
import { isNil, isEmpty } from "lodash";
import classNames from "classnames";
export default (props) => {
  const {
    filterBy = () => {},
    options,
    placeholder = "",
    className = "",
    title = "",
    index 
  } = props;

  return (
    <>
      {!isEmpty(title) && (
        <small>
          <b>{title}</b>
        </small>
      )}
      <Select
        placeholder={placeholder}
        value={options[index]}
        className={classNames("form-control-sm p-0 mode-text-light", className)}
        onChange={(value) => {
          if (isNil(value)) {
            filterBy("");
          } else filterBy(value.value);
        }}
        options={options}
        isClearable="true"
      />
    </>
  );
};

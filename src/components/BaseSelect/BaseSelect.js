import React from 'react';
import Select from "react-select";
import {isNil} from "lodash";
import classNames from "classnames";

const BaseSelect = ({
                        filterBy = () => {
                        },
                        options = [],
                        placeholder = "Выберите регион",
                        className = "",
                        label = null,
                        index = "",
                    }) => {
    return (
        <>
            {!isNil(label) && (
                <small>
                    <b>{label}</b>
                </small>
            )}
            <Select
                placeholder={placeholder}
                value={options[index]}
                className={classNames("form-control-sm p-0 mode-text-light text-dark", className)}
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

export default BaseSelect;

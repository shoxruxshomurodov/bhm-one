import React from 'react';
import classNames from "classnames"

function DataIsEmpty(props) {
    const {title = "No Results", classnames = "no-result card mx-3 mt-5"} = props;
    return (
        <div className={classNames(classnames)}>
            <div className="p-4 text-center">{title}</div>
        </div>
    );
}

export default DataIsEmpty;
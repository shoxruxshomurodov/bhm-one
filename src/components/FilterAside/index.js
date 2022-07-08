import React from 'react';
import classNames from "classnames"

function FilterAside(props) {
    const {title, children, classname = "text-md"} = props;
    return (<div className="fade aside aside-sm" id="content-aside">
        <div className="modal-dialog d-flex flex-column w-md bg-body" id="user-nav">
            <div className="navbar"><span className={classNames(classname, "mx-2")}>{title}</span></div>
            {children} </div>
    </div>);
}

export default FilterAside;
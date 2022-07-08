import React from 'react';
import classNames from "classnames";
function Toolbar({classname,children}) {
    return (
        <div className={classNames("toolbar", classname)}>
            {children}
        </div>
    );
}

export default Toolbar;

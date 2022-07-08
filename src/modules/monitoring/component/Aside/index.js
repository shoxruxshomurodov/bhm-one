import React from 'react';

import {withTranslation} from "react-i18next";

function Aside(props) {
    const {children,title="Monitoring"} = props;
    return (
        <div className="fade aside aside-sm" id="content-aside">
            <div className="modal-dialog d-flex flex-column w-md bg-body" id="user-nav">
                <div className="navbar">
                    <span className="text-md mx-2">{title}</span>
                </div>
                <div className="scrollable hover">
                    <div className="sidenav p-2">
                        <nav className="nav-active-text-primary">
                            {children}
                        </nav>
                    </div>
                </div>
               </div>
        </div>
    );
}

export default withTranslation("bhm_one")(Aside);

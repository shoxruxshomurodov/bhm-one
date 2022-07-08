import React from "react";
import FilterGroup from "./FilterGroup";

export default (props) => {
  return (
    <div className="aside aside-sm " id="content-aside">
      <div
        className="modal-dialog d-flex flex-column w-md bg-body mode-dark"
        id="user-nav"
      >
        <div>
          <div className="sidenav p-2 ">
            <nav className="nav-active-text-primary" data-nav>
              <FilterGroup {...props} />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

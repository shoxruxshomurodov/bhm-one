import React from "react";
import { NavLink } from "react-router-dom";
import Utils from "../../../../services/helpers/Utils";
import config from "../../../../config";
const TabNav = ({userCan}) => {
  return (
    <div className="b-b mb-2" style={{ width: "20%" }}>
      <div className="nav-active-border b-primary bottom">
        <ul className="nav" role="tablist">
        {Utils.userCanStyle(userCan,[config.ROLES.STREAM_ADMIN]) && (
                  <li className="nav-item">
                  <NavLink to="/upload-video" className="nav-link">
                    Видео юклаш
                  </NavLink>
                </li>
                )}
           {Utils.userCanStyle(userCan,[config.ROLES.STREAM_TAB_ADMIN,config.ROLES.STREAM_ADMIN]) && (
                  <li className="nav-item">
                  <NavLink to="/daily-history" className="nav-link">
                    Кунлик тарихлар
                  </NavLink>
                </li>
                )}
        </ul>
      </div>
    </div>
  );
};
export default TabNav;

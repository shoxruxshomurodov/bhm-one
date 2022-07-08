import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import classNames from "classnames";
import {get, isEqual} from "lodash";

const MenuItem = ({to, icon, title, iconClassname, titleClassname}) => {
  let location = useLocation();
  return (
    <li className={isEqual(get(location, "pathname"), to) ? "active" : ""}>
      <NavLink to={to}>
        {icon && <span className={classNames("nav-icon", iconClassname)}>{icon}</span>}
        <span
          className={classNames("nav-text", titleClassname)}>{title}</span>
      </NavLink>
    </li>
  );
};
export default MenuItem;

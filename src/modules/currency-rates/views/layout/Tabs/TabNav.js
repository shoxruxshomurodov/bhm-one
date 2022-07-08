import React from "react";
import { NavLink } from "react-router-dom";
import { get } from "lodash";
import { useSelector } from "react-redux";
import Utils from "../../../../../services/helpers/Utils";
import config from "../../../../../config";
const TabNav = (props) => {
  const { userCan } = props;


  return (
    <div className="b-b">
      <div className="nav-active-border b-primary bottom">
        <ul className="nav" role="tablist">
          <li className="nav-item ">
            <NavLink
              to="/currency/today"
              className="nav-link"
              style={{ minWidth: "200px" }}
            >
              Сегодня
            </NavLink>
          </li>
          <li className="nav-item">
            {Utils.userCanStyle(userCan, [
              config.ROLES.CURRENCY
            ]) && (
              <NavLink
                to="/currency/list"
                className="nav-link"
              >
                История
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default TabNav;

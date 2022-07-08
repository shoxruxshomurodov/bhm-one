import React from "react";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const TabNav = ({ t }) => {
  return (
    <div className="b-b">
      <div className="nav-active-border b-primary bottom">
        <ul className="nav" role="tablist">
          <li className="nav-item">
            <NavLink to="/send-sms/main" className="nav-link">
              {t("Send SMS")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/send-sms/monitoring/" className="nav-link">
              {t("Send SMS Monitoring")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/send-sms/job" className="nav-link">
              {t("Send Sms Process")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/send-sms/category" className="nav-link">
              {t("Category")}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default withTranslation("bhm_one")(TabNav);

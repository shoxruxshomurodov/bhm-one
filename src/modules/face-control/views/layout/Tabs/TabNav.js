import React from "react";
import { NavLink } from "react-router-dom";
import { get } from "lodash";
import { useSelector } from "react-redux";
import Utils from "../../../../../services/helpers/Utils";
import config from "../../../../../config";
const TabNav = (props) => {
  const { userCan } = props;
  const full_name = useSelector((state) =>
    get(state, "auth.user.profile.NAME", "Ҳодим исм шарифи ўрни")
  );
  const department_name = useSelector((state) =>
    get(
      state,
      "face.data.[0].employee.department_name",
      get(state, "auth.user.section.DEP_NAME")
    )
  );

  return (
    <div className="b-b">
      <div className="nav-active-border b-primary bottom">
        <ul className="nav" role="tablist">
          <li className="nav-item ">
            <NavLink
              to="/face-control/personal-monthly"
              className="nav-link"
              style={{ minWidth: "200px" }}
            >
              {full_name}
            </NavLink>
          </li>
          <li className="nav-item">
            {Utils.userCanStyle(userCan, [
              config.ROLES.DEPARTMENT_MANAGER,
              config.ROLES.FACE_CONTROL_ADMIN
            ]) && (
              <NavLink
                to="/face-control/employees-department"
                className="nav-link"
              >
                {department_name}
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            {Utils.userCanStyle(userCan, config.ROLES.FACE_CONTROL_ADMIN) && (
              <NavLink to="/face-control/department-list" className="nav-link">
                Список Отделов
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            {Utils.userCanStyle(userCan, config.ROLES.FACE_CONTROL_ADMIN) && (
              <NavLink to="/face-control/total-department" className="nav-link">
                Часы Работы Всего Персонала Отдела
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            {Utils.userCanStyle(userCan, [
              config.ROLES.DEPARTMENT_MANAGER,
              config.ROLES.FACE_CONTROL_ADMIN
            ]) && (
              <NavLink to="/face-control/visibility" className="nav-link">
                Видимость
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            {Utils.userCanStyle(userCan, config.ROLES.FACE_CONTROL_ADMIN) && (
              <NavLink
                to="/face-control/visibility-department"
                className="nav-link"
              >
                Видимость отделение
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            {Utils.userCanStyle(userCan, config.ROLES.FACE_CONTROL_ADMIN) && (
              <NavLink to="/face-control/lateDays_reason" className="nav-link">
                Причина Сотрудники
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default TabNav;

import React, { Component } from "react";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import MenuItem from "../../../../components/MenuItem";
import { get } from "lodash";
import { Link } from "react-router-dom";
import MenuParent from "../../../../components/MenuParent";
import WithUser from "../../../../services/auth/rbac/WithUser";
import Utils from "../../../../services/helpers/Utils";
import config from "../../../../config";

class Aside extends Component {
  render() {
    const { goodByeHome, user, t } = this.props;
    return (
      <WithUser>
        {({ userCan }) => {
          return (
            <div
              id="aside"
              className="page-sidenav no-shrink bg-light nav-dropdown fade sticky"
              aria-hidden="true"
              data-class="bg-light"
            >
              <div className="sidenav h-100 modal-dialog bg-light">
                {/* sidenav top */}
                <div className="navbar">
                  {/* brand */}{" "}
                  <Link to={"/home"} className="navbar-brand">
                    <span className={"w-36 avatar gd-info"}>
                      {get(user, "employee.FIRST_NAME")?.charAt(0)}
                      {get(user, "employee.LAST_NAME")?.charAt(0)}
                    </span>
                    <span className="hidden-folded d-inline l-s-n-1x">
                      {get(user, "employee.FIRST_NAME")}{" "}
                      {get(user, "employee.LAST_NAME")}
                      <small className="d-block text-muted mt-1">
                        {get(user, "phone")}
                      </small>
                    </span>
                  </Link>
                </div>
                {/* Flex nav content */}
                <div className="flex scrollable hover">
                  <div className="nav-active-text-primary" data-nav>
                    <ul className="nav bg">
                      <li className="nav-header hidden-folded">
                        <span className="text-muted">{t("Main")}</span>
                      </li>
                      <MenuItem
                        to={"/home"}
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-home"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        }
                        title={t("Dashboard")}
                        iconClassname={"text-primary"}
                      />
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <li className="nav-header hidden-folded">
                          <span className="text-muted">
                            {t("Applications")}
                          </span>
                        </li>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <MenuItem
                          to={"/chat"}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-message-circle"
                            >
                              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                          }
                          title={t("Chat")}
                          iconClassname={"text-warning"}
                        />
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN,
                        config.ROLES.USER
                      ]) && (
                        <MenuItem
                          to={"/face-control/personal-monthly"}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-users"
                            >
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx={9} cy={7} r={4} />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          }
                          title={t("Face Control")}
                          iconClassname={"text-success"}
                        />
                      )}
                      {/* Task */}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_REGION,
                        config.ROLES.MONITORING_ADMIN,
                        config.ROLES.MONITORING_REPUBLIC,
                        config.ROLES.MONITORING_FILIAL,
                        config.ROLES.MONITORING_TREASURY,
                        config.ROLES.MONITORING_OPERATION
                      ]) && (
                        <>
                          <li className="nav-header hidden-folded">
                            <span className="text-muted">{t("Задачи")}</span>
                          </li>
                          <MenuParent
                            icon={
                              <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                data-icon="ordered-list"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M920 760H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-568H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM216 712H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h72.4v20.5h-35.7c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h35.7V838H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4V716c0-2.2-1.8-4-4-4zM100 188h38v120c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V152c0-4.4-3.6-8-8-8h-78c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4zm116 240H100c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h68.4l-70.3 77.7a8.3 8.3 0 00-2.1 5.4V592c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4v-36c0-2.2-1.8-4-4-4h-68.4l70.3-77.7a8.3 8.3 0 002.1-5.4V432c0-2.2-1.8-4-4-4z"></path>
                              </svg>
                            }
                            iconClassname={"text-primary"}
                            title={t("Задачи")}
                          >
                            <MenuItem
                              to={"/monitoring/my-task"}
                              title={t("Мои задачи")}
                            />
                            <MenuItem
                              to={"/monitoring/all-task"}
                              title={t("Все задачи")}
                            />
                            <MenuItem
                              to={"/monitoring/all-credits"}
                              title={t("Кредиты")}
                            />
                            {Utils.userCanStyle(userCan, [
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_TREASURY,
                              config.ROLES.MONITORING_OPERATION,
                              config.ROLES.MONITORING_REGION
                            ]) && (
                              <MenuItem
                                to={"/monitoring/report"}
                                title={t("Reports")}
                              />
                            )}
                          </MenuParent>
                        </>
                      )}

                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <li className="nav-header hidden-folded">
                          <span className="text-muted">
                            {t("Monitoring Process")}
                          </span>
                        </li>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              viewBox="64 64 896 896"
                              focusable="false"
                              data-icon="send"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <defs>
                                <style></style>
                              </defs>
                              <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"></path>
                            </svg>
                          }
                          iconClassname={"text-primary"}
                          title={t("The Monitoring process")}
                        >
                          <MenuItem
                            to={"/workflow/processes"}
                            title={t("Monitoring Processes")}
                          />
                          {/* <MenuItem
                            to={"/workflow/term"}
                            title={t("Monitoring Term")}
                          />
                          <MenuItem
                            to={"/workflow/process-files"}
                            title={t("Monitoring Process files")}
                          />
                          <MenuItem
                            to={"/workflow/process-files-state"}
                            title={t("Monitoring Process files state")}
                          /> */}
                          <MenuItem
                            to={"/workflow/tabs"}
                            title={t("Monitoring Tabs")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <li className="nav-header hidden-folded">
                          <span className="text-muted">{t("Process")}</span>
                        </li>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              viewBox="64 64 896 896"
                              focusable="false"
                              data-icon="send"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <defs>
                                <style></style>
                              </defs>
                              <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"></path>
                            </svg>
                          }
                          iconClassname={"text-primary"}
                          title={t("The working process")}
                        >
                          <MenuItem
                            to={"/workflow/type"}
                            title={t("Processes")}
                          />
                          <MenuItem
                            to={"/workflow/state"}
                            title={t("Condition")}
                          />
                          <MenuItem
                            to={"/workflow/transition"}
                            title={t("Transitions")}
                          />
                          <MenuItem
                            to={"/workflow/has-transition"}
                            title={t("Process transitions")}
                          />
                          <MenuItem
                            to={"/workflow/transition-from-state"}
                            title={t("From state")}
                          />
                          <MenuItem
                            to={"/workflow/transition-to-state"}
                            title={t("In process")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.VACANCY_DEPARTMENT_MANAGER,
                        config.ROLES.VACANCY_FILIAL_MANAGER,
                        config.ROLES.VACANCY_HR_MANAGER
                      ]) && (
                        <li className="nav-header hidden-folded">
                          <span className="text-muted">{t("Bank")}</span>
                        </li>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.VACANCY_DEPARTMENT_MANAGER,
                        config.ROLES.VACANCY_FILIAL_MANAGER,
                        config.ROLES.VACANCY_HR_MANAGER
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-user-plus mx-2"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="8.5" cy="7" r="4"></circle>
                              <line x1="20" y1="8" x2="20" y2="14"></line>
                              <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                          }
                          iconClassname={"text-warning"}
                          title={t("Vacancy")}
                        >
                          <MenuItem
                            to={"/vacancy/list"}
                            title={t("Бўш иш ўринлари")}
                          />
                          <MenuItem
                            to={"/vacancy/candidates"}
                            title={t("Номзодлар")}
                          />
                          <MenuItem
                            to={"/vacancy/statistics"}
                            title={t("Статистика")}
                          />
                          <MenuParent
                            icon={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-settings mx-2"
                              >
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                              </svg>
                            }
                            title={t("Созламалар")}
                          >
                            <MenuItem
                              to={"/vacancy/create/role"}
                              title={t("Create role")}
                            />
                            <MenuItem
                              to={"/vacancy/give/role"}
                              title={t("Give role")}
                            />
                            <MenuItem
                              to={"/vacancy/revert/role"}
                              title={t("Revert role")}
                            />
                          </MenuParent>
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [config.ROLES.CURRENCY]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-dollar-sign mx-2"
                            >
                              <line x1="12" y1="1" x2="12" y2="23"></line>
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                          }
                          title={t("Currency")}
                          iconClassname={"text-success"}
                        >
                          <MenuItem
                            to={"/currency/today"}
                            title={t("Валюта курслари")}
                          />
                          <MenuItem
                            to={"/currency/create"}
                            title={t("Яратиш")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [config.ROLES.COURSE]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-dollar-sign mx-2"
                            >
                              <line x1="12" y1="1" x2="12" y2="23"></line>
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                          }
                          title={t("Currency Juridic")}
                          iconClassname={"text-success"}
                        >
                          <MenuItem
                            to={"/currency-juridic/today"}
                            title={t("Валюта курслари")}
                          />
                          <MenuItem
                            to={"/currency-juridic/create"}
                            title={t("Яратиш")}
                          />
                        </MenuParent>
                      )}
                    </ul>

                    <ul className="nav">
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <li className="nav-header hidden-folded">
                          <span className="text-muted">{t("Credit")}</span>
                        </li>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <MenuItem
                          to={"/deposit-employee/list"}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-award mx-2"
                            >
                              <circle cx="12" cy="8" r="7"></circle>
                              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                          }
                          title={t("Deposit Bonus")}
                          iconClassname={"text-success"}
                        />
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.COLLECTOR_ADMIN
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-bar-chart mx-2"
                            >
                              <line x1="12" y1="20" x2="12" y2="10"></line>
                              <line x1="18" y1="20" x2="18" y2="4"></line>
                              <line x1="6" y1="20" x2="6" y2="16"></line>
                            </svg>
                          }
                          title={"Кредитлар жараёни"}
                          iconClassname={"text-primary"}
                        >
                          <MenuItem to={"/calendar"} title={t("Календар")} />
                          <MenuItem
                            to={"/problem-credits/all"}
                            title={t("Портфел")}
                          />
                          <MenuItem
                            to={"/dashboard"}
                            title={t("Бошқарув панели")}
                          />
                          <MenuItem
                            to={"/view-problem-credit"}
                            title={t("Муаммоли кредитлар")}
                          />
                          <MenuItem
                            to={"/view-problem-credit/users-list/all"}
                            title={t("Муддати ўтган")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.COLLECTOR_ADMIN,
                        config.ROLES.COLLECTOR_FILIAL_MANAGER
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-command mx-2"
                            >
                              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                            </svg>
                          }
                          title={"KPI тизими"}
                          iconClassname={"text-warning"}
                        >
                          <MenuItem
                            to={"/employees-roles"}
                            title={t("Ходимлар рўйхати")}
                          />
                          <MenuItem
                            to={"/employees-attachment/all"}
                            title={t("Кредитларни бириктириш")}
                          />
                          <MenuItem
                            to={"/my-credits"}
                            title={t("Бириктирилган")}
                          />
                          <MenuItem to={"/bonus"} title={t("KPI")} />
                          <MenuItem
                            to={"/my-bonus"}
                            title={t("Менинг бонусларим")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.COLLECTOR_ADMIN,
                        config.ROLES.COLLECTOR_FILIAL_MANAGER
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-layers mx-2"
                            >
                              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                              <polyline points="2 17 12 22 22 17"></polyline>
                              <polyline points="2 12 12 17 22 12"></polyline>
                            </svg>
                          }
                          title={t("Кредитлар мониторинги")}
                          iconClassname={"text-success"}
                        >
                          <MenuItem
                            to={"/monitoring"}
                            title={t("Мониторинг")}
                          />
                          <MenuItem
                            to={"/sixty-ninty"}
                            title={t("60-90 кун")}
                          />
                          <MenuItem
                            to={"/intentional/all"}
                            title={t("Мақсадлилик")}
                          />
                          <MenuParent
                            icon={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-book mx-2"
                              >
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                              </svg>
                            }
                            title={t("Республика")}
                          >
                            <MenuItem
                              to={"/respublic/judges"}
                              title={t("Юристлар")}
                            />
                            <MenuItem
                              to={"/respublic/monitoring"}
                              title={t("Мониторинг")}
                            />
                          </MenuParent>
                          <MenuParent
                            icon={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Layer_1"
                                data-name="Layer 1"
                                viewBox="0 0 512 512"
                                width="16"
                                height="16"
                              >
                                <path d="M256,98.281a20.709,20.709,0,1,0,20.709,20.709A20.732,20.732,0,0,0,256,98.281Zm0,29.418a8.709,8.709,0,1,1,8.709-8.709A8.719,8.719,0,0,1,256,127.7Z"></path>
                                <path d="M503.724,314h-9.858L430.98,163.71A45.244,45.244,0,0,0,463.334,139.8a8.8,8.8,0,0,1,4.116-4A15.92,15.92,0,0,0,454,106.945a40.809,40.809,0,0,0-18.933,18.228,13.434,13.434,0,0,1-11.869,7.435,13.576,13.576,0,0,1-11.868-7.58A40.133,40.133,0,0,0,375.813,103H293.028C289.272,94,282,87.255,274,82.989V40.809A5.925,5.925,0,0,0,267.9,35H244.1a5.925,5.925,0,0,0-6.1,5.809v42.18C230,87.255,222.728,94,218.972,103h-82.71a40.117,40.117,0,0,0-35.489,21.983,13.265,13.265,0,0,1-23.858.11,40.725,40.725,0,0,0-18.9-18.164A15.931,15.931,0,0,0,44.55,135.806a8.77,8.77,0,0,1,4.1,3.981A45.324,45.324,0,0,0,81.025,163.7L18.134,314H8.276A6.2,6.2,0,0,0,2,319.949v6.125c0,47.894,39.106,86.858,87,86.858s87-38.964,87-86.858v-6.125A5.964,5.964,0,0,0,169.991,314h-9.857L97.2,163.6a45.451,45.451,0,0,0,31.832-23.88A8.326,8.326,0,0,1,136.262,135h82.909A40.728,40.728,0,0,0,238,154.991V347h-4.813A6.158,6.158,0,0,0,227,352.994V400H192.231A6.521,6.521,0,0,0,186,406.363V431H161.834A5.572,5.572,0,0,0,156,436.651v34.54A5.7,5.7,0,0,0,161.834,477h187.34A5.694,5.694,0,0,0,355,471.191v-34.54A5.566,5.566,0,0,0,349.174,431H326V406.363A6.521,6.521,0,0,0,319.769,400H285V352.994A6.158,6.158,0,0,0,278.813,347H274V154.991A40.728,40.728,0,0,0,292.829,135h82.984a8.351,8.351,0,0,1,7.24,4.75A45.343,45.343,0,0,0,414.8,163.6L351.866,314h-9.857A5.964,5.964,0,0,0,336,319.949v6.125c0,47.894,39.106,86.858,87,86.858s87-38.964,87-86.858v-6.125A6.2,6.2,0,0,0,503.724,314ZM89.134,400.93A74.977,74.977,0,0,1,19.306,353H158.961A74.975,74.975,0,0,1,89.134,400.93ZM164,326v.074A76.254,76.254,0,0,1,162.493,341H15.775A76.47,76.47,0,0,1,14,326.074V326Zm-16.875-12H31.142L89.134,175.429ZM136.262,123a20.273,20.273,0,0,0-17.879,11.2,33.107,33.107,0,0,1-59.078.05,20.806,20.806,0,0,0-9.807-9.381,3.854,3.854,0,0,1-2.072-3.543A3.8,3.8,0,0,1,49.2,118.08a3.879,3.879,0,0,1,3.768-.246,28.7,28.7,0,0,1,13.292,12.82,25.218,25.218,0,0,0,45.164-.146A28.159,28.159,0,0,1,136.262,115h79.695c-.112,2-.177,2.533-.177,3.781a37.088,37.088,0,0,0,.212,4.219ZM250,47h12V79.207a41.408,41.408,0,0,0-12,0Zm93,396v22H168V443Zm-29-31v19H198V412Zm-41-53v41H239V359Zm-23-12V158.773a41.408,41.408,0,0,0,12,0V347Zm6-199.79a28.22,28.22,0,1,1,28.22-28.22A28.251,28.251,0,0,1,256,147.21Zm137.709-12.978A20.291,20.291,0,0,0,375.813,123H296.008a37.088,37.088,0,0,0,.212-4.219c0-1.248-.065-1.781-.177-3.781h79.77a28.181,28.181,0,0,1,24.856,15.546,25.171,25.171,0,0,0,45.049.109,28.71,28.71,0,0,1,13.321-12.84,3.87,3.87,0,0,1,3.765.255,3.8,3.8,0,0,1,1.77,3.239,3.9,3.9,0,0,1-2.082,3.574,20.862,20.862,0,0,0-9.814,9.412,33,33,0,0,1-58.969-.063Zm29.157,41.2L480.858,314H364.875Zm0,225.5A74.975,74.975,0,0,1,353.039,353H492.694A74.977,74.977,0,0,1,422.866,400.93ZM498,326.074A76.47,76.47,0,0,1,496.225,341H349.507A76.254,76.254,0,0,1,348,326.074V326H498Z"></path>
                              </svg>
                            }
                            title={"Юрист"}
                          >
                            <MenuItem
                              to={"/formed-list"}
                              title={t("Шаклланган рўйхат")}
                            />
                            <MenuItem
                              to={"/judge-process"}
                              title={t("Суд жараёни")}
                            />
                          </MenuParent>
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-shopping-bag mx-2"
                            >
                              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                              <line x1="3" y1="6" x2="21" y2="6"></line>
                              <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                          }
                          title={"Katm"}
                          iconClassname={"text-success"}
                        >
                          <MenuItem
                            to={"/katm/active-requests"}
                            title={t("Active requests")}
                          />
                          <MenuItem
                            to={"/katm/monitoring"}
                            title={t("Monitoring")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.FACE_CONTROL_ADMIN
                      ]) && (
                        <li className="nav-header hidden-folded">
                          <span className="text-muted">{t("Extra")}</span>
                        </li>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.COLLECTOR_ADMIN
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-settings mx-2"
                            >
                              <circle cx="12" cy="12" r="3"></circle>
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                          }
                          title={t("Права доступа")}
                          iconClassname={"text-primary"}
                        >
                          <MenuItem
                            to={"/rbac/auth-item"}
                            title={t("Auth item")}
                          />
                          <MenuItem
                            to={"/rbac/auth-item-child"}
                            title={t("Auth item child")}
                          />
                          <MenuItem
                            to={"/rbac/auth-rule"}
                            title={t("Auth rule")}
                          />
                          <MenuItem
                            to={"/rbac/auth-assignment"}
                            title={t("Auth assignment")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.STREAM_ADMIN
                      ]) && (
                        <MenuItem
                          to={"/upload-video"}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-download-cloud mx-2"
                            >
                              <polyline points="8 17 12 21 16 17"></polyline>
                              <line x1="12" y1="12" x2="12" y2="21"></line>
                              <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
                            </svg>
                          }
                          iconClassname={"text-info"}
                          title={t("Видео юклаш")}
                        />
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.STREAM_TAB_ADMIN
                      ]) && (
                        <MenuItem
                          to={"/daily-history"}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-download-cloud mx-2"
                            >
                              <polyline points="8 17 12 21 16 17"></polyline>
                              <line x1="12" y1="12" x2="12" y2="21"></line>
                              <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
                            </svg>
                          }
                          iconClassname={"text-info"}
                          title={t("Видео юклаш")}
                        />
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.LANGUAGE_ADMIN
                      ]) && (
                        <MenuItem
                          to={"/language"}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-flag mx-2"
                            >
                              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                              <line x1="4" y1="22" x2="4" y2="15"></line>
                            </svg>
                          }
                          title={t("Language")}
                          iconClassname={"text-danger"}
                        />
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.SMS_ADMIN
                      ]) && (
                        <MenuItem
                          to={"/send-sms/main"}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                            >
                              <path d="M13,11H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4-4H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Zm2-5H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z" />
                            </svg>
                          }
                          title={t("Send SMS")}
                          iconClassname={"text-danger"}
                        />
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_FILIAL,
                        config.ROLES.MONITORING_REGION,
                        config.ROLES.MONITORING_REPUBLIC
                      ]) && (
                        <li className="nav-header hidden-folded">
                          <span className="text-muted">{t("Monitoring")}</span>
                        </li>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_FILIAL
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-radio mx-2"
                            >
                              <circle cx="12" cy="12" r="2"></circle>
                              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                            </svg>
                          }
                          title={t("Branch")}
                          iconClassname={"text-warning"}
                        >
                          <MenuItem
                            to={"/credit-monitoring/branch-loans"}
                            title={t("Loans")}
                          />
                          <MenuItem
                            to={"/credit-monitoring/branch/purpose"}
                            title={t("Purpose")}
                          />
                          <MenuItem
                            to={"/credit-monitoring/branch/continuous"}
                            title={t("Continuous")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_REGION
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-radio mx-2"
                            >
                              <circle cx="12" cy="12" r="2"></circle>
                              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                            </svg>
                          }
                          title={t("Region")}
                          iconClassname={"text-warning"}
                        >
                          <MenuItem
                            to={"/credit-monitoring/region-loans"}
                            title={t("Loans")}
                          />
                          <MenuItem
                            to={"/credit-monitoring/region/purpose"}
                            title={t("Purpose")}
                          />
                          <MenuItem
                            to={"/credit-monitoring/region/continuous"}
                            title={t("Continuous")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_ADMIN,
                        config.ROLES.MONITORING_REGION
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-radio mx-2"
                            >
                              <circle cx="12" cy="12" r="2"></circle>
                              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                            </svg>
                          }
                          title={t("Review")}
                          iconClassname={"text-warning"}
                        >
                          <MenuItem
                            to={"/credit-monitoring/branches/republic"}
                            title={t("Monitoring")}
                          />
                          <MenuItem
                            to={"/credit-monitoring/branches/employees"}
                            title={t("Employees")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_ADMIN,
                        config.ROLES.MONITORING_REGION
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-radio mx-2"
                            >
                              <circle cx="12" cy="12" r="2"></circle>
                              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                            </svg>
                          }
                          title={t("Admin")}
                          iconClassname={"text-warning"}
                        >
                          {Utils.userCanStyle(userCan, [
                            config.ROLES.MONITORING_ADMIN,
                            config.ROLES.MONITORING_REGION
                          ]) && (
                            <>
                              <MenuItem
                                to={"/credit-monitoring/documents"}
                                title={t("Documents")}
                              />
                              <MenuItem
                                to={"/credit-monitoring/products"}
                                title={t("Products")}
                              />
                              <MenuItem
                                to={"/credit-monitoring/books"}
                                title={t("Box")}
                              />
                            </>
                          )}
                          {Utils.userCanStyle(userCan, [
                            config.ROLES.MONITORING_PROBLEM_REPUBLIC
                          ]) && (
                            <MenuItem
                              to={"/credit-monitoring/access"}
                              title={t("Доступ")}
                            />
                          )}
                        </MenuParent>
                      )}

                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_PROBLEM_REPUBLIC,
                        config.ROLES.MONITORING_PROBLEM_REGION,
                        config.ROLES.MONITORING_PROBLEM_FILIAL
                      ]) && (
                        <li className="nav-header hidden-folded">
                          <span className="text-muted">{t("Muammoli")}</span>
                        </li>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_PROBLEM_REPUBLIC,
                        config.ROLES.MONITORING_PROBLEM_REGION,
                        config.ROLES.MONITORING_PROBLEM_FILIAL
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-layers mx-2"
                            >
                              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                              <polyline points="2 17 12 22 22 17"></polyline>
                              <polyline points="2 12 12 17 22 12"></polyline>
                            </svg>
                          }
                          title={t("Muammoli kreditlar")}
                          iconClassname={"text-success"}
                        >
                          {Utils.userCanStyle(userCan, [
                            config.ROLES.MONITORING_PROBLEM_REPUBLIC,
                            config.ROLES.MONITORING_PROBLEM_REGION,
                            config.ROLES.MONITORING_PROBLEM_FILIAL
                          ]) && (
                            <MenuItem
                              to={"/credit-monitoring/loan-details"}
                              title={t("Loan Details")}
                            />
                          )}
                          {Utils.userCanStyle(userCan, [
                            config.ROLES.MONITORING_PROBLEM_FILIAL,
                            config.ROLES.MONITORING_PROBLEM_REGION,
                            config.ROLES.MONITORING_PROBLEM_REPUBLIC
                          ]) && (
                            <>
                              <MenuItem
                                to={"/credit-monitoring/expired-loans"}
                                title={t("Npl kreditlar")}
                              />
                              <MenuItem
                                to={"/credit-monitoring/controls-loans"}
                                title={t("Sud jarayoni")}
                              />
                              <MenuItem
                                to={"/credit-monitoring/npl-report"}
                                title={t("Npl")}
                              />
                               <MenuItem
                                   to={"/credit-monitoring/about"}
                                   title={t("About")}
                               />
                              {Utils.userCanStyle(userCan, [
                                config.ROLES.MONITORING_PROBLEM_REPUBLIC
                              ]) && (
                                <MenuItem
                                  to={"/credit-monitoring/npl-progress"}
                                  title={t("Progress")}
                                />
                              )}
                            </>
                          )}
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [
                        config.ROLES.MONITORING_PROBLEM_ADMIN
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-radio mx-2"
                            >
                              <circle cx="12" cy="12" r="2"></circle>
                              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                            </svg>
                          }
                          title={t("Admin")}
                          iconClassname={"text-warning"}
                        >
                          {Utils.userCanStyle(userCan, [
                            config.ROLES.MONITORING_PROBLEM_REPUBLIC
                          ]) && (
                            <MenuItem
                              to={"/credit-monitoring/stages"}
                              title={t("Stages")}
                            />
                          )}
                          {Utils.userCanStyle(userCan, [
                            config.ROLES.MONITORING_PROBLEM_REPUBLIC
                          ]) && (
                            <MenuItem
                              to={"/credit-problem/access"}
                              title={t("Доступ")}
                            />
                          )}
                        </MenuParent>
                      )}

                      {Utils.userCanStyle(userCan, [
                        config.ROLES.BONUS_FILIAL_REGISTRAR
                      ]) && (
                        <MenuParent
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-dollar-sign mx-2"
                            >
                              <line x1={12} y1={1} x2={12} y2={23} />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          }
                          title={t("Bonus")}
                          iconClassname={"text-info"}
                        >
                          {Utils.userCanStyle(userCan, [
                            config.ROLES.BONUS_FILIAL_REGISTRAR
                          ]) && (
                            <>
                              <MenuItem
                                to={"/credit-monitoring/employees"}
                                title={t("Employees")}
                              />
                               <MenuItem
                                   to={"/credit-monitoring/employees/bonus"}
                                   title={t("Employees Bonus")}
                               />
                               <MenuItem
                                   to={"/credit-monitoring/my-bonuses"}
                                   title={t("Mening Bonuslarim")}
                               />
                              <MenuItem
                                to={"/credit-monitoring/loans-attachment"}
                                title={t("Кредитларни бириктириш")}
                              />
                            </>
                          )}
                          <MenuItem
                            to={"/credit-monitoring/my-attachments"}
                            title={t("Менга бириктирилган кредитлар")}
                          />
                        </MenuParent>
                      )}
                      {Utils.userCanStyle(userCan, [config.ROLES.APPEAL]) && (
                        <MenuItem
                          to={"/appeal/view"}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-power mx-2"
                            >
                              <polyline points="8 17 12 21 16 17"></polyline>
                              <line x1="12" y1="12" x2="12" y2="21"></line>
                              <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
                            </svg>
                          }
                          iconClassname={"text-info"}
                          title={t("ТАКЛИФ ВА МУРОЖААТЛАР")}
                        />
                      )}
                    </ul>
                  </div>
                </div>
                <div className="py-2 mt-2 b-t no-shrink">
                  <ul className="nav no-border">
                    <li onClick={goodByeHome}>
                      <a>
                        <span className="nav-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-power"
                          >
                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                            <line x1={12} y1={2} x2={12} y2={12} />
                          </svg>{" "}
                        </span>
                        <span className="nav-text">{t("Выйти")}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
      </WithUser>
    );
  }
}

export default withTranslation("bhm_one")(withRouter(Aside));

import React from "react";
import { withTranslation } from "react-i18next";
import { get, has, isEmpty } from "lodash";
const StepEight = (props) => {
  const { data } = props;
  const requests = get(data, "credit_requests.credit_request");
  const subscriptions = get(data, "subscriptions.subscription");
  console.log(subscriptions, "subscriptions");
  return (
    <div>
      <div className="katm-step-row">
        <div className="katm-step-row__num">8.</div>
        <div className="katm-step-row__name">
          ЗАПРОСЫ И ПОДПИСКИ ПО СУБЪЕКТУ КРЕДИТНОЙ ИНФОРМАЦИИ
        </div>
      </div>

      <div className="katm-step-row katm-bg-orange">
        <div className="katm-step-row__num">8.1</div>
        <div className="katm-step-row__name">ЗАПРОСЫ</div>
      </div>

      <div className="katm-table-row">
        <table
          style={{ textAlign: "center" }}
          className="katm-table"
          border="0"
        >
          <thead>
            <tr>
              <th width="15" className="katm-table-nums">
                №
              </th>
              <th style={{ width: "15%" }} className="katm-text--left">
                ВРЕМЯ ЗАПРОСА
              </th>
              <th className="katm-text--left">ПОЛЬЗОВАТЕЛЬ</th>
              <th className="katm-text--center">КОД КО</th>
              <th className="katm-text--right">№ ЗАЯВКИ</th>
              <th className="katm-text--right">
                № И ДАТА <br />
                СОГЛАСИЯ
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px" }}>
            {requests &&
              requests.map((value, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1}</td>
                    <td> {get(value, "demand_date_time")}</td>
                    <td> {get(value, "org_name")} ({get(value, "branch")})</td>
                    <td className="katm-text--center">
                      {" "}
                      {get(value, "report_type")}
                    </td>
                    <td className="katm-text--right">
                      {get(value, "claim_id")}
                    </td>
                    <td className="katm-text--right">
                      {!get(value, "consent_id")
                        ? ""
                        : get(value, "consent_id")}{" "}
                      {get(value, "consent_date")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="katm-step-row katm-bg-orange">
        <div className="katm-step-row__num">8.2</div>
        <div className="katm-step-row__name">ПОДПИСКИ НА УВЕДОМЛЕНИЯ</div>
      </div>

      <div className="katm-table-row">
        <table className="katm-table" border="0">
          <thead>
            <tr>
              <th width="15" className="katm-table-nums">
                №
              </th>
              <th className="katm-text--left">Период подписки</th>
              <th className="katm-text--left">ПОЛЬЗОВАТЕЛЬ</th>
              <th className="katm-text--right">№ ЗАЯВКИ</th>
              <th className="katm-text--right">
                № И ДАТА <br />
                СОГЛАСИЯ
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions && has(subscriptions, "org") && (
              <tr>
                <td>{get(subscriptions, "user_id")}</td>
                <td>{get(subscriptions, "subscription_period")}</td>
                <td>{get(subscriptions, "org")}</td>
                <td className="katm-text--right">
                  {get(subscriptions, "claim_id")}
                </td>
                <td className="katm-text--right">
                  {get(subscriptions, "consent_id")
                    ? ""
                    : get(subscriptions, "consent_id")}{" "}
                  {get(subscriptions, "consent_date")}
                </td>
              </tr>
            )}
            {subscriptions &&
              !has(subscriptions, "org") &&
              subscriptions.map((value, index) => {
                return (
                  <tr>
                    <td>{get(value, "user_id")}</td>
                    <td> {get(value, "subscription_period")}</td>
                    <td> {get(value, "org")}</td>
                    <td className="katm-text--right">
                      {get(value, "claim_id")}
                    </td>
                    <td className="katm-text--right">
                      {get(value, "consent_id")} {get(value, "consent_date")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isEmpty(get(subscriptions, "org")) && (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>Не имеется</p>
        )}
      </div>
    </div>
  );
};

export default withTranslation("bhm_one")(StepEight);

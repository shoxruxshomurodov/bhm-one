import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { get } from "lodash";

const StepFive = (props) => {
  const { data } = props;

  return (
    <div>
      <div className="katm-step-row">
        <div className="katm-step-row__num">5.</div>
        <div className="katm-step-row__name">ЗАЯВКИ БЕЗ ДОГОВОРОВ</div>
      </div>
      <div className="katm-table-row">
        <table className="katm-table" border="0">
          <thead>
            <tr>
              <th width="15" className="katm-table-nums">
                №
              </th>
              <th className="katm-text--left">Кредитор</th>
              <th style={{width:"10%"}} className="katm-text--right">№ ЗАЯВКИ</th>
              <th style={{ width: "10%" }} className="katm-text--right">
                ДАТА
                <br />
                ЗАЯВКИ
              </th>
              <th className="katm-text--right">ВАЛЮТА</th>
              <th className="katm-text--right">СУММА ЗАЯВКИ</th>
              <th className="katm-text--right">
                КОД ПРИЧИНЫ
                <br />
                ОТКЛОНЕНИЯ
              </th>
              <th style={{ width: "10%" }} className="katm-text--right">
                ДАТА
                <br />
                ОТКЛОНЕНИЯ
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px" }}>
            {get(data, "claims_wo_contracts.claim_wo_contract", []) &&
              get(data, "claims_wo_contracts.claim_wo_contract", []).map(
                (value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{get(value, "org_name")} ({get(value, "branch")})</td>
                      <td className="katm-text--right">
                        {get(value, "claim_id")}
                      </td>
                      <td className="katm-text--right">
                        {get(value, "claim_date")}
                      </td>
                      <td className="katm-text--right">
                        {get(value, "currency")}
                      </td>
                      <td className="katm-text--right">
                        {get(value, "summa")}
                      </td>
                      <td className="katm-text--right">
                        {get(value, "rejection_reason")}
                      </td>
                      <td className="katm-text--right">
                        {get(value, "rejection_date")}
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withTranslation("bhm_one")(StepFive);

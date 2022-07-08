import React from "react";
import { withTranslation } from "react-i18next";
import { get } from "lodash/object";

const ContingentLiability = (props) => {
  const { data, index } = props;
  return (
    <div>
      <div className="katm-step-row katm-bg-orange">
        <div className="katm-step-row__num">7.{index}</div>
        <div className="katm-step-row__name">
          КРЕДИТОР:{" "}
          <span className="katm-color--black">{get(data, "org")}</span>
        </div>
        <div className="katm-step-row__type">
          <b>ТИП:</b>{" "}
          <b className="katm-color--black">{get(data, "subject_type")}</b>
        </div>
      </div>
      <div className="katm-list">
        <ul style={{ paddingLeft: "0px" }} className="katm-list-col">
          <li className="katm-item">
            <div className="katm-item-num">1.</div>
            <div className="katm-item-title">
              Статус договора:<b>{get(data, "contract_status")}</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">2.</div>
            <div className="katm-item-title">
              Номер договора:<b>{get(data, "contract_id")}</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">3.</div>
            <div className="katm-item-title">
              Дата начала договора:<b>{get(data, "contract_date")}</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">4.</div>
            <div className="katm-item-title">
              Дата окончания договора:<b>{get(data, "contract_end_date")}</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">5.</div>
            <div className="katm-item-title">
              Валюта договора:<b>{get(data, "currency")}</b>
            </div>
          </li>
        </ul>
        <ul className="katm-list-col">
          <li className="katm-item">
            <div className="katm-item-num">6.</div>
            <div className="katm-item-title">
              Процентная ставка:<b>{get(data, "percent")}</b>
              <span className="katm-color--grey">
                [{get(data, "percent_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">7.</div>
            <div className="katm-item-title">
              Сумма договора:<b>{get(data, "amount")}</b>
              <span className="katm-color--grey">
                [{get(data, "amount_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">8.</div>
            <div className="katm-item-title">
              Остаток всей задолженности:<b>{get(data, "total_debt_sum")}</b>
              <span className="katm-color--grey">
                [{get(data, "total_debt_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">9.</div>
            <div className="katm-item-title">
              Остаток просроченной задолженности:
              <b>{get(data, "overdue_debt_sum")}</b>
              <span className="katm-color--grey">
                [{get(data, "overdue_debt_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">10.</div>
            <div className="katm-item-title">
              Максимальная текущая просрочка (дни или статус):
              <b>{get(data, "max_current_overdue")}</b>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withTranslation("bhm_one")(ContingentLiability);

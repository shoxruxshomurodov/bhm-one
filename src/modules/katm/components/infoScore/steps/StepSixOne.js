import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Col } from "antd";
import { get, has, isNull, isEmpty } from "lodash";
import SecurityOne from "./SecurityOne";
import NumberFormat from "react-number-format";
const StepSixOne = (props) => {
  const { contract, index } = props;
  const [result, setResult] = useState({});
  const securities = get(contract, "securities.security");
  const actual_payments = get(contract, "actual_repayment");
  const overdue_principals = get(
    contract,
    "overdue_principals.overdue_principal"
  );

  useEffect(() => {
    const info = {};
    get(contract, "forecasted_schedule.forecasted_payment").forEach((item) => {
      let year = !isNull(item.forecasted_payment_period)
        ? item.forecasted_payment_period.substr(0, 4)
        : null;
      let month = !isNull(item.forecasted_payment_period)
        ? item.forecasted_payment_period.substr(-2, 2)
        : null;
      if (!isNull(year) && !isNull(month)) {
        if (!info.hasOwnProperty(year)) {
          info[year] = {};
          for (let index = 1; index <= 12; index++) {
            let monthIndex = index < 10 ? "0" + index : index;
            info[year][monthIndex] = {
              percent_sum: "",
              principal_sum: ""
            };
          }
        }
        info[year][month] = item;
      }
    });
    setResult(info);
  }, []);
  return (
    <div>
      <div className="katm-step-row katm-bg-orange">
        <div className="katm-step-row__num">6.{index}</div>
        <div className="katm-step-row__name">
          КРЕДИТОР:{" "}
          <span className="katm-color--black">
            {get(contract, "org_name")} ({get(contract, "branch")})
          </span>
        </div>
        <div className="katm-step-row__type">
          <b>ТИП: </b>{" "}
          <b className="katm-color--black">{get(contract, "org_type")}</b>
        </div>
      </div>

      <div className="katm-list">
        <ul style={{ paddingLeft: "0px" }} className="katm-list-col">
          <li className="katm-item">
            <div className="katm-item-num">1.</div>
            <div className="katm-item-title">
              Статус договора:<b>{get(contract, "contract_status")}</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">2.</div>
            <div className="katm-item-title">
              Номер договора:<b>{get(contract, "contract_id")}</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">3.</div>
            <div className="katm-item-title">
              Дата начала договора:<b>{get(contract, "contract_date")}</b>
              <span className="katm-color--grey">
                [{get(contract, "contract_date_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">4.</div>
            <div className="katm-item-title">
              Дата окончания договора:
              <b>{get(contract, "contract_end_date")}</b>
              <span className="katm-color--grey">
                [{get(contract, "contract_end_date_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">5.</div>
            <div className="katm-item-title">
              Номер и дата заявки:
              <b>
                {get(contract, "claim_id")}, {get(contract, "claim_date")}
              </b>
              <span className="katm-color--grey">
                [{get(contract, "claim_id_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">6.</div>
            <div className="katm-item-title">
              Вид кредита:<b>{get(contract, "credit_type")}</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">7.</div>
            <div className="katm-item-title">
              Валюта договора:<b>{get(contract, "currency")}</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">8.</div>
            <div className="katm-item-title">
              Процентная ставка:<b>{get(contract, "percent")}</b>
              <span className="katm-color--grey">
                [{get(contract, "percent_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">9.</div>
            <div className="katm-item-title">
              Обеспечение:<b>{get(contract, "security_qty")} шт.</b>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">10.</div>
            <div className="katm-item-title">
              Класс качества активов:
              <b>{get(contract, "class_asset_quality")}</b>
              <span className="katm-color--grey">
                [{get(contract, "class_asset_quality_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">11.</div>
            <div className="katm-item-title">
              Резерв на покрытие возможных убытков:<b> </b>
              <span className="katm-color--grey">[н/д]</span>
            </div>
          </li>
        </ul>
        <ul className="katm-list-col">
          <li className="katm-item">
            <div className="katm-item-num">12.</div>
            <div className="katm-item-title">
              Сумма договора:
              <b>
                <NumberFormat
                  value={get(contract, "amount")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "amount_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">13.</div>
            <div className="katm-item-title">
              Выданная сумма:
              <b>
                <NumberFormat
                  value={get(contract, "amount_issued")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "amount_issued_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">14.</div>
            <div className="katm-item-title">
              Остаток всей задолженности:
              <b>
                <NumberFormat
                  value={get(contract, "total_debt_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "total_debt_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">15.</div>
            <div className="katm-item-title">
              Срочная задолженность ОД:
              <b>
                <NumberFormat
                  value={get(contract, "immediate_principal_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "immediate_principal_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">16.</div>
            <div className="katm-item-title">
              Срочная задолженность %:
              <b>
                <NumberFormat
                  value={get(contract, "immediate_percent_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "immediate_percent_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">17.</div>
            <div className="katm-item-title">
              Просроченная задолженность ОД:
              <b>
                <NumberFormat
                  value={get(contract, "overdue_principal_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "overdue_principal_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">18.</div>
            <div className="katm-item-title">
              Просроченная задолженность %:
              <b>
                <NumberFormat
                  value={get(contract, "overdue_percent_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "overdue_percent_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">19.</div>
            <div className="katm-item-title">
              Пересмотренная задолженность ОД:
              <b>
                <NumberFormat
                  value={get(contract, "overdue_principal_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "overdue_principal_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">20.</div>
            <div className="katm-item-title">
              Судебная задолженность ОД:
              <b>
                <NumberFormat
                  value={get(contract, "lawsuit_principal_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "lawsuit_principal_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">21.</div>
            <div className="katm-item-title">
              Внебалансовая задолженность ОД:
              <b>
                <NumberFormat
                  value={get(contract, "offbalance_princial_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "offbalance_princial_sum_change")}]
              </span>
            </div>
          </li>
          <li className="katm-item">
            <div className="katm-item-num">22.</div>
            <div className="katm-item-title">
              Внебалансовая задолженность %:
              <b>
                <NumberFormat
                  value={get(contract, "offbalance_percent_sum")}
                  displayType={"text"}
                  decimalSeparator={"."}
                  thousandSeparator={" "}
                />
              </b>
              <span className="katm-color--grey">
                [{get(contract, "offbalance_percent_sum_change")}]
              </span>
            </div>
          </li>
        </ul>
      </div>

      {securities && has(securities, "name") ? (
        <SecurityOne security={securities} index={1} />
      ) : (
        ""
      )}
      {securities &&
        !has(securities, "name") &&
        securities.map((value, index) => {
          return (
            <SecurityOne key={index} security={securities} index={index + 1} />
          );
        })}

      <div className="katm-step-line">
        <div className="katm-step-line__title">Прогнозный график платежей</div>
        <div className="katm-step-line__info">
          <div className="katm-step-line__count">
            {get(contract, "forecasted_schedule_change_qty")}
          </div>
          <div className="katm-step-line__date">
            [{get(contract, "forecasted_schedule_change")}]
          </div>
        </div>
      </div>
      <div className="katm-forecast">
        <table className="katm-forecast-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th style={{ color: "#808080; !important" }}>Январь</th>
              <th style={{ color: "#808080; !important" }}>Февраль</th>
              <th style={{ color: "#808080; !important" }}>Март</th>
              <th style={{ color: "#808080; !important" }}>Апрель</th>
              <th style={{ color: "#808080; !important" }}>Май</th>
              <th style={{ color: "#808080; !important" }}>Июнь</th>
              <th style={{ color: "#808080; !important" }}>Июль</th>
              <th style={{ color: "#808080; !important" }}>Август</th>
              <th style={{ color: "#808080; !important" }}>Сентябрь</th>
              <th style={{ color: "#808080; !important" }}>Октябрь</th>
              <th style={{ color: "#808080; !important" }}>Ноябрь</th>
              <th style={{ color: "#808080; !important" }}>Декабрь</th>
            </tr>
          </thead>
          {!isEmpty(result) && (
            <tbody className="katm-bottom">
              {Object.entries(result).map(([key, value]) => {
                return (
                  <tr key={key}>
                    <td
                      width="34"
                      className="katm-color--grey border-none"
                      style={{
                        width: "44px !important"
                      }}
                    >
                      <b>{key}</b>
                    </td>
                    <td
                      className="katm-color--grey border-none"
                      style={{
                        width: "12px !important;",
                        display: "block; margin: 0 4px;"
                      }}
                    >
                      <span>ОД</span>
                      <br />
                      <span>%</span>
                    </td>
                    {Object.entries(value).map(([key, value]) => {
                      return (
                        <td
                          className={
                            !value.hasOwnProperty(
                              "forecasted_payment_period"
                            ) && "empty-td"
                          }
                        >
                          <NumberFormat
                            value={get(value, "principal_sum")}
                            displayType={"text"}
                            decimalSeparator={"."}
                            thousandSeparator={true}
                          />
                          <br />
                          <NumberFormat
                            value={get(value, "percent_sum")}
                            displayType={"text"}
                            decimalSeparator={"."}
                            thousandSeparator={true}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {isEmpty(result) && (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px"
            }}
          >
            Не имеется
          </p>
        )}
      </div>

      <div className="katm-step-line">
        <div className="katm-step-line__title">Фактическое погашение</div>
        <div className="katm-step-line__info">
          <div className="katm-step-line__date">
            [{get(contract, "actual_schedule.actual_schedule_change")}]
          </div>
        </div>
      </div>

      <div className="katm-repayment">
        <Col span={12}>
          <table className="katm-repayment-table">
            <thead>
              <tr>
                <th>
                  <span> ДАТА </span>
                </th>
                <th className="katm-text--right">
                  <span> ПОГАШЕНИЕ ОД </span>
                </th>
                <th className="katm-text--right">
                  <span> ПОГАШЕНИЕ % </span>
                </th>
                <th className="katm-text--right">
                  <span> ОСТАТОК ОД </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {actual_payments &&
                actual_payments.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span>{get(value, "repayment_date")}</span>
                      </td>
                      <td className="katm-text--right">
                        <span> {get(value, "principal_sum")} </span>
                      </td>
                      <td className="katm-text--right">
                        <span> {get(value, "percent_sum")} </span>
                      </td>
                      <td className="katm-text--right">
                        <span> {get(value, "remaining_principal_sum")} </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Col>
        <Col span={12}>
          <table className="katm-repayment-table">
            <thead>
              <tr>
                <th>
                  <span> ДАТА </span>
                </th>
                <th className="katm-text--right">
                  <span> ПОГАШЕНИЕ ОД </span>
                </th>
                <th className="katm-text--right">
                  <span> ПОГАШЕНИЕ % </span>
                </th>
                <th className="katm-text--right">
                  <span> ОСТАТОК ОД </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {actual_payments &&
                actual_payments.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span>{get(value, "repayment_date")}</span>
                      </td>
                      <td className="katm-text--right">
                        <span> {get(value, "principal_sum")} </span>
                      </td>
                      <td className="katm-text--right">
                        <span> {get(value, "percent_sum")} </span>
                      </td>
                      <td className="katm-text--right">
                        <span> {get(value, "remaining_principal_sum")} </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Col>
      </div>
      {isEmpty(actual_payments) && (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Не имеется</p>
      )}
      <div className="katm-step-line">
        <div className="katm-step-line__title">
          Просроченные платежи основного долга
        </div>
      </div>
      <div className="katm-overdue">
        <Col span={24}>
          <table style={{ width: "100%" }} className="katm-overdue-table">
            <thead>
              <tr>
                <th>
                  <span> № </span>
                </th>
                <th>
                  <span> ДАТА ОБРАЗОВАНИЯ </span>
                </th>
                <th className="katm-text--right">
                  <span> ДНИ </span>
                </th>
                <th className="katm-text--right">
                  <span> СУММА </span>
                </th>
                <th className="katm-text--right">
                  <span> ДАТА ОБНОВЛЕНИЯ </span>
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {overdue_principals &&
                overdue_principals.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span>
                          {!isNull(get(value, "overdue_date")) && index + 1}
                        </span>
                      </td>
                      <td className="katm-text--right">
                        <span>{get(value, "overdue_date")}</span>
                      </td>
                      <td className="katm-text--right">
                        <span>{get(value, "overdue_principal_days")}</span>
                      </td>
                      <td className="katm-text--right">
                        <span>
                          <NumberFormat
                            value={get(value, "overdue_principal_sum")}
                            displayType={"text"}
                            decimalSeparator={"."}
                            thousandSeparator={true}
                          />
                        </span>
                      </td>
                      <td className="katm-text--right">
                        <span className="katm-color--grey">
                         {!isNull(get(value, "overdue_principal_change")) && [get(value, "overdue_principal_change")]} 
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Col>
      </div>
    </div>
  );
};

export default withTranslation("bhm_one")(StepSixOne);

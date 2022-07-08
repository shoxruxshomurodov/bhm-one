import React from "react";
import {withTranslation} from "react-i18next";
import {get, isNull} from "lodash";
import NumberFormat from "react-number-format";

const StepFour = (props) => {
    const {data} = props;
    return (
        <div>
            <div className="katm-step-row">
                <div className="katm-step-row__num">4.</div>
                <div className="katm-step-row__name">ДЕЙСТВУЮЩИЕ ДОГОВОРА</div>
            </div>
            <div className="katm-table-row">
                <table
                    className="katm-table"
                    border="0"
                    style={{
                        fontSize: "10px"
                    }}
                >
                    <thead>
                    <tr>
                        <th width="15" className="katm-table-nums">
                            №
                        </th>
                        <th className="katm-text--left">Кредитор</th>
                        <th className="katm-text--right">№ договора</th>
                        <th
                            className="katm-text--right"
                            style={{
                                maxWidth: "46px !important;"
                            }}
                        >
                            Валюта
                        </th>
                        <th className="katm-text--right">Остаток всей ЗАДОЛЖЕННОСТИ</th>
                        <th className="katm-text--right">Просроченная часть</th>
                        <th className="katm-text--right">СРЕДНЕМЕСЯЧНЫЙ ПЛАТЁЖ</th>
                    </tr>
                    </thead>
                    {!isNull(get(data, "open_contracts.open_contract[0].org")) &&
                    <tbody>
                    {get(data, "open_contracts.open_contract", []) &&
                    get(data, "open_contracts.open_contract", []).map(
                        (value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{!isNull(get(value, "org_name")) && index + 1}</td>
                                    {!isNull(get(value, "org_name")) && <td>
                                        {get(value, "org_name")} ({get(value, "branch")})
                                    </td>}

                                    <td className="katm-text--right">
                                        {get(value, "contract_id")}
                                    </td>
                                    <td
                                        className="katm-text--right"
                                        style={{
                                            maxWidth: "46px !important;"
                                        }}
                                    >
                                        {get(value, "currency")}
                                    </td>
                                    <td className="katm-text--right">
                                        <NumberFormat
                                            value={get(value, "total_debt_sum")}
                                            displayType={"text"}
                                            decimalSeparator={"."}
                                            thousandSeparator={" "}
                                        />
                                    </td>
                                    <td className="katm-text--right">
                                        <NumberFormat
                                            value={get(value, "overdue_debt_sum")}
                                            displayType={"text"}
                                            decimalSeparator={"."}
                                            thousandSeparator={" "}
                                        />
                                    </td>
                                    <td className="katm-text--right">
                                        <NumberFormat
                                            value={get(value, "monthly_average_payment")}
                                            displayType={"text"}
                                            decimalSeparator={"."}
                                            thousandSeparator={" "}
                                        />
                                    </td>
                                </tr>
                            );
                        }
                    )}
                    </tbody>
                    }
                </table>
                {isNull(get(data, "open_contracts.open_contract[0].org")) && (
                    <p style={{textAlign: "center", fontWeight: "bold"}}>Не имеется</p>
                )}
            </div>
        </div>
    );
};

export default withTranslation("bhm_one")(StepFour);

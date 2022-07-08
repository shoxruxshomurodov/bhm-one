import React from "react";
import {withTranslation} from "react-i18next";
import {get} from "lodash";
import NumberFormat from 'react-number-format';


const StepThree = (props) => {
    const {data} = props;
        return (
            <div>
                <div className="katm-step-row">
                    <div className="katm-step-row__num">3.</div>
                    <div className="katm-step-row__name">ОБЩИЙ ОБЗОР <span className="katm-color--grey">(ОТКРЫТЫЕ + ЗАКРЫТЫЕ)</span>
                    </div>
                </div>

                <div className="katm-claims">
                    <div className="katm-claims-col">
                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num"> {get(data,'overview.claims_qty')} </b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">заявки</div>
                        </div>

                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num">   {get(data,'overview.contracts_qty')}</b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">договора</div>
                        </div>

                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num"> {get(data,'overview.contingent_liabilities_qty')} </b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">условные обязательства</div>
                        </div>

                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num"> {get(data,'overview.subscriptions_qty')} </b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">
                                запросы и подписки по субъекту КИ
                            </div>
                        </div>

                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num"><NumberFormat value={get(data,'overview.average_monthly_payment')} displayType={'text'}  decimalSeparator={"."} thousandSeparator={true} /></b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">
                                среднемесячный платёж (сумма)
                            </div>
                        </div>
                    </div>
                    <div className="katm-claims-col">
                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num"><NumberFormat value={get(data,'overview.average_monthly_payment')} displayType={'text'} decimalSeparator={"."} thousandSeparator={true} /></b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">
                                количество просрочек основного долга (ОД)
                            </div>
                        </div>

                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num">  {get(data,'overview.max_overdue_principal_days')} </b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">
                                максимальная просрочка ОД (дни)
                            </div>
                        </div>

                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num"> <NumberFormat value={get(data,'overview.max_overdue_principal_sum')} displayType={'text'} decimalSeparator={"."} thousandSeparator={true} /></b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">
                                максимальная просрочка ОД (сумма)
                            </div>
                        </div>

                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num"> {get(data,'overview.max_unmixeder_overdue_percent_days')} </b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">
                                максимальная непрерывная просрочка % (дни)
                            </div>
                        </div>

                        <div className="katm-claims-item">
                            <b className="katm-claims-item__num"> <NumberFormat value={get(data,'overview.total_overdue_percent_sum')} displayType={'text'} decimalSeparator={"."} thousandSeparator={true} /></b>
                            <span className="katm-claims-item__line">-</span>
                            <div className="katm-claims-item__title">
                                всего просроченных % (сумма)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default withTranslation('bhm_one')((StepThree));
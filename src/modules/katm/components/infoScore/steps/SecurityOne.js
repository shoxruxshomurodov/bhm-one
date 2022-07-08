import React from "react";
import {withTranslation} from "react-i18next";
import {get, has} from "lodash";


const SecurityOne = (props) => {
    const {security,index} = props;
    return (
        <div>
            <div className="katm-step-line">
                <div className="katm-step-line__title">«Обеспечение» - {index}</div>
                <div className="katm-step-line__info">
                    <div className="katm-step-line__date">[{get(security,'security_change')}]</div>
                </div>
            </div>
            <div className="katm-list">
                <ul className="katm-list-col">
                    <li className="katm-item">
                        <div className="katm-item-num">1.</div>
                        <div className="katm-item-title">Код типа субъекта обеспечения:<b> {get(security,'security_type')}</b> </div>
                    </li>
                    <li className="katm-item">
                        <div className="katm-item-num">2.</div>
                        <div className="katm-item-title">Код типа обеспечения кредита:<b> {get(security,'subject_type')}</b> </div>
                    </li>
                    <li className="katm-item">
                        <div className="katm-item-num">3.</div>
                        <div className="katm-item-title">Наименование или ФИО:<b> {get(security,'name')} </b></div>
                    </li>
                    <li className="katm-item">
                        <div className="katm-item-num">4.</div>
                        <div className="katm-item-title">Залогодателя/созаёмщика :<b> {get(security,'juridical_status')}</b></div>
                    </li>
                    <li className="katm-item">
                        <div className="katm-item-num">5.</div>
                        {has(security,'pinfl') && <div className="katm-item-title">ПИНФЛ :<b> {get(security,'pinfl')} </b></div> }
                        {has(security,'inn') && <div className="katm-item-title">ИНН :<b> {get(security,'inn')}</b></div> }
                    </li>
                </ul>

                <ul className="katm-list-col">
                    <li className="katm-item">
                        <div className="katm-item-num">6.</div>
                        <div className="katm-item-title">Сумма оценочной стоимости обеспечения:<b> {get(security,'amount')}</b> </div>
                    </li>
                    <li className="katm-item">
                        <div className="katm-item-num">7.</div>
                        <div className="katm-item-title">Код валюты договора обеспечения:<b> {get(security,'currency')} </b></div>
                    </li>
                    <li className="katm-item">
                        <div className="katm-item-num">8.</div>
                        <div className="katm-item-title">Номер договора обеспечения:<b> {get(security,'contract_id')}</b></div>
                    </li>
                    <li className="katm-item">
                        <div className="katm-item-num">9.</div>
                        <div className="katm-item-title">Дата договора обеспечения :<b> {get(security,'contract_date')}</b></div>
                    </li>
                    <li className="katm-item">
                        <div className="katm-item-num">10.</div>
                        <div className="katm-item-title">Дата документа согласия субъекта обеспечения :<b> {get(security,'consent_date')}</b></div>
                    </li>
                </ul>
            </div>
        </div>

    );
}


export default withTranslation('bhm_one')((SecurityOne));
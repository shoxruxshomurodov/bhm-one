import React from "react";
import scoring_profile from "../web/profile.png";
import { withTranslation } from "react-i18next";
import { get } from "lodash";
import { has } from "lodash/object";
const StepOne = (props) => {
  const { data } = props;

  return (
    <div>
      <div className="katm-step-row">
        <div className="katm-step-row__num">1.</div>
        <div className="katm-step-row__name">СУБЪЕКТ КРЕДИТНОЙ ИНФОРМАЦИИ</div>
      </div>
      <div className="katm-subject-info">
        <div className="katm-subject-info__photo">
          <img
            className="katm-photo"
            src={scoring_profile}
            alt="photo"
          />
        </div>

        <ul className="katm-subject-info__keys">
          <li>
            <span> Наименование (ГЦП): </span>
          </li>
          <li>
            <span> ПИНФЛ (ГЦП): </span>
          </li>
          <li>
            <span> Дата рождения (ГЦП): </span>
          </li>
          <li>
            <span> Пол (ГЦП): </span>
          </li>
          <li>
            <span> Юридический статус (КО): </span>
          </li>
          <li>
            <span> Адрес по прописке (КО): </span>
          </li>
          <li>
            <span> Адрес проживания (КО): </span>
          </li>
          <li>
            <span> Номер тлефона (КО): </span>
          </li>
          <li>
            <span> Электронная почта (ЛК): </span>
          </li>
        </ul>

        <ul className="katm-subject-info__values">
          <li>
            <b>{get(data, "client.name")}</b>
          </li>
          <li>
            <b> {get(data, "client.pinfl")} </b>
          </li>
          <li>
            <b>{get(data, "client.birth_date")}</b>
          </li>
          <li>
            <b>{get(data, "client.gender")}</b>
          </li>
          <li>
            <b>Физическое лицо</b>
          </li>
          <li>
            <b>{get(data, "client.registration_address")}</b>
          </li>
          <li>
            <b>{get(data, "client.live_address")}</b>{" "}
            <span className="katm-color--grey">
              [{get(data, "client.live_address_change")}]
            </span>
          </li>

          {get(data, "client.phones", []) &&
            get(data, "client.phones", []).map((item, index) => {
              if (has(item, "phone")) {
                return (
                  <li key={index}>
                    <b> {get(item, "phone.phone_number")} </b>{" "}
                    <span className="katm-color--grey">
                      {" "}
                      [{get(item, "phone.phone_number_change")}]
                    </span>
                  </li>
                );
              }
              return "";
            })}
          <li>
            <b> {get(data, "client.email")} </b>{" "}
            <span className="katm-color--grey">
              {" "}
              [{get(data, "client.email_change")}]
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withTranslation("bhm_one")(StepOne);

import React, {useState} from "react";
import styled from "styled-components";
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import classNames from "classnames";
import {get, isEmpty} from "lodash";
import logo from "../../../assets/images/logo_xb.png";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const StyledPdfEditForm = styled.form`
  .doc {
    padding-top: 30px;
    font-family: "Montserrat", sans-serif;

    &_input {
      width: 80px !important;
      max-width: unset !important;
    }

    &__logo {
      width: 250px;
    }

    &__right {
      text-align: center;
      font-weight: 600;
      font-size: 20px;
    }

    &__left {
      font-size: 20px;
      font-weight: 600;

      input {
        font-size: 20px;
        font-weight: 600;

        &.doc_to {
          width: 40px;
        }
      }
    }

    &__title {
      font-size: 28px;
      text-align: center;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #252525;
      margin-top: 30px;
    }

    &__text {
      text-align: center;
      font-size: 16px;
    }

    .input-mask {
      border: none;
      max-width: 70px;
      font-weight: 600;
      background-color: transparent;

      &.dynamic {
        max-width: unset;
        font-size: 16px;

        &.error {
          color: red;
          border: 1px solid red;

          &::placeholder {
            color: red;
          }
        }
      }

      &.error {
        color: red;
      }

      &.doc_from {
        width: 30px;
      }

      &.doc_year {
        width: 30px;
      }

      &.doc_day {
        width: 75px;
      }

      &.doc_hour {
        width: 65px;
      }
    }
  }

  .doc__datepicker {
    font-size: 13px !important;
    border-radius: 4px;
    box-shadow: inset 0 2px 2px #e9e9e9 !important;
    border: 1px solid #aeaeae !important;
    line-height: 16px !important;
    padding: 6px 10px 5px !important;
  }

  .doc_table_title {
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .doc_table_flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

,
table {
  width: 100%;

  thead {
    background-color: #14e0ac;

    th {
      padding: 10px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
    }
  }

  tbody {
    background-color: #14e0ac;

    tr {
      border-top: 1px solid #fff;

      td {
        padding: 10px;
        color: #fff;
        font-weight: 600;
        font-size: 18px;

        &:not(&:first-child) {
          text-align: center;
          background-color: #f5f5f6;
          color: #252525;
        }
      }
    }
  }
}
`;

const PdfCreateForm = ({
                           exchangePointsList = [],
                           onlineConversionList = [],
                           atmRatesList = [],
                           createPdf = () => {
                           },
                           ...props
                       }) => {
    const {
        handleSubmit,
        formState: {errors},
        control
    } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const onSubmit = (data) => {
        let {day, year, number, curr} = data;
        let atm_rates = [];
        atm_rates = curr.map((item, i) => ({code: `${i}`, ...item}));
        atm_rates = atm_rates.filter((item) => !isEmpty(item));
        const params = {
            order_date: `20${year}-${day.slice(3, 6)}-${day.slice(0, 2)}`,
            order_number: number,
            atm_rates,
            current_date: moment(startDate).format("YYYY-MM-DD hh:mm:ss")
        };
       createPdf(params);
    };
    return (
        <StyledPdfEditForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center">
                <div className="col-10 doc">
                    <div className="row">
                        <div className="col-8">
                            <img src={logo} alt="logo" className={"doc__logo"}/>
                        </div>
                        <div className="col-4">
                            <h2 className="doc__right">
                                AT {`<<XALQ BANKI>>`} <br/>
                                20
                                <Controller
                                    as={InputMask}
                                    control={control}
                                    name={"year"}
                                    rules={{required: true, pattern: /^[0-9]*$/}}
                                    render={({field}) => (
                                        <InputMask
                                            {...field}
                                            className={classNames("doc_year input-mask", {
                                                error: errors["year"]
                                            })}
                                            mask="99"
                                            alwaysShowMask={true}
                                        />
                                    )}
                                />{" "}
                                YIL{" "}
                                <Controller
                                    as={InputMask}
                                    control={control}
                                    name={"day"}
                                    rules={{required: true, pattern: /^[0-9/]*$/}}
                                    render={({field}) => (
                                        <InputMask
                                            {...field}
                                            className={classNames("doc_day input-mask", {
                                                error: errors["day"]
                                            })}
                                            mask="99/99"
                                            alwaysShowMask={true}
                                        />
                                    )}
                                />
                                - DAGI <br/>{" "}
                                <Controller
                                    as={InputMask}
                                    control={control}
                                    name={"number"}
                                    rules={{required: true}}
                                    render={({field}) => (
                                        <InputMask
                                            {...field}
                                            className={classNames("doc_input input-mask", {
                                                error: errors["number"]
                                            })}
                                            placeholder={"________"}
                                            alwaysShowMask={true}
                                            maskChar={null}
                                        />
                                    )}
                                />{" "}
                                - SONLI <br/>
                                XIZMAT FARMOYISHIGA ILOVA
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2 className={"doc__title"}>
                                {" "}
                                VALYUTA KURSLARI <br/> PASPORTI
                            </h2>
                            <p className={"doc__text"}>
                                (Jismoniy shaxslarning chet el valyutasini sotib olish va sotish
                                kurslari to'g'risida)
                            </p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className={"row"}>
                                <div className={"col-8"}>
                                    <h2 className="doc_table_title">
                                        Valyuta ayriboshlash shoxobchalari orqali
                                    </h2>
                                </div>
                                <div className={"col-4 text-right"}>
                                    <DatePicker
                                        className="doc__datepicker"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        showTimeSelect
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </div>
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th>VALYUTA NOMI</th>
                                    <th>
                                        SOTIB OLISH <br/> UZS
                                    </th>
                                    <th>
                                        SOTISH <br/> UZS
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {exchangePointsList &&
                                exchangePointsList.map(
                                    ({code, sale, buy, option}, id) => (
                                        <tr key={id}>
                                            <td>
                                                <img
                                                    style={{width: '40px'}}
                                                    src={get(option, "img_src", "")}
                                                    alt="currency"
                                                    className={"mr-2"}
                                                />
                                                {get(option, "name", "")}
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={buy}
                                                />
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={sale}
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 mt-5">
                            <h2 className="doc_table_title">"XALQ MOBILE" ilovasi orqali</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>VALYUTA NOMI</th>
                                    <th>
                                        SOTIB OLISH <br/> UZS
                                    </th>
                                    <th>
                                        SOTISH <br/> UZS
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {onlineConversionList &&
                                onlineConversionList.map(
                                    ({code, sale, buy, option}, id) => (
                                        <tr key={id}>
                                            <td>
                                                <img
                                                    style={{width: '40px'}}
                                                    src={get(option, "img_src", "")}
                                                    alt="currency"
                                                    className={"mr-2"}
                                                />
                                                {get(option, "name", "")}
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={buy}
                                                />
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={sale}
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 mt-5">
                            <h2 className="doc_table_title">
                                Avtomatlashtirilgan vashlar (bankomatlar) orqali
                            </h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>VALYUTA NOMI</th>
                                    <th>
                                        SOTIB OLISH <br/> UZS
                                    </th>
                                    <th>
                                        SOTISH <br/> UZS
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {atmRatesList &&
                                atmRatesList.map(({code, option}) => (
                                    <tr key={code}>
                                        <td>
                                            <img
                                                style={{width: '40px'}}
                                                src={get(option, "img_src", "")}
                                                alt="currency"
                                                className={"mr-2"}
                                            />
                                            {get(option, "name", "")}
                                        </td>
                                        <td>
                                            <Controller
                                                as={NumberFormat}
                                                control={control}
                                                name={`curr[${code}].buy`}
                                                rules={{required: true}}
                                                render={({field: {onChange, value}}) => (
                                                    <NumberFormat
                                                        thousandSeparator={" "}
                                                        value={value}
                                                        decimalSeparator="."
                                                        onValueChange={(v) => onChange(v.value)}
                                                        className={classNames("form-control input-mask dynamic", {
                                                            error: get(errors, `curr[${code}].buy`)
                                                        })}
                                                    />
                                                )}
                                            />
                                        </td>
                                        <td>
                                            <Controller
                                                as={NumberFormat}
                                                control={control}
                                                name={`curr[${code}].sale`}
                                                rules={{required: true}}
                                                render={({field: {onChange, value}}) => (
                                                    <NumberFormat
                                                        value={value}
                                                        onValueChange={(v) => onChange(v.value)}
                                                        decimalSeparator="."
                                                        thousandSeparator={" "}
                                                        className={classNames("form-control input-mask dynamic", {
                                                            error: get(errors, `curr[${code}].sale`)
                                                        })}
                                                    />
                                                )}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-10 mt-4">
                    <button
                        className="btn-md btn btn-raised btn-wave gd-info btn-block text-md  text-white"
                        onClick={createPdf}
                    >
                        Saqlash
                    </button>
                </div>
            </div>
        </StyledPdfEditForm>
    );
};

export default PdfCreateForm;

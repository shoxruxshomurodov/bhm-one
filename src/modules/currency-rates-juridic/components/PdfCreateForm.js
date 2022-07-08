import React from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import classNames from "classnames";
import { get, isEmpty } from "lodash";
import logo from "../../../assets/images/logo_xb.png";
import NumberFormat from "react-number-format";

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

    
    input {
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
    }
  }

  .doc_table_title {
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
  }

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
  createPdf = () => {},
  ...props
}) => {
  console.log(exchangePointsList,"exchangePointsList")
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm();
  const onSubmit = (data) => {
    let { day, year,number } = data;
    const params = {
      order_date: `20${year}-${day.slice(3, 6)}-${day.slice(0, 2)}`,
      order_number: number,
    };
    createPdf(params);
  };
  return (
    <StyledPdfEditForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="row justify-content-center">
        <div className="col-10 doc">
          <div className="row">
            <div className="col-8">
              <img src={logo} alt="logo" className={"doc__logo"} />
            </div>
            <div className="col-4">
              <h2 className="doc__right">
                AT {`<<XALQ BANKI>>`} <br />
                20
                <Controller
                  as={InputMask}
                  control={control}
                  name={"year"}
                  rules={{ required: true, pattern: /^[0-9]*$/ }}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      className={classNames("doc_year", {
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
                  rules={{ required: true, pattern: /^[0-9/]*$/ }}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      className={classNames("doc_day", {
                        error: errors["day"]
                      })}
                      mask="99/99"
                      alwaysShowMask={true}
                    />
                  )}
                />
                - DAGI <br />{" "}
                <Controller
                  as={InputMask}
                  control={control}
                  name={"number"}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      className={classNames("doc_input", {
                        error: errors["number"]
                      })}
                      placeholder={"________"}
                      alwaysShowMask={true}
                      maskChar={null}
                    />
                  )}
                />{" "}
                - SONLI <br />
                XIZMAT FARMOYISHIGA ILOVA
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2 className={"doc__title"}>
                {" "}
                XO'JALIK SUBYEKTLARI UCHUN <br /> VALYUTA KURSLARI
              </h2>
              <p className={"doc__text"}>
                (xo'jalik subyektlarining chet el valyutasini sotib olish va sotish
                kurslari)
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <h2 className="doc_table_title">
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>VALYUTA NOMI</th>
                    <th>
                      SOTISH <br /> UZS
                    </th>
                    <th>
                      SOTIB OLISH <br /> UZS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exchangePointsList &&
                    exchangePointsList.map(
                      ({ code, sale, buy, option }, id) => {
                        return (
                            <tr key={id}>
                              <td>
                                <img
                                    style={{width:'40px'}}
                                    src={get(option,"img_src")}
                                    alt="currency"
                                    className={"mr-2"}
                                />
                                {get(option,"name")}
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
                      }
                    )}
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

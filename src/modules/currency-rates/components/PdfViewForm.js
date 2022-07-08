import React from 'react';
import styled from "styled-components";
import moment from "moment";
import {get, isEqual} from "lodash";
import logo from "../../../assets/images/logo_xb.png";
import NumberFormat from "react-number-format";
import Utils from "../../../services/helpers/Utils";
import QRCode from "qrcode.react";
import DatePicker from "react-datepicker";


const StyledPdfEditForm = styled.div`
  width: 1200px;
  margin: 0 auto;

  .doc {
    padding-top: 30px;
    font-family: 'Montserrat', sans-serif;

    &_italic {
      margin-top: 20px;
      font-style: italic;
      font-size: 16px;
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
      padding-left: 15px;

      input {
        font-size: 20px;
        font-weight: 600;;

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

  table {
    width: 100%;

    thead {
      background-color: #14E0AC;


      th {
        padding: 10px;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        color: #fff;
      }
    }
    tbody {
      background-color: #14E0AC;
      tr {
        border-top: 1px solid #fff;
        td {
          padding: 10px;
          color: #fff;
          font-weight: 600;
          font-size: 18px;
          &:not(&:first-child) {
            text-align: center;
            background-color: #F5F5F6;
            color: #252525;
          }
        }
      }
    }
  }
  .sign-text {
    color: rgba(255, 0, 0, .4392156862745098);
    font-size: 18px;
  }
`;

const PdfViewForm = ({
                         exchangePointsList = [],
                         onlineConversionList = [],
                         atmRatesList = [],
                         id = '',
                         order_date = '',
                         order_number = '',
                         qrcode,
                         status = 0,
                         created_at,
                         current_date,
                         employee = {},
                         sign = () => {
                         },
                         ...props
                     }) => {
    console.log(new Date(current_date),"current_date")
    return (
        <StyledPdfEditForm {...props} >
            <div className="row justify-content-center">
                <div className="col-12 doc">
                    <div className="row">
                        <div className="col-8">
                            <img src={logo} alt="logo" className={'doc__logo'}/>
                            <h2 className="doc__left">
                                {moment(created_at).format("DD/MM/YYYY HH:MM")}
                            </h2>
                        </div>
                        <div className="col-4">
                            <h2 className="doc__right">
                                AT {`<<XALQ BANKI>>`} <br/>
                                {order_date.slice(0, 4)}
                                YIL {Utils.removeDayStart(order_date.slice(8, 10))} - {Utils.getMonthName(order_date.slice(5, 7))}DAGI <br/> {order_number} -
                                SONLI <br/>
                                XIZMAT FARMOYISHIGA ILOVA
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2 className={'doc__title'}> VALYUTA KURSLARI <br/> PASPORTI</h2>
                            <p className={'doc__text'}>(Jismoniy shaxslarning chet el valyutasini sotib olish va sotish
                                kurslari to'g'risida)</p>
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
                                        selected={current_date ? new Date(current_date) : new Date()}
                                        showTimeSelect
                                        disabled={true}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </div>
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th>VALYUTA NOMI</th>
                                    <th>SOTIB OLISH <br/> UZS</th>
                                    <th>SOTISH <br/> UZS</th>
                                </tr>
                                </thead>
                                <tbody>
                                {exchangePointsList && exchangePointsList.map(({code, sale, buy, option}, id) => <tr
                                    key={id}>
                                    <td><img style={{width: '40px'}} src={get(option, 'img_src', '')} alt="currency"
                                             className={'mr-2'}/>{get(option, 'name', '')}</td>
                                    <td><NumberFormat displayType={'text'} thousandSeparator={' '} value={buy}/></td>
                                    <td><NumberFormat displayType={'text'} thousandSeparator={' '} value={sale}/></td>
                                </tr>)

                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 mt-5">
                            <h2 className="doc_table_title">
                                "XALQ MOBILE" ilovasi orqali
                            </h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>VALYUTA NOMI</th>
                                    <th>SOTIB OLISH <br/> UZS</th>
                                    <th>SOTISH <br/> UZS</th>
                                </tr>
                                </thead>
                                <tbody>
                                {onlineConversionList && onlineConversionList.map(({code, sale, buy, option}, id) => <tr
                                    key={id}>
                                    <td><img style={{width: '40px'}} src={get(option, 'img_src', '')} alt="currency"
                                             className={'mr-2'}/>{get(option, 'name', '')}</td>
                                    <td><NumberFormat displayType={'text'} thousandSeparator={' '} value={buy}/></td>
                                    <td><NumberFormat displayType={'text'} thousandSeparator={' '} value={sale}/></td>
                                </tr>)

                                }
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
                                    <th>SOTIB OLISH <br/> UZS</th>
                                    <th>SOTISH <br/> UZS</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    atmRatesList && atmRatesList.map(({id, option, buy, sale}) => <tr
                                        key={id}>
                                        <td><img style={{width: '40px'}} src={get(option, 'img_src', '')} alt="currency"
                                                 className={'mr-2'}/>{get(option, 'name', '')}</td>
                                        <td><NumberFormat displayType={'text'} thousandSeparator={' '} value={buy}/>
                                        </td>
                                        <td><NumberFormat displayType={'text'} thousandSeparator={' '} value={sale}/>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-9">
                            <p className="doc_italic">
                                Bank Boshqaruvining 2021 yil 30.09 sanadagi 7-sonli qaroriga asosan <br/> Valyuta
                                kurslari passporti ishlab chiqilgan
                            </p>
                            {isEqual(status, 1) &&
                            <div className={'d-flex align-items-center'}><span
                                className={'sign-text mr-3'}>Подписано:</span>
                                <span>{`${get(employee, 'post_name')}: ${get(employee, 'full_name')}`}</span></div>
                            }
                            {isEqual(status, 0) &&
                            <button type={'button'} className="btn w-sm  btn-info" onClick={sign}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                     viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-edit-2 mx-2">
                                    <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"/>
                                </svg>
                                Подпись
                            </button>
                            }
                        </div>
                        <div className="col-3">
                            <div className="col-md-12 mt-3 text-right">
                                {isEqual(status, 1) && <QRCode value={get(qrcode, 'file_url', '')}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledPdfEditForm>
    );
};

export default PdfViewForm;

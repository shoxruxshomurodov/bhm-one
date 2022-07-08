import React from 'react';
import styled from "styled-components";
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import classNames from "classnames";
import {get} from "lodash";
import logo from "../../../assets/images/logo_xb.png";
import NumberFormat from "react-number-format";



const StyledPdfEditForm = styled.form`
  .doc {
    padding-top: 30px;
    font-family: 'Montserrat', sans-serif;

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

    input {
      border: none;
      max-width: 70px;
      font-weight: 600;
      background-color: transparent;

      &.error {
        color: red;
      }
      &.doc_from{
        width: 30px;
      }
       &.doc_year {
        width: 30px;
      }
      &.doc_day{
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
`;

const PdfEditForm = ({
                         exchangePointsList = [], onlineConversionList = [], downloadPdf = () => {
    }, ...props
                     }) => {
    const {register, handleSubmit, watch, formState: {errors}, control, reset} = useForm();
    console.log(errors);
    const onSubmit = data => console.log(data);
    return (
        <StyledPdfEditForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center">
                <div className="col-10 doc">
                    <div className="row">
                        <div className="col-8">
                            <img src={logo} alt="logo" className={'doc__logo'}/>
                            <h2 className="doc__left">
                                <Controller
                                    as={InputMask}
                                    control={control}
                                    name={'from'}
                                    rules={{required: true, pattern: /^[0-9]*$/}}
                                    render={({field}) => <InputMask    {...field}
                                                                       className={classNames('doc_from', {error: errors['from']})}
                                                                       mask="99" alwaysShowMask={true}/>}
                                />
                                20

                                <Controller
                                    as={InputMask}
                                    control={control}
                                    name={'to'}
                                    rules={{required: true, pattern: /^[0-9/]*$/}}
                                    render={({field}) => <InputMask    {...field}
                                                                       className={classNames('doc_to', {error: errors['to']})}
                                                                       mask="9/9" alwaysShowMask={true}/>}
                                />
                            </h2>
                        </div>
                        <div className="col-4">
                            <h2 className="doc__right">
                                AT {`<<XALQ BANKI>>`} <br/>
                                20<Controller
                                as={InputMask}
                                control={control}
                                name={'year'}
                                rules={{required: true, pattern: /^[0-9]*$/}}
                                render={({field}) => <InputMask    {...field}
                                                                   className={classNames('doc_year', {error: errors['year']})}
                                                                   mask="99" alwaysShowMask={true}/>}
                            /> YIL <Controller
                                as={InputMask}
                                control={control}
                                name={'day'}
                                rules={{required: true, pattern: /^[0-9/]*$/}}
                                render={({field}) => <InputMask    {...field}
                                                                   className={classNames('doc_day', {error: errors['day']})}
                                                                   mask="99/99" alwaysShowMask={true}/>}
                            />- DAGI <br/> <Controller
                                as={InputMask}
                                control={control}
                                name={'number'}
                                rules={{required: true, pattern: /^[0-9]*$/}}
                                render={({field}) => <InputMask    {...field}
                                                                   className={classNames('doc_input', {error: errors['number']})}
                                                                   mask="999999" alwaysShowMask={true}/>}
                            /> - SONLI <br/>
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
                            <h2 className="doc_table_title">
                                Valyuta ayriboshlash shoxobchalari orqali
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
                                {exchangePointsList && exchangePointsList.map(({code, sale, buy, option}, id) => <tr
                                    key={id}>
                                    <td><img src={get(option, 'img_src', '')} alt="currency"
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
                                    <td>{get(option, 'name', '')}</td>
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

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <p className="doc_italic">

                            </p>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </div>
                <div className="col-2 text-right">
                    <button className="btn btn-lg btn-raised btn-wave btn-icon btn-rounded mt-2 teal text-white"
                            onClick={downloadPdf}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-download mx-2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1={12} y1={15} x2={12} y2={3}/>
                        </svg>
                    </button>
                </div>
            </div>
        </StyledPdfEditForm>
    );
};

export default PdfEditForm;

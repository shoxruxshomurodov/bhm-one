import React,{useState} from 'react';
import {Field, Form, Formik} from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from "yup";
import {isEmpty,get,isEqual} from "lodash";


const ApplyForm = ({submitForm, vacancy_id, study_type_list = [],application_type_list = [],getMvdData,genders={},mvd,...props}) =>{
    const [seria,setSeria] = useState({inps:'',passport:''})
    const AppealSchema = Yup.object().shape({
        phone: Yup.string().required("Required"),
        type: Yup.string().required("Required"),
        study_type: Yup.string().required("Required"),
    });

    const getData = (passport,inps) => {
        setSeria({passport:passport.toUpperCase().split(/\s/).join(''),inps});
        getMvdData(passport,inps);
    }

        return (
            <div>
                <Formik
                    initialValues={{
                        vacancy_id: vacancy_id,
                        full_name: get(mvd,'full_name'),
                        sex:get(mvd,'sex'),
                        birth_date:get(mvd,'birth_date'),
                        phone: '',
                        inps: '',
                        passport:'',
                        type: '',
                        study_type: ''
                    }}

                    validationSchema={AppealSchema}

                    onSubmit={(values, {setFieldError,setSubmitting}) => {
                        submitForm({...values,...seria}, {setFieldError,setSubmitting});
                    }}

                    enableReinitialize

                >
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        <Form className="m-t  mode-dark" onSubmit={handleSubmit}>
                            <div className="row align-items-center">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="m-1">Паспорт серия</label>
                                        <InputMask
                                            type="text"
                                            name="passport"
                                            className=
                                                "form-control text-center mode-dark text-uppercase"
                                            placeholder={"Паспорт серия"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            values={values.passport}
                                            style={{fontSize: "1.1rem"}}
                                            mask="aa 9999999"
                                        />
                                        <div className="text-danger text-center my-2">
                                            {errors.passport && touched.passport ? (
                                                errors.passport
                                            ) : null}

                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="m-1">ПИНФЛ</label>
                                        <InputMask
                                            type="text"
                                            name="inps"
                                            className=
                                                "form-control text-center mode-dark "
                                            placeholder={"ПИНФЛ"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            values={values.inps}
                                            style={{fontSize: "1.1rem"}}
                                            mask="99999999999999"
                                        />
                                        <div className="text-danger text-center my-2">
                                            {errors.inps && touched.inps ? (
                                                errors.inps
                                            ) : null}

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <button
                                        className={"btn btn-md btn-raised btn-wave btn-icon btn-rounded mb-2 teal text-white"}
                                        style={{marginTop: '20px'}} onClick={() => getData(values.passport,values.inps)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search mx-2"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                                    </button>
                                </div>
                            </div>
                            {!isEmpty(mvd) && <>
                                <div className={"row"}>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="m-1">Полное имя</label>
                                            <Field type="text" name="full_name" value={values.full_name} disabled  className="form-control text-center  mode-dark"/>
                                            <div className="text-danger text-center my-2">
                                                {errors.full_name && touched.full_name ? (
                                                    errors.full_name
                                                ) : null}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="m-1">Туғилган сана</label>
                                            <Field type="text" name="birth_date" disabled value={values.birth_date} className="form-control text-center  mode-dark"/>
                                            <div className="text-danger text-center my-2">
                                                {errors.birth_date && touched.birth_date ? (
                                                    errors.birth_date
                                                ) : null}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="m-1">Жинси</label>
                                            <Field type="text" name="sex" disabled value={values.sex == '2' ? 'Аёл' : 'Эркак'} className="form-control text-center  mode-dark"/>
                                            <div className="text-danger text-center my-2">
                                                {errors.sex && touched.sex ? (
                                                    errors.sex
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="m-1">Номер телефона</label>
                                            <InputMask
                                                type="text"
                                                name="phone"
                                                className=
                                                    "form-control text-center  mode-dark "
                                                placeholder={"Номер телефона"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                values={values.phone}
                                                style={{fontSize: "1.1rem"}}
                                                mask="(99)999-99-99"
                                            />
                                            <div className="text-danger text-center my-2">
                                                {errors.phone && touched.phone ? (
                                                    errors.phone
                                                ) : null}

                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="m-1">Тип (Прием,Ротация)</label>
                                            <Field as="select" name="type" className=
                                                "form-control text-center  mode-dark " style={{fontSize: "1.1rem"}} >
                                                <option selected >Выберите тип</option>
                                                {
                                                    application_type_list && application_type_list.map(({id, type}) => <option
                                                        value={id} key={id}>{type}</option>)
                                                }
                                            </Field>
                                            <div className="text-danger text-center my-2">
                                                {errors.type && touched.type ? (
                                                    errors.type
                                                ) : null}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="m-1">Образование</label>
                                            <Field as="select" name="study_type" className=
                                                "form-control text-center  mode-dark " style={{fontSize: "1.1rem"}} defaultValue={'DEFAULT'}>
                                                <option selected>Выберите тип образование</option>
                                                {
                                                    study_type_list && study_type_list.map(({id, type}) => <option
                                                        value={id} key={id}>{type}</option>)
                                                }
                                            </Field>
                                            <div className="text-danger text-center my-2">
                                                {errors.study_type && touched.study_type ? (
                                                    errors.study_type
                                                ) : null}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4 ">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2">
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-block btn-md"
                                            style={{marginLeft: '5px', fontSize: "1.1rem"}}
                                        >
                                            Отправить
                                        </button>
                                    </div>
                                </div>
                            </>}
                        </Form>
                    )}
                </Formik>
            </div>
        );
}

export default ApplyForm;

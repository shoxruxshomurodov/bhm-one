import React, {useState} from 'react';
import {Drawer} from "antd";
import {withTranslation} from "react-i18next";
import {Formik} from 'formik';
import * as Yup from 'yup';
const problemScheme = Yup.object().shape({
    files: Yup.mixed()
        .required('File is required'),
    comment: Yup.string()
        .required('Comment is required'),
    agency_name: Yup.string()
        .required('Agency name is required'),
    doc_number: Yup.string()
        .required('Doc number is required'),
    doc_date: Yup.string()
        .required('Doc date is required'),
    main_sum: Yup.number()
        .required('Main sum is required'),
    penalty_sum: Yup.number()
        .required('Penalty sum is required'),
    percent_sum: Yup.number()
        .required('Percent sum is required'),
});
function StartProblemCheckpoint(props) {
    const {visible, onClose, t, start} = props;
    const [file, setFile] = useState(null);
    return (
        <Drawer
            title={t("Confirmation window")}
            placement={"left"}
            closable={false}
            onClose={onClose}
            visible={visible}
            key={"right"}
            style={{zIndex: 99999}}
            width={"50%"}
        >
            <Formik
                initialValues={{files: '', comment: '',agency_name:'',doc_number:'',doc_date:'',main_sum:'',penalty_sum:'',percent_sum:''}}
                // validate={values => {
                //     const errors = {};
                //     if (isEmpty(values.comment)) {
                //         errors.comment = t('Comment is Required');
                //     }
                //     if (isEmpty(values.files)) {
                //         errors.files = t('File is Required');
                //     }
                //     if (isEmpty(values.agency_name)) {
                //         errors.agency_name = t('Agency name is Required');
                //     }
                //     if (isEmpty(values.doc_number)) {
                //         errors.doc_number = t('Doc number is Required');
                //     }
                //     if (isEmpty(values.doc_date)) {
                //         errors.doc_date = t('Doc date is Required');
                //     }
                //     if (isEmpty(values.main_sum)) {
                //         errors.main_sum = t('Main sum is Required');
                //     }
                //     if (isEmpty(values.penalty_sum)) {
                //         errors.penalty_sum = t('Penalty sum is Required');
                //     }
                //     if (isEmpty(values.percent_sum)) {
                //         errors.percent_sum = t('Percent sum is Required');
                //     }
                //     return errors;
                // }}
                validationSchema={problemScheme}
                onSubmit={({files,comment,agency_name,doc_number,doc_date,main_sum,penalty_sum,percent_sum}, {setSubmitting}) => {
                    start(file,comment,agency_name,doc_number,doc_date,main_sum,penalty_sum,percent_sum);
                    setSubmitting(false);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">{t("File")}</label>
                            <div className="col-sm-9">
                                <input
                                    type="file"
                                    name={"files"}
                                    accept="application/pdf"
                                    onChange={(event) => {
                                        const { files } = event.currentTarget;
                                        handleChange(event);
                                        setFile(files[0])
                                    }}
                                    onBlur={handleBlur}
                                    value={values.files}
                                    multiple={false}
                                    className="form-control"
                                />
                                <small className={"text-danger"}>{errors.files && touched.files && errors.files}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">{t("Agency name")}</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    name={"agency_name"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.agency_name}
                                    className="form-control"
                                />
                                <small className={"text-danger"}>{errors.agency_name && touched.agency_name && errors.agency_name}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">{t("Document Number")}</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    name={"doc_number"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.doc_number}
                                    className="form-control"
                                />
                                <small className={"text-danger"}>{errors.doc_number && touched.doc_number && errors.doc_number}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">{t("Document Date")}</label>
                            <div className="col-sm-9">
                                <input
                                    type="date"
                                    name={"doc_date"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.doc_date}
                                    className="form-control"
                                />
                                <small className={"text-danger"}>{errors.doc_date && touched.doc_date && errors.doc_date}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">{t("Main Sum")}</label>
                            <div className="col-sm-9">
                                <input
                                    type="number"
                                    name={"main_sum"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.main_sum}
                                    className="form-control"
                                />
                                <small className={"text-danger"}>{errors.main_sum && touched.main_sum && errors.main_sum}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">{t("Penalty Sum")}</label>
                            <div className="col-sm-9">
                                <input
                                    type="number"
                                    name={"penalty_sum"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.penalty_sum}
                                    className="form-control"
                                />
                                <small className={"text-danger"}>{errors.penalty_sum && touched.penalty_sum && errors.penalty_sum}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">{t("Percent Sum")}</label>
                            <div className="col-sm-9">
                                <input
                                    type="number"
                                    name={"percent_sum"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.percent_sum}
                                    className="form-control"
                                />
                                <small className={"text-danger"}>{errors.percent_sum && touched.percent_sum && errors.percent_sum}</small>
                            </div>
                        </div>
                        <div className="form-group row"><label
                            className="col-sm-3 col-form-label">{t("Description")}</label>
                            <div className="col-sm-9">
                                <textarea id="event-desc" name={"comment"}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.comment}
                                          className="form-control"
                                          rows={3}
                                />
                                <small
                                    className={"text-danger"}>{errors.comment && touched.comment && errors.comment}</small>
                            </div>
                        </div>
                        <div className={"d-flex justify-content-end"}>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">{t("Submit")}</button>
                            <button type="button" onClick={onClose} className="btn btn-white">{t("Cancel")}</button>
                        </div>
                    </form>
                )}
            </Formik>
        </Drawer>
    );
}

export default withTranslation('bhm_one')(StartProblemCheckpoint);
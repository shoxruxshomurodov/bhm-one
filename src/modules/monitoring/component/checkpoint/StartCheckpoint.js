import React, {useState} from 'react';
import {Drawer} from "antd";
import {withTranslation} from "react-i18next";
import {Formik} from 'formik';
import {isEmpty} from "lodash";
function StartCheckpoint(props) {
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
                initialValues={{files: '', comment: '',}}
                validate={values => {
                    const errors = {};
                    if (isEmpty(values.comment)) {
                        errors.comment = t('Comment is Required');
                    }
                    if (isEmpty(values.files)) {
                        errors.files = t('File is Required');
                    }
                    return errors;
                }}
                onSubmit={({files,comment}, {setSubmitting}) => {
                    start(file,comment);
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

export default withTranslation('bhm_one')(StartCheckpoint);
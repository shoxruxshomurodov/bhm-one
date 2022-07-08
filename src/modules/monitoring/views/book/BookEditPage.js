import React from 'react';
import {Drawer} from 'antd';
import {Formik} from 'formik'
import {get, isEmpty} from "lodash";
import Loader from "../../../../components/Loader";
import classNames from "classnames"

function BookEditPage(props) {
    const {
        visible, onClose = () => {
        },
        create = (param1) => {
        },
        title,
        typeFilter = () => {
        },
        initialValues,
        isFetchedShelf
    } = props;
    return (
        <Drawer
            title={title}
            placement={"right"}
            closable={false}
            onClose={onClose}
            visible={visible}
            key={"right"}
            style={{zIndex: 99999}}
            width={"1000"}
        >
            <div className={"mx-3"}>
                <Formik
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        if (isEmpty(values.count)) {
                            errors.count = "введите количество полок";
                        }
                        if (isEmpty(values.type)) {
                            errors.type = "введите тип полок";
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        create({
                                                    ...values,
                                                    rows: get(initialValues, "rows"),
                                                    cols: get(initialValues, "cols"),
                                                    volume: get(initialValues, "volume")
                                                })
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
                          setFieldValue
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row"><label className="col-sm-4 col-form-label">Сколько полки вам
                                нужно :</label>
                                <div className="col-sm-8"><input type="text" name="count"
                                                                 onChange={handleChange}
                                                                 onBlur={handleBlur}
                                                                 value={values.count}
                                                                 className={classNames("form-control", {
                                                                     "is-invalid": errors.count && touched.count
                                                                 })}
                                />
                                    <small
                                        className={"form-text text-muted"}>{errors.count && touched.count && errors.count}</small>
                                </div>
                            </div>
                            <div className="form-group row"><label className="col-sm-4 col-form-label">Тип :</label>
                                <div className="col-sm-8"><select name={"type"}
                                                                  className={classNames("form-control form-control-sm", {
                                                                      "is-invalid": errors.type && touched.type
                                                                  })}
                                                                  onChange={e => {
                                                                      setFieldValue("type", get(e, "target.value"));
                                                                      typeFilter(get(e, "target.value"))
                                                                  }}
                                >
                                    <option value={""}>Выбрать</option>
                                    <option value={0}>JURIDIC</option>
                                    <option value={1}>PERSONAL</option>

                                </select>
                                    <small
                                        className={"form-text text-muted"}>{errors.type && touched.type && errors.type}</small>
                                </div>
                            </div>
                            {isFetchedShelf ?
                                <>
                                    <div className="form-group row"><label className="col-sm-4 col-form-label">Количество
                                        рядов
                                        полки: </label>
                                        <div className="col-sm-8"><input type="text" name="rows"
                                                                         onChange={handleChange}
                                                                         onBlur={handleBlur}
                                                                         readOnly={true}
                                                                         value={initialValues.rows}
                                                                         className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-sm-4 col-form-label">Количество
                                        столбцов полки :</label>
                                        <div className="col-sm-8"><input type="text" name="cols"
                                                                         onChange={handleChange}
                                                                         onBlur={handleBlur}
                                                                         readOnly={true}
                                                                         value={initialValues.cols}
                                                                         className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-sm-4 col-form-label">Объем
                                        полки
                                        :</label>
                                        <div className="col-sm-8"><input type="text" name="volume"
                                                                         onChange={handleChange}
                                                                         onBlur={handleBlur}
                                                                         readOnly={true}
                                                                         value={initialValues.volume}
                                                                         className="form-control"/></div>
                                    </div>
                                </>
                                : <Loader/>}
                            <div className={"drawer-footer"}>
                                <button className={"btn w-sm btn-white mr-1"} type={"button"} onClick={onClose}>Орқага
                                </button>
                                <button className={"btn w-sm btn-primary"} disabled={isSubmitting}
                                        type="submit">Тасдиқлаш
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </Drawer>
    );
}

export default BookEditPage;
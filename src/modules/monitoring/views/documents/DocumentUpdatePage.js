import React, {useEffect, useState} from 'react';
import PageHeader from "../../../../components/PageHeader";
import Document from "../../../../schema/Document";
import DocumentScheme from "../../../../schema/Document";
import ApiActions from "../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import DynamicFormField from "../../component/DynamicFormField/update";
import {get, isEqual, isEmpty, isNil} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {notification, Popover} from "antd";
import {withTranslation} from "react-i18next";

function DocumentUpdatePage(props) {
    const {t} = props;
    const [isFetched, setIsFetched] = useState(false);
    const [customChildren, setCustomChildren] = useState([]);
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch();
    const entities = useSelector(state => get(state, 'normalize.entities', {}));
    let document = useSelector(state => get(state, 'normalize.data.monitoring-document-one.result', {}));
    let isFetchedData = useSelector(state => get(state, 'normalize.data.monitoring-document-one.isFetched', false));
    document = Normalizer.Denormalize(document, DocumentScheme, entities);
    const {id} = useParams();
    const [status, setStatus] = useState(null)
    const getMonitoringDocument = () => {
        const storeName = 'monitoring-document-one';
        const entityName = 'document';
        const scheme = {Document};
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `monitoring/document/${id}`,
                config: {
                    params: {
                        "filter[parent_id]": 0,
                        "filter[is_deleted]": 0,
                        include: "children",
                    }
                },
                scheme,
                storeName,
                entityName,
            },
        });
    }
    useEffect(() => {
        getMonitoringDocument();
    }, [])
    useEffect(() => {
        setCustomChildren(get(document, "children"));
    }, [document]);
    const deleted = () => {
        setIsFetched(true);
        setVisible(false);
        const url = "monitoring/document"
        const scheme = DocumentScheme;
        const storeName = "document-delete"
        const entityName = "document";
        const config = {};
        dispatch({
            type: ApiActions.OPERATION_DELETE.REQUEST,
            payload: {
                url: `${url}/${id}`,
                config,
                formMethods: {setIsFetched},
                scheme,
                storeName,
                entityName,
                cb: {
                    success: () => {
                        notification['success']({
                            message: t('Успешно'),
                            description: t('Удалено'),
                            placement: 'topRight',
                        });
                        setIsFetched(false)
                        setTimeout(() => {
                            window.history.back()
                        }, 500)
                    },
                    fail: (e) => {
                        setIsFetched(false)
                        notification['error']({
                            message: t(get(e, "response.data[0].message")),
                            description: t('Ошибка'),
                            placement: 'topRight',
                        });
                    }
                }
            }
        });
    }
    const update = (attributes) => {
        let {title} = attributes;
        setIsFetched(true);
        const url = "monitoring/document"
        const scheme = DocumentScheme;
        const storeName = "document-update"
        const entityName = "document"
        if (!isEmpty(customChildren) && get(customChildren, "[0]").hasOwnProperty("is_deleted")) {
            delete get(customChildren, "[0]").status
            delete get(customChildren, "[0]").parent_id
            return (
                dispatch({
                    type: ApiActions.OPERATION_UPDATE.REQUEST,
                    payload: {
                        attributes: {
                            title,
                            children: customChildren,
                            status: isNil(status) ? get(document, "status") : status
                        },
                        url: `${url}/${id}`,
                        formMethods: {setIsFetched},
                        scheme,
                        storeName,
                        entityName,
                        cb: {
                            success: () => {
                                notification['success']({
                                    message: t('Успешно'),
                                    description: t('Обновлено'),
                                    placement: 'topRight',
                                });
                                setIsFetched(false);
                                window.history.back()
                            },
                            fail: (e) => {
                                notification['error']({
                                    message: t(get(e, "response.data[0].message")),
                                    description: t('Ошибка'),
                                    placement: 'topRight',
                                });
                                setIsFetched(false)
                            }
                        }
                    }
                })
            )
        } else {
            return (
                dispatch({
                    type: ApiActions.OPERATION_UPDATE.REQUEST,
                    payload: {
                        attributes: {
                            title,
                            children: customChildren,
                            status: isNil(status) ? get(document, "status") : status
                        },
                        url: `${url}/${id}`,
                        formMethods: {setIsFetched},
                        scheme,
                        storeName,
                        entityName,
                        cb: {
                            success: () => {
                                notification['success']({
                                    message: t('Успешно'),
                                    description: t('Обновлено'),
                                    placement: 'topRight',
                                });
                                setIsFetched(false);
                                window.history.back()
                            },
                            fail: (e) => {
                                notification['error']({
                                    message: t(get(e, "response.data[0].message")),
                                    description: t('Ошибка'),
                                    placement: 'topRight',
                                });
                                setIsFetched(false)
                            }
                        }
                    }
                })
            )
        }

    }
    const identifyFormFieldValue = (id, title, state) => {
        if (get(state, "is_modified")) {
            customChildren.map(customChild => {
                if (isEqual(id, get(customChild, "id"))) {
                    customChild.title = title;
                    delete customChild.status
                    delete customChild.parent_id
                }
            })
        }
        if (get(state, "is_new") && !get(state, "is_deleted")) {
            customChildren.push({
                id,
                title,
                is_deleted: get(state, "is_deleted"),
                is_new: get(state, "is_new")
            })
        }
        if (get(state, "is_deleted")) {
            if (!get(state, "is_new")) {
                customChildren.map(customChild => {
                    if (isEqual(id, get(customChild, "id"))) {
                        customChild.is_deleted = get(state, "is_deleted");
                        delete customChild.status
                        delete customChild.parent_id
                    }
                })
                setCustomChildren(prevState => [...prevState]);
            } else {
                setCustomChildren(customChildren.filter(customChild => !isEqual(get(customChild, "id"), id)));
            }
        }
    }
    const handleVisibleChange = visible => {
        setVisible(visible);
    };
    if (!isFetchedData) {
        return <Loader/>
    }
    if (isFetched) {
        return <Loader/>
    }
    return (
        <div>
            <PageHeader name={t("Monitoring")} desc={t("Monitoring update")}/>
            <div className={"page-content page-container"}>
                <div className={"card"}>
                    <div className="card-header">
                        <div className="d-flex">
                            <div>
                                <h1>{t("Update")} : <span className="text-blue">{get(document, "title")}</span></h1>
                            </div>
                            <span className="flex"></span>
                            <Popover
                                content={<>
                                    <a onClick={deleted} className="btn btn-sm btn-link text-danger">{t("Delete")}</a>
                                    <a onClick={() => setVisible(false)}
                                       className="btn btn-sm btn-link text-info">{t("Close")}</a>
                                </>}
                                title={t("Вы хотите удалить ?")}
                                trigger="click"
                                visible={visible}
                                onVisibleChange={handleVisibleChange}
                            >
                                <div><a className="btn btn-sm btn-link text-danger">{t("Delete")}</a></div>
                            </Popover>
                        </div>
                    </div>
                    <div className={"card-body"}>
                        <div className={""}>
                            <div className="form-group row"><label
                                className="col-sm-3 col-form-label text-right">{t("Step")}</label>
                                <div className="col-sm-9"><select defaultValue={get(document, "status")}
                                                                  onChange={e => setStatus(get(e, "target.value"))}
                                                                  className="form-control">
                                    <option value={0}>{t("Дастлабки талаб қилинадиган хужжатлар")}</option>
                                    <option value={1}>{t("Кредит чиқариш учун зарур хужжатлар")}</option>
                                </select></div>
                            </div>
                            <DynamicFormField request={update} isUpdated={true}
                                              initialValues={{
                                                  title: get(document, "title"),
                                                  children: get(document, "children")
                                              } || []}
                                              cancelLink={"/credit-monitoring/documents"}
                                              identifyFormFieldValue={identifyFormFieldValue}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation("bhm_one")(DocumentUpdatePage);

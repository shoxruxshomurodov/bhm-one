import React, {useEffect, useState} from 'react';
import ProductScheme from "../../../../schema/Product";
import ApiActions from "../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";
import {get, isEmpty, isNil, isEqual} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {notification} from 'antd';
import RequirementEditDrawer from "./RequirementEditDrawer";
import RequirementScheme from "../../../../schema/Requirement";
import Modal from "../../../../components/Modal/Modal";
import RequirementGeneralForm from "../../container/requirement/RequirementGeneralForm";
import {withTranslation} from "react-i18next";

function RequirementsViewPage(props) {
    const {t} = props;
    const [isFetched, setIsFetched] = useState(false);
    const [initialVisible, setInitialVisible] = useState(false);
    const [secondaryVisible, setSecondaryVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState(false);
    const {id} = useParams();
    const entities = useSelector(state => get(state, 'normalize.entities', {}));
    let product = useSelector(state => get(state, 'normalize.data.monitoring-product-one.result', {}));
    let isFetchedData = useSelector(state => get(state, 'normalize.data.monitoring-product-one.isFetched', false));
    product = Normalizer.Denormalize(product, ProductScheme, entities);
    const dispatch = useDispatch();
    const getMonitoringProduct = () => {
        const storeName = 'monitoring-product-one';
        const entityName = 'product';
        const scheme = {ProductScheme};
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `monitoring/products/${id}`,
                config: {
                    params: {
                        include: "initialRequirements.document,initialRequirements.children.document,\n" +
                            "secondaryRequirements.document,secondaryRequirements.children.document",
                    }
                },
                scheme,
                storeName,
                entityName,
            },
        });
    }
    useEffect(() => {
        getMonitoringProduct();
    }, [])
    const showModal = () => {
        setModalVisible(true)
    };
    const onCloseModal = () => {
        setModalVisible(false)
    };
    const create = (argument) => {
        const documents = argument?.map(arg => {
            return {
                parent_id: get(arg, "id"),
                children: get(arg, "children")?.map(child => get(child, "id"))
            }
        })
        setIsFetched(true)
        const url = "/monitoring/requirements";
        const storeName = "requirement-create";
        const entityName = "requirement";
        const scheme = RequirementScheme;
        dispatch({
            type: ApiActions.OPERATION_ADD.REQUEST,
            payload: {
                attributes: {product_id: id, documents, status},
                url,
                formMethods: () => {
                },
                scheme,
                storeName,
                entityName,
                cb: {
                    success: () => {
                        notification['success']({
                            message: t('Успешно'),
                            description: t('Создано'),
                            placement: 'topRight',
                        });
                        setIsFetched(false)
                        setInitialVisible(false)
                        setSecondaryVisible(false)
                        getMonitoringProduct()
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
        });
    }
    const remove = (docID) => {
        setIsFetched(true)
        const url = `/monitoring/requirements/${docID}`;
        const storeName = "requirement-remove";
        const entityName = "requirement";
        const scheme = RequirementScheme;
        dispatch({
            type: ApiActions.OPERATION_DELETE.REQUEST,
            payload: {
                url,
                formMethods: () => {
                },
                scheme,
                storeName,
                entityName,
                cb: {
                    success: (nData, data) => {
                        notification['success']({
                            message: t('Успешно'),
                            description: t('Удалено'),
                            placement: 'topRight',
                        });
                        setIsFetched(false);
                        getMonitoringProduct()
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
        });
    }
    const addGeneralRequirement = (attributes) => {
        setIsFetched(true)
        const url = `/monitoring/products/${id}`;
        const storeName = "requirement-create";
        const entityName = "requirement";
        const scheme = RequirementScheme;
        dispatch({
            type: ApiActions.OPERATION_UPDATE.REQUEST,
            payload: {
                attributes,
                url,
                formMethods: () => {
                },
                scheme,
                storeName,
                entityName,
                cb: {
                    success: (nData, data) => {
                        notification['success']({
                            message: t('Успешно'),
                            description: t('Обновлено'),
                            placement: 'topRight',
                        });
                        setIsFetched(false)
                        onCloseModal();
                        getMonitoringProduct()
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
        });
    }
    if (!isFetchedData) {
        return <Loader/>
    }
    if (isFetched) {
        return <Loader/>
    }
    return (
        <>
            <div className="d-flex flex" id="content-body">
                <div className="d-flex flex-column flex">
                    <div className="p-3">
                        <div className="toolbar"><Link to={"/credit-monitoring/products"}
                                                       className="btn btn-sm btn-white"
                                                       data-pjax-state>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                 className="feather feather-arrow-left">
                                <line x1={19} y1={12} x2={5} y2={12}/>
                                <polyline points="12 19 5 12 12 5"/>
                            </svg>
                        </Link>
                        </div>
                    </div>
                    <div className="scroll-y mx-3 mb-3 card">
                        <div className="p-4 d-sm-flex no-shrink b-b">
                            <div>
                            <span className="avatar gd-info"
                                  style={{width: "80px", height: "80px", fontSize: "30px"}}>
                                {get(product, "name")?.charAt(0)}
                            </span>
                            </div>
                            <div className="px-sm-4 my-3 my-sm-0 flex"><h2
                                className="text-md">{get(product, "name")}</h2>
                                <small
                                    className="d-block text-fade">{get(product, "group_name")}</small>
                                <div className="my-3"><a
                                    data-pjax-state><strong>{isNil(get(product, "continuous_days")) ? t("Не указан") : get(product, "continuous_days")}</strong>
                                    <span
                                        className="text-muted ml-2">{t("Непрерывные дни")}</span> </a><a
                                    className="mx-2"
                                    data-pjax-state><strong>{isNil(get(product, "purposive_days")) ? t("Не указан") : get(product, "purposive_days")}</strong>
                                    <span className="text-muted ml-2">{t("Целеустремленные дни")}</span> </a></div>
                            </div>
                            <div><a onClick={showModal} className="btn btn-icon btn-rounded" data-pjax-state="">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-settings mx-2">
                                    <circle cx={12} cy={12} r={3}/>
                                    <path
                                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                </svg>
                            </a></div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-md-12 b-r">
                                <div className="p-4 row">
                                    <div className={"col-md-6"}>
                                        <div className={"d-flex justify-content-between align-items-center"}>
                                            <h6>{t("Дастлабки талаб қилинадиган хужжатлар")}</h6>
                                            <div><a onClick={() => {
                                                setInitialVisible(true)
                                                setStatus(0)
                                            }} className="btn btn-icon btn-rounded" data-pjax-state>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                     viewBox="0 0 24 24"
                                                     fill="none" stroke="currentColor" strokeWidth={2}
                                                     strokeLinecap="round"
                                                     strokeLinejoin="round" className="feather feather-edit-2">
                                                    <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"/>
                                                </svg>
                                            </a></div>
                                        </div>
                                        <div className="list list-row my-2 bg-dark r">
                                            {!isEmpty(get(product, "initialRequirements")) ? get(product, "initialRequirements")?.map(initialReq => {
                                                    return (
                                                        <div className="list-item" data-id={16}>
                                                            <div><label
                                                                className="ui-check m-0 ui-check-rounded ui-check-md"><input
                                                                type="checkbox" checked={true} name="id" defaultValue={16}/>
                                                                <i/></label></div>
                                                            <div className="flex"><a
                                                                className="item-title text-color h-1x"
                                                                data-pjax-state>{get(initialReq, "document.title")}</a>
                                                                {get(initialReq, "children") && get(initialReq, "children")?.map(child => {
                                                                    return (
                                                                        <div
                                                                            className="item-except text-muted text-sm h-1x">{get(child, "document.title")}</div>
                                                                    )
                                                                })}

                                                            </div>
                                                            <div>
                                                                <div className="item-action dropdown"><a
                                                                    data-toggle="dropdown"
                                                                    className="text-muted"
                                                                    data-pjax-state>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16}
                                                                         height={16} viewBox="0 0 24 24" fill="none"
                                                                         stroke="currentColor" strokeWidth={2}
                                                                         strokeLinecap="round" strokeLinejoin="round"
                                                                         className="feather feather-more-vertical">
                                                                        <circle cx={12} cy={12} r={1}/>
                                                                        <circle cx={12} cy={5} r={1}/>
                                                                        <circle cx={12} cy={19} r={1}/>
                                                                    </svg>
                                                                </a>
                                                                    <div
                                                                        className="dropdown-menu dropdown-menu-right bg-black"
                                                                        role="menu"><a className="dropdown-item"
                                                                                       data-pjax-state>{t("See detail")}</a><a
                                                                        className="dropdown-item download"
                                                                        data-pjax-state>{t("Download")}</a><a
                                                                        className="dropdown-item edit"
                                                                        data-pjax-state>{t("Edit")}</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a onClick={() => remove(get(initialReq, "id"))}
                                                                           className="dropdown-item trash"
                                                                           data-pjax-state>{t("Delete item")}</a></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }) :
                                                <div className="no-result">
                                                    <div className="p-4 text-center">{t("No Results")}</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className={"col-md-6"}>
                                        <div className={"d-flex justify-content-between align-items-center"}>
                                            <h6>{t("Кредит чиқариш учун зарур хужжатлар")}</h6>
                                            <div><a onClick={() => {
                                                setSecondaryVisible(true);
                                                setStatus(1)
                                            }} className="btn btn-icon btn-rounded" data-pjax-state>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                     viewBox="0 0 24 24"
                                                     fill="none" stroke="currentColor" strokeWidth={2}
                                                     strokeLinecap="round"
                                                     strokeLinejoin="round" className="feather feather-edit-2">
                                                    <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"/>
                                                </svg>
                                            </a></div>
                                        </div>
                                        <div className="list list-row box-shadow my-2 bg-dark r">
                                            {!isEmpty(get(product, "secondaryRequirements")) ? get(product, "secondaryRequirements")?.map(secondaryReq => {
                                                    return (
                                                        <div className="list-item" data-id={16}>
                                                            <div><label
                                                                className="ui-check m-0 ui-check-rounded ui-check-md"><input
                                                                type="checkbox" checked={true} name="id" defaultValue={16}/>
                                                                <i/></label></div>
                                                            <div className="flex"><a
                                                                className="item-title text-color h-1x"
                                                                data-pjax-state>{get(secondaryReq, "document.title")}</a>
                                                                {get(secondaryReq, "children") && get(secondaryReq, "children")?.map(child => {
                                                                    return (
                                                                        <div
                                                                            className="item-except text-muted text-sm h-1x">{get(child, "document.title")}</div>
                                                                    )
                                                                })}

                                                            </div>
                                                            <div>
                                                                <div className="item-action dropdown"><a href="#"
                                                                                                         data-toggle="dropdown"
                                                                                                         className="text-muted"
                                                                                                         data-pjax-state>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16}
                                                                         height={16} viewBox="0 0 24 24" fill="none"
                                                                         stroke="currentColor" strokeWidth={2}
                                                                         strokeLinecap="round" strokeLinejoin="round"
                                                                         className="feather feather-more-vertical">
                                                                        <circle cx={12} cy={12} r={1}/>
                                                                        <circle cx={12} cy={5} r={1}/>
                                                                        <circle cx={12} cy={19} r={1}/>
                                                                    </svg>
                                                                </a>
                                                                    <div
                                                                        className="dropdown-menu dropdown-menu-right bg-black"
                                                                        role="menu"><a className="dropdown-item"
                                                                                       data-pjax-state>{t("See detail")}</a><a
                                                                        className="dropdown-item download"
                                                                        data-pjax-state>{t("Download")} </a><a
                                                                        className="dropdown-item edit"
                                                                        data-pjax-state>{t("Edit")}</a>
                                                                        <div className="dropdown-divider"/>
                                                                        <a onClick={() => remove(get(secondaryReq, "id"))}
                                                                           className="dropdown-item trash"
                                                                           data-pjax-state>{t("Delete item")}</a></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }) :
                                                <div className="no-result">
                                                    <div className="p-4 text-center">{t("No Results")}</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RequirementEditDrawer
                title={t("Дастлабки талаб қилинадиган хужжатлар")}
                visible={initialVisible}
                status={status}
                create={create} onClose={() => setInitialVisible(false)}/>
            <RequirementEditDrawer
                title={t("Кредит чиқариш учун зарур хужжатлар")}
                visible={secondaryVisible}
                status={status}
                create={create} onClose={() => setSecondaryVisible(false)}/>
            <Modal title={t("Общие настройки")} visible={modalVisible}>
                <RequirementGeneralForm product={product} onSubmitRequest={addGeneralRequirement}
                                        onClose={onCloseModal}/>
            </Modal>
        </>
    );
}

export default withTranslation("bhm_one")(RequirementsViewPage);

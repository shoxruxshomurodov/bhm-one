import React, {useEffect, useState} from 'react';
import BookScheme from "../../../../schema/Book";
import ApiActions from "../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {notification} from "antd";
import BookEditPage from "./BookEditPage";
import {withTranslation} from "react-i18next";

function BookViewPage(props) {
    const {t} = props;
    const {code} = useParams();
    const [isFetched, setIsFetched] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isRegion,setIsRegion] = useState(null);
    const entities = useSelector(state => get(state, 'normalize.entities', {}));
    let book = useSelector(state => get(state, 'normalize.data.monitoring-book-one.result', {}));
    let isFetchedData = useSelector(state => get(state, 'normalize.data.monitoring-book-one.isFetched', false));
    let shelf = useSelector(state => get(state, 'normalize.data.monitoring-bookshelf-setting.result', {}));
    let isFetchedShelf = useSelector(state => get(state, 'normalize.data.monitoring-bookshelf-setting.isFetched', true));
    book = Normalizer.Denormalize(book, BookScheme, entities);
    shelf = Normalizer.Denormalize(shelf, BookScheme, entities);
    const dispatch = useDispatch();
    const getMonitoringBook = () => {
        const storeName = 'monitoring-book-one';
        const entityName = 'book';
        const scheme = {BookScheme};
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `monitoring/branches/${code}`,
                config: {
                    params: {
                        include: "regionCounts,filialCounts,regionBookshelves,filialBookshelves",
                    }
                },
                scheme,
                storeName,
                entityName,
            },
        });
    }
    useEffect(() => {
        getMonitoringBook();
    }, [])

    const showDrawer = (type) => {
        setIsRegion(type)
        setVisible(true)
    };
    const onClose = () => {
        setVisible(false)
    };
    const create = (attributes) => {
        setIsFetched(true)
        const url = "/monitoring/bookshelves";
        const storeName = "book-create";
        const entityName = "book";
        const scheme = BookScheme;
        dispatch({
            type: ApiActions.OPERATION_ADD.REQUEST,
            payload: {
                attributes: {branch_id: code,is_region:isRegion, ...attributes},
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
                            description: t('Создано'),
                            placement: 'topRight',
                        });
                        setIsFetched(false);
                        onClose();
                        getMonitoringBook();
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
    const remove = (shelf_id) => {
        setIsFetched(true)
        const url = `/monitoring/bookshelves/${shelf_id}`;
        const storeName = "book-remove";
        const entityName = "book";
        const scheme = BookScheme;
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
                    success: () => {
                        notification['success']({
                            message: t('Успешно'),
                            description: t('Удалено'),
                            placement: 'topRight',
                        });
                        setIsFetched(false);
                        getMonitoringBook();
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
    const typeFilter = (type) => {
        const name = isEqual(type, "0") ? "jur" : "per";
        const storeName = 'monitoring-bookshelf-setting';
        const entityName = 'book';
        const scheme = BookScheme;
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `monitoring/settings/${name}-bookshelf`,
                config: {
                    params: {}
                },
                scheme,
                storeName,
                entityName,
            },
        });
    }

    if (isFetched) {
        return <Loader/>
    }
    if (!isFetchedData) {
        return <Loader/>
    }
    return (
        <>
            <div className="d-flex flex" id="content-body">
                <div className="d-flex flex-column flex">
                    <div className="p-3">
                        <div className="toolbar"><Link to={"/credit-monitoring/books"}
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
                                {get(book, "name")?.charAt(0)}
                            </span>
                            </div>
                            <div className="px-sm-4 my-3 my-sm-0 flex"><h2
                                className="text-md">{get(book, "code")} - {get(book, "name")}</h2>
                                <div className="my-3 d-flex">
                                    <h1 className={"mr-2"}>{t("Информация полка для филиалов")} - </h1>
                                    <div>
                                        <a><strong>{get(book, "filialCounts.total")}</strong>
                                            <span
                                                className="text-muted ml-2">{t("Всего книжных полок")}</span> </a><a
                                        className="mx-2"
                                      ><strong>{get(book, "filialCounts.filled")}</strong>
                                        <span
                                            className="text-muted ml-2">{t("Заполненные книжные полки")}</span> </a>
                                        <a className="mx-2"
                                            ><strong>{get(book, "filialCounts.required")}</strong>
                                            <span
                                                className="text-muted ml-2">{t("Необходимые книжные полки")}</span> </a>
                                    </div>
                                </div>
                                {get(book,"has_region") &&
                                <div className="my-3 d-flex">
                                    <h1 className={"mr-2"}>{t("Информация полка для регионов")} - </h1>
                                    <div>
                                        <a
                                            data-pjax-state><strong>{get(book, "regionCounts.total")}</strong>
                                            <span
                                                className="text-muted ml-2">{t("Всего книжных полок")}</span> </a><a
                                        className="mx-2"
                                        data-pjax-state><strong>{get(book, "regionCounts.filled")}</strong>
                                        <span
                                            className="text-muted ml-2">{t("Заполненные книжные полки")}</span> </a>
                                        <a
                                            className="mx-2"
                                            data-pjax-state><strong>{get(book, "regionCounts.required")}</strong>
                                            <span
                                                className="text-muted ml-2">{t("Необходимые книжные полки")}</span> </a>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className={`col-md-${get(book,"has_region") ? 6 : 12} b-r`}>
                                <div className="p-4">
                                    <div className={"d-flex justify-content-between align-items-center"}>
                                        <h6>{t("Полка для филиалов")}</h6>
                                        <div><a onClick={() => showDrawer(false)} className="btn btn-icon btn-rounded"
                                                data-pjax-state>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                 viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth={2}
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round" className="feather feather-edit-2">
                                                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"/>
                                            </svg>
                                        </a></div>
                                    </div>
                                    <div style={{maxHeight: "500px", overflowY: "auto"}}
                                         className="list list-row my-2 bg-dark r">
                                        {!isEmpty(get(book, "filialBookshelves")) ? get(book, "filialBookshelves")?.map(shelf => {
                                                return (
                                                    <div className="list-item" data-id={16}>
                                                        <div><label
                                                            className="ui-check m-0 ui-check-rounded ui-check-md"><input
                                                            type="checkbox" checked={true} name="id" defaultValue={16}/>
                                                            <i/></label></div>
                                                        <div className="flex"><a
                                                                                 className="item-title text-color h-1x"
                                                                                 data-pjax-state>{isEqual(get(shelf, "type"), 1) ? t("PERSONAL") : t("JURIDIC")}-{get(shelf, "sort")}</a>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Row")}: {get(shelf, "rows")}</div>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Cols")}: {get(shelf, "cols")}</div>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Volume")}: {get(shelf, "volume")}</div>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Filled")}: {get(shelf, "filled")}</div>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Total")}: {get(shelf, "total")}</div>
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
                                                                <div className="dropdown-menu dropdown-menu-right bg-black"
                                                                     role="menu"><a className="dropdown-item"
                                                                                    data-pjax-state>{t("See detail")}</a><a
                                                                    className="dropdown-item download"
                                                                    data-pjax-state>{t("Download")} </a><a
                                                                    className="dropdown-item edit" data-pjax-state>{t("Edit")}</a>
                                                                    <div className="dropdown-divider"/>
                                                                    <a onClick={() => remove(get(shelf, "id"))}
                                                                       className="dropdown-item trash" data-pjax-state>{t("Delete item")}</a></div>
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
                            {get(book,"has_region") && <div className="col-md-6">
                                <div className="p-4">
                                    <div className={"d-flex justify-content-between align-items-center"}>
                                        <h6>{t("Полка для регионов")}</h6>
                                        <div><a onClick={() => showDrawer(true)} className="btn btn-icon btn-rounded"
                                                data-pjax-state>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                 viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth={2}
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round" className="feather feather-edit-2">
                                                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"/>
                                            </svg>
                                        </a></div>
                                    </div>
                                    <div style={{maxHeight: "500px", overflowY: "auto"}}
                                         className="list list-row my-2 bg-dark r">
                                        {!isEmpty(get(book, "regionBookshelves")) ? get(book, "regionBookshelves")?.map(shelf => {
                                                return (
                                                    <div className="list-item" data-id={16}>
                                                        <div><label
                                                            className="ui-check m-0 ui-check-rounded ui-check-md"><input
                                                            type="checkbox" checked={true} name="id" defaultValue={16}/>
                                                            <i/></label></div>
                                                        <div className="flex"><a
                                                            className="item-title text-color h-1x"
                                                            data-pjax-state>{isEqual(get(shelf, "type"), 1) ? t("PERSONAL") : t("JURIDIC")}-{get(shelf, "sort")}</a>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Row")}: {get(shelf, "rows")}</div>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Cols")}: {get(shelf, "cols")}</div>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Volume")}: {get(shelf, "volume")}</div>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Filled")}: {get(shelf, "filled")}</div>
                                                            <div
                                                                className="item-except text-muted text-sm h-1x">{t("Total")}: {get(shelf, "total")}</div>
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
                                                                <div className="dropdown-menu dropdown-menu-right bg-black"
                                                                     role="menu"><a className="dropdown-item"
                                                                                    data-pjax-state>{t("See detail")}</a><a
                                                                    className="dropdown-item download"
                                                                    data-pjax-state>{t("Download")} </a><a
                                                                    className="dropdown-item edit" data-pjax-state>{t("Edit")}</a>
                                                                    <div className="dropdown-divider"/>
                                                                    <a onClick={() => remove(get(shelf, "id"))}
                                                                       className="dropdown-item trash" data-pjax-state>{t("Delete item")}</a></div>
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
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <BookEditPage initialValues={{count: "", type: "", ...get(shelf, "value")}} isFetchedShelf={isFetchedShelf}
                          title={!isRegion ? t("Создать полку для филиалов"): t("Создать полку для регионов")} typeFilter={typeFilter} visible={visible} create={create}
                          onClose={onClose} />
        </>
    );
}

export default withTranslation("bhm_one")(BookViewPage);

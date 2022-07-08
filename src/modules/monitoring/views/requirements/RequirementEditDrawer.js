import React, {useEffect, useState} from 'react';
import {Drawer, notification} from 'antd';
import {last, get, isEmpty, isEqual, isNil} from "lodash";
import SelectMultiAsyncPaginate from "../../../../components/SelectAsyncPagination/multi";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import DocumentScheme from "../../../../schema/Document";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {usePrevious} from 'react-use';

function RequirementEditDrawer(props) {
    const dispatch = useDispatch();
    const entities = useSelector(state => get(state, 'normalize.entities', {}));
    let documentId = useSelector(state => get(state, 'normalize.data.credit-monitoring-document-id.result', []));
    let isFetchedData = useSelector(state => get(state, 'normalize.data.credit-monitoring-document-id.isFetched', true));
    documentId = Normalizer.Denormalize(documentId, DocumentScheme, entities);
    const [documents, setDocuments] = useState([]);
    const prevDocuments = usePrevious(documents);
    const [lastDocument, setLastDocument] = useState({});
    const [selectedDocs, setSelectedDocs] = useState([]);
    const {
        visible, onClose = () => {
        },
        create = (param1, param2) => {
        },
        title,
        status
    } = props;
    const filterByMulti = (name, value) => {
        setDocuments(value);
        setLastDocument(last(value))
    }
    const getDocumentById = (params = {}) => {
        const storeName = "credit-monitoring-document-id";
        const entityName = "document";
        const scheme = {DocumentScheme}
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/monitoring/document/${get(lastDocument, "value")}`,
                config: {
                    params: {
                        include: "children",
                        ...params
                    }
                },
                scheme,
                storeName,
                entityName
            }
        });
    }
    useEffect(() => {
        setSelectedDocs([])
    }, [status])
    useEffect(() => {
        if (!isEmpty(documents) && !(documents?.length <= prevDocuments?.length)) {
            getDocumentById();
        } else {
            if (isEmpty(documents)) {
                setSelectedDocs([]);
            } else {
                for (let i = 0; i < selectedDocs?.length; i++) {
                    let is_has = false;
                    let current = selectedDocs[i];
                    for (let j = 0; j < documents.length; j++) {
                        if (isEqual(current.id, documents[j].value)) {
                            is_has = true;
                            break;
                        }
                    }
                    if (!is_has) {
                        setSelectedDocs(selectedDocs.filter(selectedDoc => !isEqual(get(selectedDoc, "id"), get(current, "id"))))
                        break;
                    }
                }
            }
        }
    }, [documents])
    useEffect(() => {
        if (!isEmpty(documentId) && isFetchedData) {
            setSelectedDocs(prevState => [...prevState, documentId])
        }
    }, [isFetchedData]);
    const removeChildren = (parentId, childrenId) => {
        for (let i = 0; i < selectedDocs?.length; i++) {
            let is_has = false;
            let current = selectedDocs[i];
            for (let j = 0; j < documents.length; j++) {
                if (!isEqual(current.id, parentId)) {
                    is_has = true;
                    break;
                }
            }
            if (!is_has) {
                const children = get(current, "children") && get(current, "children")?.filter(child => !isEqual(get(child, "id"), childrenId))
                selectedDocs.map(selectedDoc => {
                    if (isEqual(parentId, get(selectedDoc, "id"))) {
                        return selectedDoc.children = children;
                    }
                })
                setSelectedDocs(prevState => [...prevState]);
                break;
            }
        }
    }
    const Create = () => {
        if (isEmpty(selectedDocs)) {
            return notification['error']({
                message: "Все поля должны быть заполнены",
                description: 'Ошибка',
                placement: 'topRight',
            });
        } else {
            return create(selectedDocs)
        }
    }
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
            {isEqual(status, 0) && <SelectMultiAsyncPaginate
                url="/monitoring/document"
                attrSearch={"search"}
                onChange={filterByMulti}
                classname={"form-control form-control-sm"}
                params={{
                    "filter[status]": status,
                    "filter[is_deleted]": 0,
                }}
                property={["id", "title"]}
            />}
            {isEqual(status, 1) && <SelectMultiAsyncPaginate
                url="/monitoring/document"
                attrSearch={"search"}
                onChange={filterByMulti}
                classname={"form-control form-control-sm"}
                params={{
                    "filter[status]": status,
                    "filter[is_deleted]": 0,
                }}
                property={["id", "title"]}
            />}
            {isFetchedData ?
                <div className="scroll-y mx-3 mt-3 card">
                    <div className="list list-row">
                        {selectedDocs && selectedDocs.map(doc => {
                            return (
                                <div className="list-item" data-id={7} data-sr-id={2} style={{
                                    visibility: 'visible',
                                    transform: 'none',
                                    opacity: 1,
                                    transition: 'transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s'
                                }}>
                                    <div><span className="w-40 avatar gd-primary"
                                               data-toggle-class="loading">{get(doc, "title")?.charAt(0)}</span></div>
                                    <div className="flex"><a href="app.user.detail.html#7"
                                                             className="item-author text-color"
                                                             data-pjax-state>{get(doc, "title")}
                                    </a>
                                        {get(doc, "children") && get(doc, "children")?.map(child => {
                                            return (
                                                <div
                                                    className="item-mail text-muted h-1x d-none d-sm-block">{get(child, "title")}
                                                    <span
                                                        onClick={() => removeChildren(get(doc, "id"), get(child, "id"))}
                                                        className="badge badge-danger cursor-pointer ml-2">&times;</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                : <Loader/>}
            {isEmpty(documents) && isEmpty(selectedDocs) && isFetchedData && <div className="no-result card mx-3">
                <div className="p-4 text-center">No Results</div>
            </div>}
            <div className={"drawer-footer"}>
                <button className={"btn w-sm btn-white mr-1"} onClick={onClose}>Орқага</button>
                <button className={"btn w-sm btn-primary"} onClick={Create}>Тасдиқлаш</button>
            </div>
        </Drawer>
    );
}

export default RequirementEditDrawer;
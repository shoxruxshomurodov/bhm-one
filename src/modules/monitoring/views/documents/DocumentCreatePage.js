import React, {useState} from 'react';
import PageHeader from "../../../../components/PageHeader";
import DynamicFormField from "../../component/DynamicFormField/create";
import DocumentScheme from "../../../../schema/Document";
import {useDispatch} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import {get, isEmpty} from "lodash";
import {notification} from "antd";
import Loader from "../../../../components/Loader";
import {withTranslation} from "react-i18next";
import {useHistory} from "react-router";
function DocumentCreatePage(props) {
    const {t} = props;
    const history = useHistory()
    const [documents, setDocuments] = useState([]);
    const [status, setStatus] = useState([]);
    const [isFetched, setIsFetched] = useState(false)
    const dispatch = useDispatch();
    const create = (data) => {
        if (isEmpty(status) || isEmpty(documents)) {
            notification['error']({
                message: t("Пожалуйста, заполните все поля"),
                description: t('предупреждение'),
                placement: 'topRight',
            });
        } else {
            const children = get(data, "children");
            const url = "/monitoring/document";
            const storeName = "document-create";
            const entityName = "document";
            const scheme = DocumentScheme;
            setIsFetched(true)
            dispatch({
                type: ApiActions.OPERATION_ADD.REQUEST,
                payload: {
                    attributes: {
                        title: documents,
                        children,
                        status
                    },
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
                            setIsFetched(false)
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
            });
        }
    }
    const cancelLink = () => {
        history.push(`/credit-monitoring/documents`)
    }
    if (isFetched) {
        return <Loader/>
    }
    return (
        <>
            <PageHeader name={t("Monitoring")} desc={t("Monitoring create")}/>
            <div className={"page-content page-container"}>
                <div className={"card"}>
                    <div className="card-header"><strong>{t("Create document")}</strong></div>
                    <div className={"card-body"}>
                        <div>
                            <div className="form-group row"><label
                                className="col-sm-3 col-form-label">{t("Step")}</label>
                                <div className="col-sm-9"><select onChange={e => setStatus(get(e, "target.value"))}
                                                                  className="form-control">
                                    <option>{t("Select")}</option>
                                    <option value={0}>{t("Дастлабки талаб қилинадиган хужжатлар")}</option>
                                    <option value={1}>{t("Кредит чиқариш учун зарур хужжатлар")}</option>
                                </select></div>
                            </div>
                            <div className="form-group row"><label
                                className="col-sm-3 col-form-label">{t("Document")}</label>
                                <div className="col-sm-9"><input onChange={(e) => setDocuments(get(e, "target.value"))}
                                                                 type="text"
                                                                 className="form-control"/></div>
                            </div>

                            <DynamicFormField request={create} isUpdated={false} initialValues={{}}
                                              cancelLink={cancelLink}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation("bhm_one")(DocumentCreatePage);

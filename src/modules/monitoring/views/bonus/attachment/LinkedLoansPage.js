import React, {useEffect, useState} from 'react';
import LoanScheme from "../../../../../schema/Loans";
import ApiActions from "../../../../../services/api/Actions";
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../../../services/normalizr";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../../../components/Loader";
import TemplateTable from "../../../../../components/TemplateTable";
import classNames from "classnames";
import Pagination from "../../../../../components/Pagination/Pagination";
import {withTranslation} from "react-i18next";
function LinkedLoansPage(props) {
    const {t} = props;
    const [active, setActive] = useState(false)
    const dispatch = useDispatch();
    const isFetched = useSelector((state) =>
        get(state, "normalize.data.credit-monitoring-linked-loans.isFetched", false)
    );
    let loansList = useSelector((state) =>
        get(state, "normalize.data.credit-monitoring-linked-loans.result", [])
    );
    const meta = useSelector((state) =>
        get(state, "normalize.data.credit-monitoring-linked-loans.result._meta", [])
    );
    const entities = useSelector((state) => get(state, "normalize.entities", []));
    loansList = get(
        Normalizer.Denormalize(loansList, {data: [LoanScheme]}, entities),
        "data",
        []
    );
    const getAllLoans = (params) => {
        const storeName = "credit-monitoring-linked-loans";
        const entityName = "loan";
        const scheme = {data: [LoanScheme]};
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/bonus/bonus-loan/filial-assigned",
                config: {
                    params: {
                        "per-page": 10,
                        include: "region",
                        ...params,
                    },
                },
                scheme,
                storeName,
                entityName,
            },
        });
    }
    const pagination = (page = 1) => {
        getAllLoans({page});
    };
    useEffect(() => {
        getAllLoans()
    }, [])
    if (!isFetched) {
        return <Loader/>
    }
    return (
        <div>
            <TemplateTable
                className="scroll-y mb-0"
                head={[
                    '№',
                    'ID',
                    "Регион",
                    "Филиал",
                    'Мижоз номи',
                    'Инн',
                    'Очилган сана',
                    'Ёпилган сана',
                ]}
            >
                {loansList &&
                loansList.map((loan, index) => {
                    return (
                        <tr
                            className={classNames(
                                "v-middle cursor-pointer text-hover",
                                {
                                    active: isEqual(get(loan, "id"), active),
                                }
                            )}
                            key={get(loan, "id")}
                            onClick={() => setActive(get(loan, "id"))}
                        >
                            <td>{get(meta, "currentPage") >= 2 ? index + 1 + (get(meta, "pageSize") * (get(meta, "currentPage") - 1)) : index + 1}</td>
                            <td>{get(loan, 'id', 0)}</td>
                            <td className="text-left">{`${get(loan, 'region.name', '')}`}</td>
                            <td className="text-left">{`${get(loan, 'filial_code', '')}`}</td>
                            <td className="text-left">{get(loan, 'client_name', '')}</td>
                            <td>{get(loan, 'inn', 0)}</td>
                            <td>{get(loan, 'open_date', 0)}</td>
                            <td>{get(loan, 'close_date', 0)}</td>

                        </tr>
                    );
                })}
            </TemplateTable>
            {!isEmpty(loansList) && isFetched && (
                <div className={"px-3 py-3 mt-auto"}>
                    <Pagination meta={meta} onChange={pagination}/>
                </div>
            )}
            {isEmpty(loansList) && isFetched && (
                <div className="no-result card mx-3 mt-5">
                    <div className="p-4 text-center">{t("No Results")}</div>
                </div>
            )}
        </div>
    );
}

export default withTranslation("bhm_one")(LinkedLoansPage);
import React, {useEffect} from 'react';
import {get,isEqual} from "lodash";
import Loans from "../../../../schema/Loans";
import Loan from "../../../../schema/Loans";
import ApiActions from "../../../../services/api/Actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Normalizer from "../../../../services/normalizr";
import {Drawer} from 'antd';
import Loader from "../../../../components/Loader"
import NumberFormat from "react-number-format";
import styled from "styled-components";
import {withTranslation} from "react-i18next";


const List = styled.div`
  @media (max-width: 1600px) {
    max-height: 150px;
    overflow-y: auto;
  }
  @media (min-width: 1600px) {
    max-height: 320px;
    overflow-y: auto;
  }
  @media (min-width: 3000px) {
    max-height: 250px;
    overflow-y: auto;
  }
`;

function BranchLoansDrawer(props) {
    let {visible, onClose, id, entities, loans, isFetched, loading, type, t} = props;
    useEffect(() => {
        if (id) {
            const {getLoan, getLoanTrigger} = props;
            getLoanTrigger();
            getLoan({id})
        }
    }, [id])
    loans = Normalizer.Denormalize(loans, Loans, entities);
    const SetLoan = () => {
        const {setLoan} = props;
        setLoan(get(loans, "id"));
        onClose()
    }
    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <Drawer
                title={t("Confirmation window")}
                placement={"right"}
                closable={false}
                onClose={onClose}
                visible={visible}
                key={"right"}
                style={{zIndex: 99999}}
                width={"50%"}
            >
                {isFetched ?
                    <>
                        <div className="d-flex flex-column flex">
                            <div className="mx-3">
                                <div className="py-4 d-sm-flex no-shrink b-b">
                                    <div className={"avatar w-96 gd-success"} style={{
                                        width: "80px",
                                        height: "80px",
                                        fontSize: "30px"
                                    }}>{get(loans, "client.type")}</div>
                                    <div className="px-sm-4 my-3 my-sm-0 flex"><h2
                                        className="text-md">{get(loans, "id")} - {get(loans, "client.name")}</h2><small
                                        className="d-block text-fade">{get(loans, "product.name")}</small>

                                        <div className="my-3"><a href="#" data-pjax-state><strong>{t("Сумма")}</strong> <span
                                            className="text-muted"><NumberFormat displayType={'text'}
                                                                                 thousandSeparator={' '}
                                                                                 value={get(loans, "sum")}/>  {t("сўм")}</span>
                                        </a><a href="#"
                                               className="mx-2"
                                               data-pjax-state><strong>{t("Фоиз")}</strong>{" "}
                                            <span
                                                className="text-muted">{get(loans, "osn_percent")} %</span> </a><a
                                            href="#"
                                            data-pjax-state><strong>{t("Даври")}</strong>
                                            <span
                                                className="text-muted">{" "} {get(loans, "opened_at")} / {get(loans, "closed_at")}</span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-12">
                                        <div className="pt-2">
                                            <div id="accordion" className="mb-4">
                                                <div className="card mb-1 scroll-y">
                                                    <div className="card-header no-border" id="headingOne"><a
                                                                                                              data-toggle="collapse"
                                                                                                              data-target="#collapseOne"
                                                                                                              aria-expanded="true"
                                                                                                              aria-controls="collapseOne">{t("Дастлабки талаб қилинадиган хужжатлар")}</a>
                                                    </div>
                                                    <div id="collapseOne"
                                                         className="collapse show"
                                                         aria-labelledby="headingOne" data-parent="#accordion">
                                                        <div className="card-body p-0">
                                                            <List className="list list-row box-shadow my-2 bg-dark r">
                                                                {get(loans, "product.initialRequirements") && get(loans, "product.initialRequirements")?.map(requirement => {
                                                                    return (
                                                                        <div className="list-item" data-id={16}>
                                                                            <div><label
                                                                                className="ui-check m-0 ui-check-rounded ui-check-md"><input
                                                                                type="checkbox"
                                                                                name="id"
                                                                                checked={true}
                                                                            /> <i/></label>
                                                                            </div>
                                                                            <div className="flex"><a
                                                                                className="item-title text-color h-1x"
                                                                                data-pjax-state>{get(requirement, "document.title")}</a>
                                                                                {get(requirement, "children") && get(requirement, "children")?.map(child => {
                                                                                    return (
                                                                                        <div
                                                                                            className="item-except text-muted text-sm h-1x">{get(child, "document.title")}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </List>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card mb-1">
                                                    <div className="card-header no-border" id="headingTwo"><a
                                                                                                              data-toggle="collapse"
                                                                                                              data-target="#collapseTwo"
                                                                                                              aria-expanded="false"
                                                                                                              aria-controls="collapseTwo">{t("Кредит чиқариш учун зарур хужжатлар")}</a>
                                                    </div>
                                                    <div id="collapseTwo" className="collapse"
                                                         aria-labelledby="headingTwo" data-parent="#accordion">
                                                        <div className="card-body p-0">
                                                            <List className="list list-row box-shadow my-2 bg-dark r">
                                                                {get(loans, "product.secondaryRequirements") && get(loans, "product.secondaryRequirements")?.map(requirement => {
                                                                    return (
                                                                        <div className="list-item" data-id={16}>
                                                                            <div><label
                                                                                className="ui-check m-0 ui-check-rounded ui-check-md"><input
                                                                                type="checkbox"
                                                                                name="id"
                                                                                checked={true}
                                                                            /> <i/></label>
                                                                            </div>
                                                                            <div className="flex"><a
                                                                                className="item-title text-color h-1x"
                                                                                data-pjax-state>{get(requirement, "document.title")}</a>
                                                                                {get(requirement, "children") && get(requirement, "children")?.map(child => {
                                                                                    return (
                                                                                        <div
                                                                                            className="item-except text-muted text-sm h-1x">{get(child, "document.title")}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </List>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="alert bg-success alert-fixed-bottom py-3 mr-4" role="alert">
                                    <div className="d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32}
                                             viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                             strokeLinejoin="round"
                                             className="feather feather-check-circle">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                            <polyline points="22 4 12 14.01 9 11.01"/>
                                        </svg>
                                        <div className="px-3"><h5 className="alert-heading">{t("Ommaviy oferta")} <small
                                            className=" text-light">{t("(Kredit xujjatlari yig‘majildini qabul qilish to‘g‘risida)")}</small>
                                        </h5>
                                            <p>{t("Mazkur hujjat Xalq banki filiallari Monitoring bo‘limi xodimlari uchun kredit xujjatlari yig‘majildini qabul qilish yuzasidan javobgarlikni belgilaydi. ")}</p>
                                            <p>{t("Ushbu offerta shartlarini qabul qilish orqali Monitoring bo‘limi xodimlari xujjatlari tegishli kredit produkti bo‘yicha to‘liqligi va butligini tasdiqlaydi xamda javobgarlikni qabul qiladi.")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {visible && isEqual(type, "all") &&
                        <div className={"drawer-footer"}>
                            <button className={"btn btn-white mr-1"} onClick={onClose}>{t("Орқага")}</button>
                            <button className={"btn btn-primary"} onClick={SetLoan}>{t("Тасдиқлаш")}</button>
                        </div>
                        }
                    </>
                    : <Loader/>}
            </Drawer>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalize.entities', []),
        isFetched: get(state, "normalize.data.branch-loans-view-id.isFetched", false),
        loans: get(state, 'normalize.data.branch-loans-view-id.result', {}),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLoanTrigger: () => {
            const storeName = 'branch-loans-view-id';
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
        },
        getLoan: ({id}) => {
            const storeName = 'branch-loans-view-id';
            const entityName = 'loans';
            const scheme = {data: [Loan]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/monitoring/loans/${id}`,
                    config: {
                        params: {
                            include: "client,branch,product,product.initialRequirements.document,product.initialRequirements.children.document,product.secondaryRequirements.document,product.secondaryRequirements.children.document,location",
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },

    }
}
export default withTranslation("bhm_one")(connect(mapStateToProps, mapDispatchToProps)(withRouter(BranchLoansDrawer)));

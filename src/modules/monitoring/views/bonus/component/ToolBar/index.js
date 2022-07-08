import React from 'react';
import {get, isNil, isEmpty} from "lodash";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {decode} from "js-base64";

function Toolbar(props) {
    let {onSelectFilter, onSearch, t,} = props;
    return (
        <div className={"mx-3 mb-2"}>
            <Link to={"/credit-monitoring/employee/create"}
                  className={"btn w-xs btn-primary ml-auto d-block mb-2"}>{t("Yaratish")}</Link>
            <div className={"d-flex align-items-center"}>
                <select onChange={onSelectFilter}
                        className="form-control form-control-sm w-25">
                    <option value={"all"}>{t("Barchasi")}</option>
                    <option value={"1"}>{t("Bank hodimi")}</option>
                    <option value={"2"}>{t("Mahsus hodim")}</option>
                </select>
                <form className="flex">
                    <div className="input-group"><input type="text"
                                                        onChange={onSearch}
                                                        className="form-control form-control-theme form-control-sm search"
                                                        placeholder={t("Search")} required/> <span
                        className="input-group-append"><button
                        className="btn btn-white no-border btn-sm" type="button"><span
                        className="d-flex text-muted"><svg
                        xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-search"><circle cx={11} cy={11} r={8}/><line x1={21}
                                                                                                y1={21}
                                                                                                x2="16.65"
                                                                                                y2="16.65"/></svg></span></button></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withTranslation("bhm_one")(Toolbar);
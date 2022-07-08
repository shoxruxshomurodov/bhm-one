import React from 'react';
import {get, isNil, isEmpty} from "lodash";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {decode} from "js-base64";

function Toolbar(props) {
    let {onSelectFilter, onSearch, t, encoded} = props;
    encoded = !isNil(encoded) && decode(encoded);
    encoded = encoded && JSON.parse(encoded);
    return (
        <div className={"mx-3 mb-2"}>
            <Link to={"/credit-monitoring/documents/create"}
                  className={"btn w-xs btn-primary ml-auto d-block mb-2"}>{t("Yaratish")}</Link>
            <div className={"d-flex align-items-center"}>
                <select onChange={e => onSelectFilter({
                    selected: get(e, "target.value"),
                    param: {status: get(e, "target.value")},
                    value: get(e, "target.value")
                })}
                        defaultValue={get(encoded, `selected`)}
                        className="form-control form-control-sm w-25">
                    <option value={"all"}>{t("Все")}</option>
                    <option value={"initial"}>{t("Дастлабки талаб қилинадиган хужжатлар")}</option>
                    <option value={"secondary"}>{t("Кредит чиқариш учун зарур хужжатлар")}</option>
                </select>
                <form className="flex">
                    <div className="input-group"><input type="text"
                                                        defaultValue={get(encoded, "search")}
                                                        onChange={e => onSearch(get(e, "target.value"))}
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
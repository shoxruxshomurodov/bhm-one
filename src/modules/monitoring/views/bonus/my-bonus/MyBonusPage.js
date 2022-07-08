import React, { useEffect, useState } from "react";
import TemplateTable from "../../../../../components/TemplateTable";
import Pagination from "../../../../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../../../services/api/Actions";
import BonusesScheme from "../../../../../schema/BonusesScheme";
import { get, isEmpty, isEqual } from "lodash";
import Normalizer from "../../../../../services/normalizr";
import Loader from "../../../../../components/Loader";
import classNames from "classnames";
import { withTranslation } from "react-i18next";
import Toolbar from "../component/ToolBar";
import Hat from "../../../../../components/Hat/Hat";
import ColumnChart from "./components/ColumnChart";
import moment from "moment";

function MyBonusPage(props) {
  const { t } = props;
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  let data = useSelector(state =>
    get(state, "normalize.data.credit-monitoring-bonuses.result", {})
  );
  const isFetched = useSelector(state =>
    get(state, "normalize.data.credit-monitoring-bonuses.isFetched", false)
  );
  const meta = useSelector(state =>
    get(state, "normalize.data.credit-monitoring-bonuses.result._meta", [])
  );
  const entities = useSelector(state => get(state, "normalize.entities", {}));
  console.log(data, "DARAAA");
  data = Normalizer.Denormalize(data, BonusesScheme, entities);

  const current = moment();
  const currentMonth = current.subtract(1, "month");
  const currentDate = currentMonth.format("YYYY-MM-DD");
  const getMyBonues = (params = {}) => {
    const storeName = "credit-monitoring-bonuses";
    const entityName = "bonuses";
    const scheme = BonusesScheme;
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName
      }
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: "/bonus/bonus-sheet/my-bonus",
        config: {
          params: {
            "per-page": 10,
            period: currentDate,
            ...params
          }
        },
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    getMyBonues();
  }, []);

  return (
    <div className={"d-flex flex fixed-content mt-2"}>
      <div className={"d-flex flex"} id={"content-body"}>
        <div className={"d-flex flex-column flex"} id={"user-list"}>
          <Hat
            name="Менинг Бонусларим"
            desc="Муддати ўтган кредитларни ундириш учун ҳодимлар рўйҳати"
          />
          {isFetched ? (
            <div className="p-4 d-sm-flex no-shrink b-b ">
              <div>
                <span className="w-96 h-96  avatar gd-info">
                  {get(data, "last_name")?.charAt(0)}
                  {get(data, "last_name")?.charAt(0)}
                </span>
              </div>
              <div className="px-sm-4 my-3 my-sm-0 flex">
                <h2 className="text-md">
                  <span> {get(data, "last_name")}</span>
                  <span> {get(data, "first_name")}</span>
                </h2>
                <small className="d-block text-fade">
                  <strong className="text-dark">{t("Bo'lim")}:</strong>{" "}
                  {get(data, "dep_name")}
                </small>
                <small className="d-block text-fade">
                  <strong className="text-dark">{t("Lavozim")}:</strong>
                  {get(data, "post_name")}
                </small>
                <div className="my-3 d-flex justify-content-between w-50">

                  <p>
                    <strong className='mr-1' >{t("NPL Bonuses")}</strong>
                    <span className="text-muted">{get(data,'bonus_npl')}</span>
                  </p>
                  <p>
                     <strong  className='mr-1' >{t("Shtat Bonuses")}</strong>
                    <span className="text-muted">{get(data,'bonus_penalty')}</span>
                  </p>
                  <p>
                    <strong className='mr-1' >{t("All Bonuses")}</strong>
                    <span className="text-muted">{get(data,'bonus_total')}</span>
                  </p>
                </div>
                {get(data, "bonus_total") ? (
                  <div>
                    <ColumnChart data={data} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <Loader />
          )}
          {isEmpty(data) && isFetched && (
            <div className="no-result card mx-3 mt-5">
              <div className="p-4 text-center">{t("No Results")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withTranslation("bhm_one")(MyBonusPage);

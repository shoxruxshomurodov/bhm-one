import React, { useEffect } from "react";
import PieChart from "../component/PieChart";
import ApiActions from "../../../../../services/api/Actions";
import { useDispatch, useSelector } from "react-redux";
import { get, isEmpty, isNil, sum } from "lodash";
import BranchView from "../../../../../schema/BranchView";
import Normalizer from "../../../../../services/normalizr";
import Loader from "../../../../../components/Loader";
const NplReportFilialContainer = () => {
  const dispatch = useDispatch();
  const getOne = () => {
    const storeName = "npl-branch-view";
    const entityName = "branch-view";
    const scheme = BranchView;
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName,
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: "/monitoring/reports/npl-branch-view",
        config: {},
        scheme,
        storeName,
        entityName,
      },
    });
  };
  const entities = useSelector((state) => get(state, "normalize.entities", []));
  let data = useSelector((state) =>
    get(state, "normalize.data.npl-branch-view.result", [])
  );
  const isFetched = useSelector((state) =>
    get(state, "normalize.data.npl-branch-view.isFetched", true)
  );
  data = Normalizer.Denormalize(data, BranchView, entities);
  useEffect(() => {
    getOne();
  }, []);
  const sum_off_all = Math.round(get(data, "sum_off_all"))
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const sum_off_npl = Math.round(get(data, "sum_off_npl"))
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const series = [get(data, "sum_off_all"), get(data, "sum_off_npl")];
  const labels = [
    `Jami kredit portfeli - ${sum_off_all} so'm`,
    `Jami npl summa - ${sum_off_npl} so'm `,
    `Jami ulushi - ${get(data, "percentile")} %`,
  ];
  if (!isFetched) {
    return <Loader />;
  }
  return <PieChart series={series} percentage={get(data, "percentile")} labels={labels} />;
};

export default NplReportFilialContainer;

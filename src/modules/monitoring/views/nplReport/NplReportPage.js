import React from "react";
import Tabs from "../../../../components/Tab";
import NplFilialPage from "./NplFilialPage";
import NplRegionsPage from "./NplRegionsPage";
import PieChart from "./component/PieChart";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import config from "../../../../config";
import PieChartTwo from "./component/PieChart";
import NplReportFilialContainer from "./container/NplReportFilialContainer";

function NplReportPage(props) {
  const { t } = props;
  const user = useSelector((state) => get(state, "auth.user"));
  return (
    <>
      {isEqual(
        get(user, "roles.monitoring_problem_filial"),
        config.ROLES.MONITORING_PROBLEM_FILIAL
      ) ? (
        <Tabs
          titles={[get(user, "section.STAFFING_FILIAL")]}
          defaultActiveKey={1}
          components={[<NplReportFilialContainer />]}
        />
      ) : (
        <Tabs
          titles={[t("Regions"), t("Filials")]}
          defaultActiveKey={1}
          components={[<NplRegionsPage />, <NplFilialPage />]}
        />
      )}
    </>
  );
}

export default withTranslation("bhm_one")(NplReportPage);

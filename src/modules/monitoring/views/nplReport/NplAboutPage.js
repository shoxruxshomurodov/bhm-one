import { createStyles, Table, Progress, Text, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import ApiActions from "../../../../services/api/Actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Pagination from "../../../../components/Pagination/Pagination";
import Normalizer from "../../../../services/normalizr";
import NumberFormat from "react-number-format";
import Loader from "../../../../components/Loader";
import { withTranslation } from "react-i18next";
import ReportRegion from "../../../../schema/ReportRegion";
import { RiFileExcel2Line } from "react-icons/ri";
import Toolbar from "../../../../components/Toolbar";
import ApiService from "../../services/ApiService";
import { notification } from "antd";
import { request } from "../../../../services/api";
import Hat from "../../../../components/Hat/Hat";

const useStyles = createStyles(theme => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`
    }
  }
}));

function NplAboutPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { meta, isFetched, entities, drawToRender, t } = props;
  const CallRender = params => {
    const { callRender } = props;
    callRender(params);
  };
  const pagination = (page = 1) => {
    CallRender({ page });
  };
  let data = get(
    Normalizer.Denormalize(drawToRender, { data: [ReportRegion] }, entities),
    "data",
    []
  );
  useEffect(() => {
    CallRender({ page: 1 });
  }, []);
  const exportExcel = () => {
    setIsLoading(true);
    ApiService.excelExportRegion({
      only_problem: true
    })
      .then(res => {
        setIsLoading(false);
        notification["success"]({
          message: t("Успешно"),
          description: t("Загружено"),
          placement: "topRight"
        });
        window.location.assign(get(res, "data.src"));
      })
      .catch(e => {
        setIsLoading(false);
        const message = get(e, "response.data.message", []);
        notification["error"]({
          message: t(message),
          description: "",
          placement: "topLeft"
        });
      });
  };
  const refreshTask = () => {
    setIsLoading(true);
    request
      .post("/monitoring/reports/npl-refresh", {})
      .then(res => {
        setIsLoading(false);
        notification["success"]({
          message: t("Успешно"),
          description: t("Загружено"),
          placement: "topRight"
        });
      })
      .catch(e => {
        setIsLoading(false);
        const message = get(e, "response.data.message", []);
        notification["error"]({
          message: t(message),
          description: "",
          placement: "topLeft"
        });
      });
  };
  const { classes, theme } = useStyles();
  const rows = data.map(row => {
    const positiveReviews = 100 - get(row, "percentile");
    const negativeReviews = get(row, "percentile");
    return (
      <tr key={row.name}>
        <td>
          <Text size="sm">{row.name}</Text>
        </td>
        <td>
          <Text size="sm">
            <NumberFormat
              displayType={"text"}
              thousandSeparator={" "}
              value={get(row, "sum_off_all")}
            />
          </Text>
        </td>
        <td>
          <Text size="sm">
            <NumberFormat
              displayType={"text"}
              thousandSeparator={" "}
              value={get(row, "sum_off_npl")}
            />
          </Text>
        </td>
        <td>
          <Group position="apart">
            <Text size="xs" color="teal" weight={700}>
              {positiveReviews?.toFixed(1)}%
            </Text>
            <Text size="xs" color="red" weight={700}>
              {negativeReviews?.toFixed(1)}%
            </Text>
          </Group>
          <Progress
            classNames={{ bar: classes.progressBar }}
            sections={[
              {
                value: positiveReviews,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.teal[9]
                    : theme.colors.teal[6]
              },
              {
                value: negativeReviews,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.red[9]
                    : theme.colors.red[6]
              }
            ]}
          />
        </td>
      </tr>
    );
  });
  return (
    <div className={"page-content"} id={"page-content"}>
      <div className={"d-flex flex fixed-content"}>
        <div className={"d-flex flex"} id={"content-body"}>
          <div className={"d-flex  flex-column flex"} id={"user-list"}>
            <Hat name={"О системе"} desc={"Участники проекта"} />
            {!isLoading && isFetched ? (
              <div className={"col-md-12"}>
                <div className={"container d-flex justify-space-around"}>
                  <div className={"card p-5 col-md-5"}>
                    <ul>
                      <li>
                        <h1 className={"text-center fs-24"}>Buyurtmachi</h1>
                      </li>
                      <li>
                        <h2>Muammoli kreditlar bilan ishlash departamenti</h2>
                      </li>
                      <li>Bakhtiyor Alimov</li>
                      <li>Bakhtiyor Sharipov</li>
                      <li>Anvar Kuzibayev</li>
                    </ul>
                  </div>
                  <div className={"card p-5 col-md-5 "}>
                    <ul>
                      <li>
                        <h1 className={"text-center fs-24"}>Bajaruvchi</h1>
                      </li>
                      <li>
                        <h2> Dasturiy ta'minot departamenti</h2>
                      </li>
                      <li>Xurshid Asqarov</li>
                      <li>O'tkir Absalomov</li>
                      <li>Saidimom Muxamadiyev</li>
                      <li>Sherzod Aliqulov</li>
                      <li>Jahongir Xayitbaev</li>
                      <li>Shoxrux Shomurodov</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    drawToRender: get(state, "normalize.data.npl-regions.result", []),
    isFetched: get(state, "normalize.data.npl-regions.isFetched", false),
    meta: get(state, "normalize.data.npl-regions.result._meta", []),
    entities: get(state, "normalize.entities", [])
  };
};
const mapDispatchToProps = dispatch => {
  return {
    callRender: params => {
      const storeName = "npl-regions";
      const entityName = "npl-region";
      const scheme = { data: [ReportRegion] };
      dispatch({
        type: ApiActions.GET_ALL.TRIGGER,
        payload: {
          storeName
        }
      });
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/monitoring/reports/npl-regions",
          config: {
            params: {
              ...params
            }
          },
          scheme,
          storeName,
          entityName
        }
      });
    }
  };
};

export default withTranslation("bhm_one")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(NplAboutPage))
);

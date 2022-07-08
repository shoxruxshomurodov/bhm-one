import React, { useCallback, useEffect } from "react";
import { Col, PageHeader, Row, Tag, Timeline } from "antd";
import ApiActions from "../../../../services/api/Actions";
import config from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import HistoryScheme from "../../../../schema/History";
import get from "lodash/get";
import Normalizer from "../../../../services/normalizr";
import SkeletonLoader from "../../../../components/SkeletonLoader/SkeletonLoader";
import { withTranslation } from "react-i18next";
import { includes, isEqual, isNil } from "lodash";
import Moment from "react-moment";

const History = ({ process_id, t }) => {
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const user = useSelector((state) => get(state, "auth.user"));
  let result = useSelector((state) =>
    get(state, "normalize.data.monitoring-task-history.result")
  );
  result = Normalizer.Denormalize(result, { data: [HistoryScheme] }, entities);
  const data = get(result, "data", []);
  const isFetched = useSelector((state) =>
    get(state, `normalize.data.monitoring-task-history.isFetched`, false)
  );
  const roles = get(user, "roles");
  console.log(roles, "Roles");
  const getRolesRepublic = () => {
    for (const role in roles) {
      if (
        roles[role] === "monitoring_republic" ||
        roles[role] === "monitoring_admin"
      ) {
        return true;
      }
    }
    return false;
  };
  const isRepublic = getRolesRepublic();
  const getHistory = useCallback(
    ({ page }) => {
      dispatch({
        type: ApiActions.GET_ALL.TRIGGER,
        payload: {
          storeName: "monitoring-task-history",
          entityName: "history",
        },
      });
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `/monitoring/process-task/task-history/${process_id}`,
          config: {
            params: {
              include: [
                "responsible",
                "responsible.profile",
                "endTransition",
                "responsible.profile.structureOrgRoot",
              ].join(","),
              page,
              "per-page": 20,
              sort: "-created_at",
            },
          },
          scheme: { data: [HistoryScheme] },
          storeName: "monitoring-task-history",
          entityName: "history",
        },
      });
    },
    [process_id]
  );
  useEffect(() => {
    getHistory({});
  }, []);

  if (!isFetched) {
    return <SkeletonLoader />;
  }
  return (
    <>
      <PageHeader title="История" className={"mt-2"}>
        <Row>
          <Col span="24">
            <Timeline mode={"alternate"}>
              {data &&
                data.map(function(creditTask) {
                  const is_republic_history = isEqual(
                    get(creditTask, "responsible_structure_code"),
                    "09006"
                  );
                  return (
                    <Timeline.Item
                      color={
                        config.STYLE[get(creditTask, "end_transition_style")]
                      }
                    >
                      <h4>
                        <b>
                          {/* {isRepublic ||
                          !isEqual(get(user, "profile.FILIAL_CODE"), "09006")
                            ? get(creditTask, "responsible_name")
                            : t("Bosh bank")} */}
                          {!isRepublic && is_republic_history
                            ? t("Bosh bank")
                            : get(creditTask, "responsible_name")}
                        </b>
                      </h4>
                      {!(!isRepublic && is_republic_history) && (
                        <>
                          <span>
                            <b>{t("phone")}:</b>
                            {get(creditTask, "responsible_phone")}
                          </span>
                          <br />
                        </>
                      )}
                      <span>
                        <b>{t("started")}:</b>
                        {isNil(get(creditTask, "started_at")) ? (
                          t("No'malum")
                        ) : (
                          <Moment format={"DD.MM.YYYY HH:mm"}>
                            {get(creditTask, "started_at")}
                          </Moment>
                        )}
                      </span>
                      <br />
                      <span>
                        <b>{t("ended")}:</b>
                        <Moment format={"DD.MM.YYYY HH:mm"}>
                          {get(creditTask, "end_at")}
                        </Moment>
                      </span>
                      <p>{get(creditTask, "end_comment")}</p>
                      <p>
                        <Tag
                          color={
                            config.STYLE[
                              get(creditTask, "end_transition_style", "info")
                            ]
                          }
                        >
                          {get(creditTask, "end_transition_title")}
                        </Tag>
                      </p>
                    </Timeline.Item>
                  );
                })}
            </Timeline>
          </Col>
        </Row>
      </PageHeader>
    </>
  );
};
export default withTranslation("bhm_one")(React.memo(History));

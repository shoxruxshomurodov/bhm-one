import { Col, Progress, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import { get } from "lodash";
import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SmsMonitoringScheme from "../../../schema/SmsMonitoringScheme";
import ApiService from "../../../services/api/Actions";
import Normalizer from "../../../services/normalizr";

const SendSmsMonitoringContainer = ({
  getSmsMonitoring,
  smsMonitoring,
  entities,
  t,
}) => {
  useEffect(() => {
    getSmsMonitoring();
  }, []);
  smsMonitoring = Normalizer.Denormalize(
    smsMonitoring,
    { result: [SmsMonitoringScheme] },
    entities
  );

  const columns = [
    {
      title: t("Kategoriya Nomi"),
      dataIndex: "name",
      className: "font-weight-bold",
    },
    {
      title: t("Jo'natilgan SMS"),
      dataIndex: "send",
      className: "bg-success",
    },
    {
      title: t("Jo'natilayotgan SMS"),
      dataIndex: "sending",
      className: "bg-info",
    },
    {
      title: t("Jo'natilmagan SMS"),
      dataIndex: "unsend",
      className: "bg-danger",
    },
  ];
  const data = get(smsMonitoring, "result", []);
  return (
    <div className="mt-2">
      <div className="card p-4">
        <Table
          bordered
          columns={columns}
          dataSource={data.map(
            ({
              categoryId,
              categoryName,
              sentCount,
              pendingCount,
              errorCount,
            }) => ({
              name: categoryName,
              key: categoryId,
              send: sentCount,
              sending: pendingCount,
              unsend: errorCount,
            })
          )}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    smsMonitoring: get(state, "normalize.data.sms-monitoring-list"),
    entities: get(state, "normalize.entities", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSmsMonitoring: () => {
      const storeName = "sms-monitoring-list";
      const entityName = "smsMonitoringScheme";
      const scheme = [SmsMonitoringScheme];

      dispatch({
        type: ApiService.GET_ALL.REQUEST,
        payload: {
          url: "sms/sms/monitoring",
          scheme,
          storeName,
          entityName,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation("bhm_one")(SendSmsMonitoringContainer)));

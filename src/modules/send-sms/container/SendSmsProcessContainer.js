import { Button, Col, Progress, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SmsJobScheme from "../../../schema/SmsJobScheme";
import ApiService from "../../../services/api/Actions";
import Normalizer from "../../../services/normalizr";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader";
import Actions from "../actions";
import Swal from "sweetalert2";
import { withTranslation } from "react-i18next";
const SendSmsProcessContainer = ({
  getSmsJobList,
  smsJobs,
  entities,
  totalElements,
  size,
  currentPage,
  isFetched,
  changeSmsStatusRequest,
  isEmpty,
  t,
}) => {
  useEffect(() => {
    getSmsJobList({ page: 0, size: 10 });
  }, []);
  const [page, setPage] = useState(0);
  smsJobs = Normalizer.Denormalize(smsJobs, [SmsJobScheme], entities);

  const changeStatus = (id, status) => {
    if (id && status) {
      changeSmsStatusRequest({
        id,
        status,
        cb: {
          success: () => {
            getSmsJobList({ page: 0, size: 10 });
            Swal.fire({
              title: t("Bajarildi"),
              icon: "success",
              confirmButtonText: t("Ortga"),
            });
          },
          fail: () => {
            Swal.fire({
              title: t("Bajarilmadi!"),
              icon: "error",
              confirmButtonText: t("Ortga"),
            });
          },
        },
      });
    }
  };

  const meta = {
    currentPage: currentPage + 1,
    perPage: size,
    totalCount: totalElements,
  };
  const handlePagination = (page) => {
    setPage(page - 1);
    getSmsJobList({ page: page - 1, size: 10 });
  };
  const handleChange = (value) => {
    getSmsJobList({ page: 0, size: 10, status: value });
  };

  return (
    <Col span={24} className="mt-2  ">
      <Row className="mb-3">
        <Button
          onClick={() => {
            handleChange(null);
          }}
        >
          {t("Barchasi")}
        </Button>
        <Button
          onClick={() => {
            handleChange("IN_PROCESS");
          }}
        >
          {t("Jo'natilayotganlar")}
        </Button>
        <Button
          onClick={() => {
            handleChange("STOPPED");
          }}
        >
          {t("To'xtatilganlar")}
        </Button>
        <Button
          onClick={() => {
            handleChange("COMPLETED");
          }}
        >
          {t("Tugatilganlar")}
        </Button>
      </Row>
      {!isFetched ? (
        <Loader />
      ) : (
        <Row justify="space-between">
          {smsJobs.map(
            ({
              id,
              title,
              status,
              category,
              errorCount,
              pendingCount,
              sentCount,
            }) => (
              <Col span={11} className="card p-4">
                <Row justify="middle" align="space-between">
                  <Col span={24}>
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        marginLeft: "20px",
                      }}
                    >
                      {title}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="pt-3">
                    <div>
                      <Text
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                        className="text-success"
                      >
                        {t("Jo'natildi")} :{sentCount}
                      </Text>
                      <Progress
                        percent={Math.round(
                          (sentCount /
                            (sentCount + pendingCount + errorCount)) *
                            100
                        )}
                      />
                    </div>
                    <div>
                      <Text
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                        className="text-info"
                      >
                        {t("Jo'natilmoqda")} :{pendingCount}
                      </Text>
                      <Progress
                        percent={Math.round(
                          (pendingCount /
                            (sentCount + pendingCount + errorCount)) *
                            100
                        )}
                      />
                    </div>
                    <div>
                      <Text
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                        className="text-danger"
                      >
                        {t("Jo'natilmadi")} :{errorCount}
                      </Text>
                      <Progress
                        percent={Math.round(
                          (errorCount /
                            (sentCount + pendingCount + errorCount)) *
                            100
                        )}
                        strokeColor="red"
                      />
                    </div>
                  </Col>
                </Row>
                <Row align="end" gutter={12} className="mt-4">
                  {status === "IN_PROCESS" ? (
                    <Col>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          changeStatus(id, "STOPPED");
                        }}
                      >
                        {t("Stop")}
                      </button>
                    </Col>
                  ) : status === "STOPPED" || status === "PENDING" ? (
                    <Col>
                      <button
                        onClick={() => {
                          changeStatus(id, "IN_PROCESS");
                        }}
                        type="button"
                        className="btn btn-primary"
                      >
                        {t("Start")}
                      </button>
                    </Col>
                  ) : (
                    status === "COMPLETED" && (
                      <div className="card p-2 bg-success">
                        {t("Completed")}
                      </div>
                    )
                  )}
                </Row>
              </Col>
            )
          )}
        </Row>
      )}
      {!isEmpty && <Pagination meta={meta} onChange={handlePagination} />}
    </Col>
  );
};

const mapStateToProps = (state) => {
  return {
    smsJobs: get(state, "normalize.data.sms-job-list.result.content", []),
    isEmpty: get(state, "normalize.data.sms-job-list.result.empty"),
    totalElements: get(
      state,
      "normalize.data.sms-job-list.result.totalElements",
      0
    ),
    currentPage: get(state, "normalize.data.sms-job-list.result.number", 0),
    size: get(state, "normalize.data.sms-job-list.result.size", 0),
    isFetched: get(state, "normalize.data.sms-job-list.isFetched", false),
    entities: get(state, "normalize.entities", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSmsJobList: (params) => {
      const storeName = "sms-job-list";
      const entityName = "smsJobScheme";
      const scheme = { content: [SmsJobScheme] };
      dispatch({
        type: ApiService.GET_ALL.TRIGGER,
        payload: {
          storeName,
        },
      });
      dispatch({
        type: ApiService.GET_ALL.REQUEST,
        payload: {
          url: "sms/sms/job-index",
          scheme,
          storeName,
          entityName,
          config: {
            params: {
              ...params,
            },
          },
        },
      });
    },
    changeSmsStatusRequest: ({ id, status, cb }) => {
      dispatch({
        type: Actions.CHANGE_SMS_JOB_STATUS.REQUEST,
        payload: { id, status, cb },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation("bhm_one")(SendSmsProcessContainer)));

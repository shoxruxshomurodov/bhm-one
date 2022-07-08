import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Drawer,
  notification,
  Statistic,
  Row,
  Col,
  PageHeader,
  Tabs,
  Tag,
  Typography,
  Alert,
} from "antd";
import { AiFillFileAdd, AiOutlineHistory } from "react-icons/ai";
import ApiActions from "../../../services/api/Actions";
import TaskScheme from "../../../schema/Task";
import { get, isEmpty, isEqual, isNil } from "lodash";
import Normalizer from "../../../services/normalizr";
import Loader from "../../../components/Loader";
import TaskApplyForm from "../component/TaskApply/TaskApplyForm";
import { withTranslation } from "react-i18next";
import moment from "moment";
import Files from "../component/Files/Files";
import CustomButton from "../component/CustomButton";
import History from "../component/History";
import config from "../../../config";

const { TabPane } = Tabs;
const { Text } = Typography;
function View(props) {
  const { t } = props;
  const { id } = useParams();
  const [isApplyDrawer, setApplyDrawer] = useState(false);
  const [transitionName, setTransitionName] = useState(null);
  const [transitionInfo, setTransitionInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isCloseTab, setIsCloseTab] = useState(true);
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetched = useSelector((state) =>
    get(state, "normalize.data.my-task-one.isFetched", false)
  );
  const resultList = useSelector((state) =>
    get(state, "normalize.data.my-task-one.result")
  );
  const items = Normalizer.Denormalize(resultList, TaskScheme, entities);
  const changeTab = (activeKey) => {
    if (isCloseTab || !isEqual(activeKey, activeTab)) {
      setActiveTab(activeKey);
    } else {
      setActiveTab(0);
    }
  };
  const getOne = () => {
    dispatch({
      type: ApiActions.GET_ONE.TRIGGER,
      payload: {
        storeName: "my-task-one",
        entityName: "task",
      },
    });
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/monitoring/process-task/${id}`,
        config: {
          params: {
            include:
              "request.loan.client,request.loan.region,request.loan.product,request.loan.branch,enabledTransitionsModelsApply,request.currentStatesModels.stateModel,request.process,parentTask,endTransition",
          },
        },
        scheme: TaskScheme,
        storeName: "my-task-one",
        entityName: "task",
      },
    });
  };
  console.log(get(items, "endTransition"), "endTransition");
  console.log(
    get(items, "enabledTransitionsModelsApply"),
    "enabledTransitionsModelsApply"
  );
  useEffect(() => {
    getOne();
  }, []);
  const creditTaskApplyWithOutCert = (attributes, formMethods) => {
    setIsLoading(true);
    dispatch({
      type: ApiActions.OPERATION_ADD.REQUEST,
      payload: {
        url: `/monitoring/process-task/apply/${id}`,
        attributes,
        formMethods,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Операция",
              placement: "topLeft",
            });
            setIsLoading(false);
            getOne();
            setApplyDrawer(false);
          },
          fail: (e) => {
            setIsLoading(false);
            const data = get(e, "response.data", []);
            data.map((item) => {
              notification["error"]({
                message: "Ошибка",
                description: item.message,
                placement: "topLeft",
              });
              return item;
            });
          },
        },
      },
    });
  };
  // const creditTaskApplyWithCert = (attributes, formMethods) => {
  //     request
  //         .get(`/credit/credit-request/cert-data/${get(creditRequest, "id")}`)
  //         .then((response) => {
  //             const {data} = response;
  //             sign(data, (signData, certInfo) => {
  //                 dispatch({
  //                     type: Actions.CREDIT_TASK_APPLY.REQUEST,
  //                     payload: {
  //                         attributes: {
  //                             ...attributes, signedMsg: signData,
  //                             certInfo: get(certInfo, "certinfo")
  //                         },
  //                         formMethods,
  //                         cb: {
  //                             success: (nData, data) => {
  //                                 notification["success"]({
  //                                     message: "Успешно",
  //                                     description: "Операция",
  //                                     placement: "topLeft"
  //                                 });
  //                                 setApplyDrawer(false);
  //                             },
  //                             fail: (e) => {
  //                                 const data = get(e, "response.data", []);
  //                                 data.map((item) => {
  //                                     notification["error"]({
  //                                         message: "Ошибка",
  //                                         description: item.message,
  //                                         placement: "topLeft"
  //                                     });
  //                                     return item;
  //                                 });
  //                             }
  //                         }
  //                     }
  //                 });
  //             });
  //         }).catch(e => {
  //         const message = get(e, "response.data[0].message");
  //         notification["error"]({
  //             message: message,
  //             placement: "topLeft"
  //         });
  //     });
  //
  // };
  const creditTaskApply = (attributes, formMethods) => {
    creditTaskApplyWithOutCert(attributes, formMethods);
  };
  const statesTags = get(
    items,
    "request.currentStatesModels",
    []
  ).map((item) => (
    <Tag
      color={
        isEqual(get(item, "stateModel.title"), "Удалено")
          ? config.STYLE["danger"]
          : config.STYLE[get(item, "stateModel.style")]
      }
    >
      {t(get(item, "stateModel.title"))}
    </Tag>
  ));
  if (!isFetched) {
    return <Loader />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <PageHeader
      tags={statesTags}
      title={`${t("Заявление")} №${get(
        items,
        "monitoring_process_request_id"
      )} от ${moment.unix(get(items, "created_at")).format("DD.MM.YYYY")} г.`}
      extra={
        get(items, "enabledTransitionsModelsApply") &&
        get(items, "enabledTransitionsModelsApply")?.map((item) => {
          return (
            <CustomButton
              type={get(item, "style") ?? "primary"}
              onClick={() => {
                setApplyDrawer(true);
                setTransitionName(get(item, "name"));
                setTransitionInfo({
                  title: get(item, "title"),
                  style: get(item, "style"),
                });
              }}
            >
              {get(item, "title")}
            </CustomButton>
          );
        })
      }
    >
      <Card>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={8}>
                <Statistic
                  title={t("ФИО")}
                  value={get(items, "request.loan.client.name", "---")}
                  formatter={(value) => value}
                  valueStyle={{ color: "rgb(63, 134, 0)", fontSize: "18px" }}
                />
                <Row>
                  <Col span={8}>
                    <Statistic
                      title={t("Inn")}
                      value={get(items, "request.loan.client.inn", "---")}
                      formatter={(value) => value}
                      valueStyle={{
                        color: "rgb(63, 134, 0)",
                        fontSize: "18px",
                      }}
                    />
                  </Col>
                  <Col span={10}>
                    <Statistic
                      title={t("Pnfl")}
                      value={get(items, "request.loan.client.pinfl", "---")}
                      precision={0}
                      formatter={(value) => value}
                      decimalSeparator={false}
                      valueStyle={{
                        color: "rgb(63, 134, 0)",
                        fontSize: "18px",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Statistic
                      title={t("Номер кредитного договора")}
                      value={get(items, "request.monitoring_loan_id", "---")}
                      formatter={(value) => value}
                      valueStyle={{
                        color: "rgb(63, 134, 0)",
                        fontSize: "18px",
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col
                    span={
                      get(items, "request.loan.region.name", "---")?.length > 20
                        ? 16
                        : 10
                    }
                  >
                    <Statistic
                      title={t("Кредитная регион")}
                      value={get(items, "request.loan.region.name", "---")}
                      precision={0}
                      formatter={(value) => value}
                      decimalSeparator={false}
                      valueStyle={{
                        color: "rgb(63, 134, 0)",
                        fontSize: "18px",
                      }}
                    />
                  </Col>
                  <Col
                    span={
                      !get(items, "request.loan.region.name", "---")?.length >
                      20
                        ? 8
                        : 14
                    }
                  >
                    <Statistic
                      title={t("Кредитная организация")}
                      value={`${get(
                        items,
                        "request.loan.branch.code",
                        "---"
                      )} ${get(items, "request.loan.branch.name", "---")}`}
                      precision={0}
                      formatter={(value) => value}
                      decimalSeparator={false}
                      valueStyle={{
                        color: "rgb(63, 134, 0)",
                        fontSize: "18px",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <Statistic
                      title={t("Кредитный продукт")}
                      value={get(items, "request.loan.product.name", "---")}
                      precision={0}
                      formatter={(value) => value}
                      decimalSeparator={false}
                      valueStyle={{
                        color: "rgb(63, 134, 0)",
                        fontSize: "18px",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={t("Process name")}
                      value={get(items, "request.process.name", "---")}
                      precision={0}
                      formatter={(value) => value}
                      decimalSeparator={false}
                      valueStyle={{
                        color: "rgb(63, 134, 0)",
                        fontSize: "18px",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Statistic
                      title={t("Client code")}
                      value={get(items, "request.loan.client_code", "---")}
                      precision={0}
                      formatter={(value) => value}
                      decimalSeparator={false}
                      valueStyle={{
                        color: "rgb(63, 134, 0)",
                        fontSize: "18px",
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      {isNil(get(items, "parentTask")) && <br />}
      {!isNil(get(items, "parentTask")) &&
        !isNil(get(items, "parentTask.end_comment")) && (
          <Row>
            <Col span={24} className={"my-2"}>
              <Alert
                message={`Комментарий : ${get(
                  items,
                  "parentTask.end_comment"
                )}`}
                type="error"
              />
            </Col>
          </Row>
        )}
      <Card className={"my-task-card"}>
        <Tabs
          activeKey={activeTab}
          onChange={changeTab}
          onTabClick={(active) => {
            changeTab(active);
            setIsCloseTab((prev) => !prev);
          }}
        >
          <TabPane
            tab={
              <>
                <AiFillFileAdd className={"mr-2"} />
                <Text>{t("Файлы")}</Text>
              </>
            }
            key="1"
          >
            <Files
              id={id}
              isReadOnly={isEmpty(get(items, "enabledTransitionsModelsApply"))}
              loadTask={getOne}
            />
          </TabPane>
          <TabPane
            tab={
              <>
                <AiOutlineHistory className={"mr-2"} />
                <Text>{t("История")}</Text>
              </>
            }
            key="2"
          >
            <History process_id={get(items, "monitoring_process_request_id")} />
          </TabPane>
        </Tabs>
      </Card>
      <Drawer
        title="Выполнить задачу"
        placement="top"
        visible={isApplyDrawer}
        width={1000}
        style={{
          zIndex: "99999",
        }}
        onClose={() => setApplyDrawer(false)}
      >
        <TaskApplyForm
          transitionInfo={transitionInfo}
          transition_name={transitionName}
          apply={creditTaskApply}
        />
      </Drawer>
    </PageHeader>
  );
}

export default withTranslation("bhm_one")(React.memo(View));

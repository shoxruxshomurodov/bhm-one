import React, { useEffect, useState } from "react";
import ReportScheme from "../../../schema/Report";
import { useParams } from "react-router";
import { get, isEmpty, isEqual, isNil, isObject } from "lodash";
import { Link, useHistory } from "react-router-dom";
import {
  Badge,
  Card,
  DatePicker,
  Input,
  notification,
  Select,
  Table,
  Tag,
} from "antd";
import { withTranslation } from "react-i18next";
import config from "../../../config";
import ApiActions from "../../../services/api/Actions";
import Region from "../../../schema/Regions";
import { useDispatch, useSelector } from "react-redux";
import Normalizer from "../../../services/normalizr";
import Structure from "../../../schema/Structure";
import Hat from "../../../components/Hat/Hat";
import Toolbar from "../../../components/Toolbar";
import { RiFileExcel2Fill } from "react-icons/all";
import { ReloadOutlined } from "@ant-design/icons";
import SkeletonLoader from "../../../components/Loader";
import ApiService from "../ApiService";
import WorkflowProcess from "../../../schema/WorkflowProcess";
import WorkflowState from "../../../schema/WorkflowState";
import { Tabs } from "antd";
import tableExport from "antd-table-export";
import WorkflowTab from "../../../schema/WorkflowTab";
import { decode, encode } from "js-base64";
import axios from "axios";

function ListPage(props) {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const { t } = props;
  let { encoded } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const setState = () => {
    let newEncoded = encoded;
    if (!isNil(newEncoded) && newEncoded && !isObject(newEncoded)) {
      newEncoded = newEncoded && decode(newEncoded);
      newEncoded = newEncoded && JSON.parse(newEncoded);
      return newEncoded;
    } else {
      return {
        "filter[pin_id]": null,
        "filter[org_id]": null,
        "filter[created_date]": null,
        "filter[updated_date]": null,
        "filter[client_name]": null,
        "filter[process_id]": null,
        "filter[region_id]": null,
        "filter[id]": null,
        "filter[state_id]": null,
      };
    }
  };
  const [values, setValues] = useState(setState());
  const [isActive, setIsActive] = useState(false);
  const [additions, setAdditions] = useState({
    page: 1,
    pageSize: 20,
    params: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const [tabId, setTabId] = useState();
  const [isCloseTab, setIsCloseTab] = useState(true);
  const checkUrlEncode = () => {
    const { page, pageSize } = additions;
    if (!isNil(encoded) && encoded && !isObject(encoded)) {
      encoded = decode(encoded);
      encoded = JSON.parse(encoded);
      setAdditions((state) => ({
        ...state,
        page: get(encoded, "page"),
        "per-page": get(encoded, "per-page"),
      }));
      getData({
        page: get(encoded, "page"),
        "per-page": get(encoded, "per-page"),
        ...encoded,
      });
    } else {
      getData({ page, "per-page": pageSize });
    }
  };
  const changeUrl = (urlParams) => {
    const { page } = additions;
    let argumentsUrl = { page, ...urlParams };
    argumentsUrl = encode(JSON.stringify(argumentsUrl));
    getData({ ...urlParams });
    history.push(`/monitoring/report/${argumentsUrl}`);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(event)
  };

  const onPress = () => {
    let params = {};
    Object.entries(values).map(([key, value]) => {
      if (!isNil(value)) {
        return (params = { ...params, [key]: value });
      }
    });
    if (!isNil(encoded) && encoded && !isObject(encoded)) {
      encoded = encoded && decode(encoded);
      encoded = encoded && JSON.parse(encoded);
      changeUrl({ ...params, ...encoded });
    }
    changeUrl({ ...params });
  };

  const entities = useSelector((state) => get(state, "normalize.entities"));

  //Data
  let data = useSelector((state) =>
    get(state, `normalize.data.report-list.result`)
  );
  data = get(
    Normalizer.Denormalize(data, { data: [ReportScheme] }, entities),
    "data"
  );
  const isFetched = useSelector((state) =>
    get(state, `normalize.data.report-list.isFetched`, false)
  );
  let meta = useSelector((state) =>
    get(state, `normalize.data.report-list.result._meta`, {})
  );

  //Tabs
  const tabList = useSelector((state) =>
    get(state, "normalize.data.workflow-tab-list.result")
  );
  const resultTabList = Normalizer.Denormalize(
    tabList,
    { data: [WorkflowTab] },
    entities
  );
  const tabs = get(resultTabList, "data", []);

  //Regions
  const regionState = useSelector((state) =>
    get(state, "normalize.data.region-list.result", [])
  );
  let regions = Normalizer.Denormalize(
    regionState,
    { data: [Region] },
    entities
  );
  regions = get(regions, "data", []);
  //Regions

  //Structure
  const structureState = useSelector((state) =>
    get(state, "normalize.data.structure-list.result")
  );
  const structureIsFetched = useSelector((state) =>
    get(state, "normalize.data.structure-list.isFetched", false)
  );
  const structureData = Normalizer.Denormalize(
    structureState,
    { data: [Structure] },
    entities
  );
  const structuresList = get(structureData, "data", []);
  //Structure

  //Workflow
  const resultList = useSelector((state) =>
    get(state, "normalize.data.workflow-process-list.result")
  );
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [WorkflowProcess] },
    entities
  );
  const resultProcess = get(resultListData, "data", []);
  //States
  const resulStatetList = useSelector((state) =>
    get(state, "normalize.data.workflow-state-list.result")
  );
  const resultListStateData = Normalizer.Denormalize(
    resulStatetList,
    { data: [WorkflowState] },
    entities
  );
  const resultStateData = get(resultListStateData, "data", []);

  //pagination
  const pagination = {
    current: get(meta, "currentPage"),
    pageSize: get(meta, "perPage"),
    total: get(meta, "totalCount"),
  };

  const handleTableChange = (pagination) => {
    const { current: page, pageSize } = pagination;
    setAdditions((state) => ({ ...state, page, pageSize }));
    if (!isNil(encoded) && encoded && !isObject(encoded)) {
      encoded = encoded && decode(encoded);
      encoded = encoded && JSON.parse(encoded);
      console.log(encoded, "encoded handleTableChange");
      changeUrl({ ...encoded, "per-page": pageSize, page });
    } else {
      changeUrl({ "per-page": pageSize, page });
    }
  };

  //Get Data
  const getData = (params) => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "report-list",
        entityName: "report-list",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/monitoring/process-report`,
        config: {
          params: {
            include: "creditTaskLast,state,type,region,struct",
            ...params,
          },
        },
        scheme: { data: [ReportScheme] },
        storeName: "report-list",
        entityName: "report-list",
      },
    });
  };
  //Get Data

  //GetTabs
  const getTabs = (params) => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "workflow-tab-list",
        entityName: "workflowTab",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/monitoring/process-tab`,
        config: {
          params: {
            include: "states,taskCount",
            ...params,
          },
        },
        scheme: { data: [WorkflowTab] },
        storeName: "workflow-tab-list",
        entityName: "workflowTab",
      },
    });
  };
  //GetTabs
  //Get Regions
  const getRegions = (params) => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "region-list",
        entityName: "region",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `monitoring/structure`,
        config: {
          params: {
            "per-page": 100,
            "filter[type]": 5,
            ...params,
          },
        },
        scheme: {
          data: [Region],
        },
        storeName: "region-list",
        entityName: "region",
      },
    });
  };
  //Get Regions
  //GetWorkflow
  const getDataMonitoringProcess = () => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "workflow-process-list",
        entityName: "workflowProcess",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/monitoring/process`,
        config: {
          params: {
            include: "transition,state",
          },
        },
        scheme: { data: [WorkflowProcess] },
        storeName: "workflow-process-list",
        entityName: "workflowProcess",
      },
    });
  };
  //GetWorkflow
  //GetStates
  const getStates = () => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "workflow-state-list",
        entityName: "workflowState",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `workflow/state`,
        config: {
          params: {},
        },
        scheme: { data: [WorkflowState] },
        storeName: "workflow-state-list",
        entityName: "workflowState",
      },
    });
  };
  //GetStates
  //Get Structures
  const getStructures = (params) => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "structure-list",
        entityName: "structure",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `monitoring/structure`,
        config: {
          params: {
            "per-page": 500,
            "filter[type]": 1,
            ...params,
          },
        },
        scheme: {
          data: [Structure],
        },
        storeName: "structure-list",
        entityName: "structure",
      },
    });
  };
  //Get Structures
  //Reload data
  const onSync = async () => {
    const url = "/monitoring/process-report/refresh-report1";
    setIsLoading(true);
    ApiService.refreshReport(url, {})
      .then((res) => {
        notification["success"]({
          message: "Успешно",
          description: "Данные успешно синхронизированы",
          placement: "topRight",
        });
        setIsLoading(false);
      })
      .catch((e) => {
        const error = get(e, "response.data.message");
        notification["error"]({
          message: "Ошибка",
          description: error,
          placement: "topRight",
        });
        setIsLoading(false);
      });
  };
  //Reload data
  //Clear Filter
  const clearFilter = () => {
    setValues({
      "filter[pin_id]": null,
      "filter[org_id]": null,
      "filter[created_date]": null,
      "filter[updated_date]": null,
      "filter[client_name]": null,
      "filter[process_id]": null,
      "filter[region_id]": null,
      "filter[state_id]": null,
      "filter[id]": null,
      "filter[client_id]": null,
      "filter[startedby_name]": null,
    });
    getData({ page: 1, "per-page": 20 });
    history.push("/monitoring/report");
    setActiveTab(get(tabs, "data[0].id") ?? "23");
  };
  //Clear Filter
  //Tab
  const changeTab = (activeKey = get(tabs, "data[0].id")) => {
    if (isCloseTab || !isEqual(activeKey, activeTab)) {
      setActiveTab(activeKey);
    } else {
      setActiveTab(0);
    }
  };

  useEffect(() => {
    checkUrlEncode();
    getRegions();
    getStructures();
    getDataMonitoringProcess();
    getStates();
    getTabs();
  }, []);

  useEffect(() => {
    if (!isNil(get(values, "filter[region_id]"))) {
      getStructures({
        "filter[region_id]": get(values, "filter[region_id]"),
      });
    }
  }, [get(values, "filter[region_id]")]);

  const columns = [
    {
      titleShort: t("ID"),
      title: (
        <div>
          <div>{t("ID")}</div>
          <Input
            placeholder={t("ID")}
            name="filter[id]"
            value={get(values, "filter[id]")}
            onChange={handleChange}
            onPressEnter={onPress}
          />
        </div>
      ),
      dataIndex: "id",
      align: "center",
      key: "id",
    },
    {
      titleShort: t("Область"),
      title: (
        <div>
          <div>{t("Область")}</div>
          <Select
            style={{ width: "100%" }}
            name="filter[region_id]"
            placeholder={t("Select Region")}
            onChange={(value) => {
              if (isNil(value)) {
                setValues({
                  ...values,
                  "filter[org_id]": null,
                  "filter[region_id]": value,
                });
              }
              setValues({
                ...values,
                "filter[region_id]": value,
              });
              changeUrl({ "filter[region_id]": value, tab_id: tabId });
            }}
            value={get(values, "filter[region_id]")}
          >
            <Option value={null}>{t("Все")}</Option>
            {regions &&
              regions.map((region) => {
                return (
                  <Option value={get(region, "uid")}>
                    {get(region, "title")}
                  </Option>
                );
              })}
          </Select>
        </div>
      ),
      dataIndex: "parent_org_title",
      key: "parent_org_title",
      align: "left",
    },
    {
      titleShort: t("Org title"),
      title: (
        <div>
          <div>{t("Org title")}</div>
          <Select
            style={{ width: "100%" }}
            name="filter[org_id]"
            placeholder={t("Select Org")}
            onChange={(value) => {
              setValues({
                ...values,
                "filter[org_id]": value,
              });
              changeUrl({ "filter[org_id]": value });
            }}
            disabled={
              isNil(get(values, "filter[region_id]")) || !structureIsFetched
            }
            value={
              isNil(get(values, "filter[region_id]"))
                ? null
                : get(values, "filter[org_id]")
            }
          >
            <Option value={null}>{t("Все")}</Option>
            {structuresList &&
              structuresList.map((structure) => {
                return (
                  <Option value={get(structure, "id")}>
                    {get(structure, "title")}
                  </Option>
                );
              })}
          </Select>
        </div>
      ),
      dataIndex: "org_title",
      key: "org_title",
      align: "center",
      render: (props, data) => {
        return (
          <div>
            <p style={{ padding: "0", margin: "0" }}>{get(data, "org_code")}</p>
            {get(data, "org_title")}
          </div>
        );
      },
    },
    {
      titleShort: t("PNFL"),
      title: (
        <div>
          <div>{t("PNFL")}</div>
          <Input
            placeholder={t("PNFL")}
            name="filter[pin_id]"
            value={get(values, "filter[pin_id]")}
            onChange={handleChange}
            onPressEnter={(e) => {
              !isEmpty(e.target.value) && onPress();
            }}
          />
        </div>
      ),
      dataIndex: "pin_id",
      key: "pin_id",
      align: "center",
    },
    {
      titleShort: t("Client Name"),
      title: (
        <div>
          <div>{t("Client Name")}</div>
          <Input
            placeholder={t("Client Name")}
            name="filter[client_name]"
            value={get(values, "filter[client_name]")}
            onChange={handleChange}
            onPressEnter={(e) => {
              !isEmpty(e.target.value) && onPress();
            }}
          />
        </div>
      ),
      dataIndex: "client_name",
      key: "client_name",
      align: "center",
      render: (props, data) => {
        return (
          <Link
            onClick={() =>
              history.push(
                `/monitoring/my-task/view/${get(data, "creditTaskLast.id")}`
              )
            }
          >
            {get(data, "client_name")}
          </Link>
        );
      },
    },
    {
      titleShort: t("State"),
      title: (
        <div>
          <div>{t("State")}</div>
          <Select
            style={{ width: "100%" }}
            name="filter[state_id]"
            placeholder={t("Select State")}
            onChange={(value) => {
              if (isNil(value)) {
                setValues({
                  ...values,
                  "filter[state_id]": value,
                });
              }
              setValues({
                ...values,
                "filter[state_id]": value,
              });
              changeUrl({ "filter[state_id]": value, tabId: tabId });
            }}
            value={get(values, "filter[state_id]")}
          >
            <Option value={null}>{t("Все")}</Option>
            {resultStateData &&
              resultStateData.map((state) => {
                return (
                  <Option value={get(state, "id")}>
                    {get(state, "title")}
                  </Option>
                );
              })}
          </Select>
        </div>
      ),
      dataIndex: "state_title",
      key: "state_title",
      align: "center",
      render: (props, data, index) => {
        return (
          <Tag
            color={
              isEqual(get(data, "state.title"), "Удалено")
                ? config.STYLE["danger"]
                : config.STYLE[get(data, "state.style")]
            }
          >
            {get(data, "state_title")}
          </Tag>
        );
      },
    },

    {
      titleShort: t("Process Name"),
      title: (
        <div>
          <div>{t("Process Name")}</div>
          <Select
            style={{ width: "100%" }}
            name="filter[process_id]"
            placeholder={t("Select Process")}
            onChange={(value) => {
              if (isNil(value)) {
                setValues({
                  ...values,
                  "filter[process_id]": value,
                });
              }
              setValues({
                ...values,
                "filter[process_id]": value,
              });
              changeUrl({ "filter[process_id]": value });
            }}
            value={get(values, "filter[process_id]")}
          >
            <Option value={null}>{t("Все")}</Option>
            {resultProcess &&
              resultProcess.map((process) => {
                return (
                  <Option value={get(process, "id")}>
                    {get(process, "name")}
                  </Option>
                );
              })}
          </Select>
        </div>
      ),
      dataIndex: "process_name",
      key: "process_name",
      align: "center",
    },
    {
      titleShort: t("Started by"),
      title: (
        <div>
          <div>{t("Started by")}</div>
          <Input
            placeholder={t("Started By")}
            name="filter[startedby_name]"
            value={get(values, "filter[startedby_name]")}
            onChange={handleChange}
            onPressEnter={onPress}
          />
        </div>
      ),
      dataIndex: "startedby_name",
      key: "startedby_name",
      align: "center",
    },
    {
      titleShort: t("Started at"),
      title: (
        <div>
          <div>{t("Started at")}</div>
          <DatePicker
            style={{ width: "100%" }}
            name="filter[created_date]"
            onChange={(date) => {
              setValues({
                ...values,
                "filter[created_date]": date,
              });
              changeUrl({ "filter[created_date]": date });
            }}
            value={get(values, "filter[created_date]")}
          />
        </div>
      ),
      dataIndex: "started_at",
      key: "started_at",
      align: "center",
    },
  ];
  const columnsExcel = [
    {
      titleShort: t("ID"),
      title: (
        <div>
          <div>{t("ID")}</div>
          <Input
            placeholder={t("ID")}
            name="filter[id]"
            value={get(values, "filter[id]")}
            onChange={handleChange}
            onPressEnter={onPress}
          />
        </div>
      ),
      dataIndex: "id",
      align: "center",
      key: "id",
    },
    {
      titleShort: t("Область"),
      title: (
        <div>
          <div>{t("Область")}</div>
          <Select
            style={{ width: "100%" }}
            name="filter[region_id]"
            placeholder={t("Select Region")}
            onChange={(value) => {
              if (isNil(value)) {
                setValues({
                  ...values,
                  "filter[org_id]": null,
                  "filter[region_id]": value,
                });
              }
              setValues({
                ...values,
                "filter[region_id]": value,
              });
              changeUrl({ "filter[region_id]": value, tab_id: tabId });
            }}
            value={get(values, "filter[region_id]")}
          >
            <Option value={null}>{t("Все")}</Option>
            {regions &&
              regions.map((region) => {
                return (
                  <Option value={get(region, "uid")}>
                    {get(region, "title")}
                  </Option>
                );
              })}
          </Select>
        </div>
      ),
      dataIndex: "parent_org_title",
      key: "parent_org_title",
      align: "left",
    },
    {
      titleShort: t("Org title"),
      title: (
        <div>
          <div>{t("Org title")}</div>
          <Select
            style={{ width: "100%" }}
            name="filter[org_id]"
            placeholder={t("Select Org")}
            onChange={(value) => {
              setValues({
                ...values,
                "filter[org_id]": value,
              });
              changeUrl({ "filter[org_id]": value });
            }}
            disabled={
              isNil(get(values, "filter[region_id]")) || !structureIsFetched
            }
            value={
              isNil(get(values, "filter[region_id]"))
                ? null
                : get(values, "filter[org_id]")
            }
          >
            <Option value={null}>{t("Все")}</Option>
            {structuresList &&
              structuresList.map((structure) => {
                return (
                  <Option value={get(structure, "id")}>
                    {get(structure, "title")}
                  </Option>
                );
              })}
          </Select>
        </div>
      ),
      dataIndex: "org_title",
      key: "org_title",
      align: "center",
      render: (props, data) => {
        return (
          <div>
            <p style={{ padding: "0", margin: "0" }}>{get(data, "org_code")}</p>
            {get(data, "org_title")}
          </div>
        );
      },
    },
    {
      titleShort: t("PNFL"),
      title: (
        <div>
          <div>{t("PNFL")}</div>
          <Input
            placeholder={t("PNFL")}
            name="filter[pin_id]"
            value={get(values, "filter[pin_id]")}
            onChange={handleChange}
            onPressEnter={(e) => {
              !isEmpty(e.target.value) && onPress();
            }}
          />
        </div>
      ),
      dataIndex: "pin_id",
      key: "pin_id",
      align: "center",
    },
    {
      titleShort: t("Client Name"),
      title: (
        <div>
          <div>{t("Client Name")}</div>
          <Input
            placeholder={t("Client Name")}
            name="filter[client_name]"
            value={get(values, "filter[client_name]")}
            onChange={handleChange}
            onPressEnter={(e) => {
              !isEmpty(e.target.value) && onPress();
            }}
          />
        </div>
      ),
      dataIndex: "client_name",
      key: "client_name",
      align: "center",
      render: (props, data) => {
        return (
          <Link
            onClick={() =>
              history.push(
                `/monitoring/my-task/view/${get(data, "creditTaskLast.id")}`
              )
            }
          >
            {get(data, "client_name")}
          </Link>
        );
      },
    },
    {
      titleShort: t("State"),
      title: (
        <div>
          <div>{t("State")}</div>
          <Select
            style={{ width: "100%" }}
            name="filter[state_id]"
            placeholder={t("Select State")}
            onChange={(value) => {
              if (isNil(value)) {
                setValues({
                  ...values,
                  "filter[state_id]": value,
                });
              }
              setValues({
                ...values,
                "filter[state_id]": value,
              });
              changeUrl({ "filter[state_id]": value, tabId: tabId });
            }}
            value={get(values, "filter[state_id]")}
          >
            <Option value={null}>{t("Все")}</Option>
            {resultStateData &&
              resultStateData.map((state) => {
                return (
                  <Option value={get(state, "id")}>
                    {get(state, "title")}
                  </Option>
                );
              })}
          </Select>
        </div>
      ),
      dataIndex: "state_title",
      key: "state_title",
      align: "center",
      render: (props, data, index) => {
        return (
          <Tag
            color={
              isEqual(get(data, "state.title"), "Удалено")
                ? config.STYLE["danger"]
                : config.STYLE[get(data, "state.style")]
            }
          >
            {get(data, "state_title")}
          </Tag>
        );
      },
    },

    {
      titleShort: t("Process Name"),
      title: (
        <div>
          <div>{t("Process Name")}</div>
          <Select
            style={{ width: "100%" }}
            name="filter[process_id]"
            placeholder={t("Select Process")}
            onChange={(value) => {
              if (isNil(value)) {
                setValues({
                  ...values,
                  "filter[process_id]": value,
                });
              }
              setValues({
                ...values,
                "filter[process_id]": value,
              });
              changeUrl({ "filter[process_id]": value });
            }}
            value={get(values, "filter[process_id]")}
          >
            <Option value={null}>{t("Все")}</Option>
            {resultProcess &&
              resultProcess.map((process) => {
                return (
                  <Option value={get(process, "id")}>
                    {get(process, "name")}
                  </Option>
                );
              })}
          </Select>
        </div>
      ),
      dataIndex: "process_name",
      key: "process_name",
      align: "center",
    },
    {
      titleShort: t("Started by"),
      title: (
        <div>
          <div>{t("Started by")}</div>
          <Input
            placeholder={t("Started By")}
            name="filter[startedby_name]"
            value={get(values, "filter[startedby_name]")}
            onChange={handleChange}
            onPressEnter={onPress}
          />
        </div>
      ),
      dataIndex: "startedby_name",
      key: "startedby_name",
      align: "center",
    },
    {
      titleShort: t("Started at"),
      title: (
        <div>
          <div>{t("Started at")}</div>
          <DatePicker
            style={{ width: "100%" }}
            name="filter[created_date]"
            onChange={(date) => {
              setValues({
                ...values,
                "filter[created_date]": date,
              });
              changeUrl({ "filter[created_date]": date });
            }}
            value={get(values, "filter[created_date]")}
          />
        </div>
      ),
      dataIndex: "started_at",
      key: "started_at",
      align: "center",
    },
    {
      titleShort: t("Client ID"),
      dataIndex: "client_id",
      key: "client_id",
      align: "center",
    },
    {
      titleShort: t("INN"),
      dataIndex: "inn",
      key: "inn",
      align: "center",
    },
    {
      titleShort: t("Loan ID"),
      dataIndex: "loan_id",
      key: "loan_id",
      align: "center",
    },
  ];
  const handleClick = () => {
    encoded = encoded && decode(encoded);
    encoded = encoded && JSON.parse(encoded);
    setIsLoading(true);
    axios
      .get(`${config.API_ROOT}/monitoring/process-report`, {
        params: {
          ...encoded,
          ...get(additions, "params"),
          "per-page": "all",
        },
      })
      .then((res) => {
        notification["success"]({
          message: "Успешно",
          description: "загружено",
          placement: "topRight",
        });
        setIsLoading(false);
        const columnsExcelShort = columnsExcel.map((column) => {
          return {
            title: column.titleShort,
            dataIndex: column.dataIndex,
            key: column.key,
            width: 300,
          };
        });
        const exportInstance = new tableExport(
          get(res, "data.data"),
          columnsExcelShort
        );
        exportInstance.download("excelExport", "xlsx");
      })
      .catch((e) => {
        notification["error"]({
          message: "Ошибка",
          description: get(e, "response.data.message"),
          placement: "topRight",
        });
        setIsLoading(false);
      });
  };
  return (
    <div className={"page-content"}>
      <Hat name={"Report"} desc={"Поиск, создание, изменение и удаление"} />
      <Toolbar classname={"mx-2 mb-2 mt-2"}>
        <div className={"flex d-inline-flex justify-content-end"}>
          <div>
            <button
              className="btn btn-primary no-border  ml-2"
              type="button"
              onClick={clearFilter}
            >
              <span className="d-flex text-white">{t("Очистить фильтр")}</span>
            </button>
            <button
              className="btn btn-warning no-border  ml-2"
              type="button"
              onClick={onSync}
            >
              <ReloadOutlined className={"text-white mr-2"} />
              <span className="d-flex text-white">
                {"Синхронизировать дата"}
              </span>
            </button>
            <button
              className="btn btn-white no-border  ml-2"
              type="button"
              onClick={handleClick}
            >
              <span className="mr-2">
                <RiFileExcel2Fill color="#1D6F42" size={18} />
              </span>
              {t(" Export Excel")}
            </button>
          </div>
        </div>
      </Toolbar>
      <div className="site-layout-background col-md-12">
        <Card className={"my-task-card"}>
          <Tabs
            activeKey={activeTab}
            onChange={(activeKey) => {
              encoded = encoded && decode(encoded);
              encoded = encoded && JSON.parse(encoded);
              setTabId(activeKey);
              changeUrl({
                ...encoded,
                tab_id: activeKey,
                page: "1",
                "per-page": get(pagination, "pageSize"),
              });
            }}
            onTabClick={(active) => {
              changeTab(active);
              setIsCloseTab((prev) => !prev);
            }}
            tabBarGutter={0}
          >
            {tabs.map((tab) => {
              return (
                <TabPane
                  tab={
                    <Badge
                      count={get(tab, "taskCount")}
                      overflowCount={999999999}
                    >
                      <Card className={`bg-${get(tab, "style")} rounded-0`}>
                        <div className="px-2">{get(tab, "name")}</div>
                      </Card>
                    </Badge>
                  }
                  key={get(tab, "id")}
                >
                  {!isFetched || isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <Table
                      columns={columns}
                      dataSource={data}
                      rowClassName={(record, index) =>
                        get(record, "id") === isActive ? "row-active" : ""
                      }
                      pagination={pagination}
                      onChange={handleTableChange}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: (event) => {
                            setIsActive(get(record, "id"));
                          }, // click row
                        };
                      }}
                    />
                  )}
                </TabPane>
              );
            })}
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

export default withTranslation("bhm_one")(ListPage);

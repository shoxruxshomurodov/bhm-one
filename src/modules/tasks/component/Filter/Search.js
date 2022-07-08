import React, { useEffect, useState } from "react";
import { Badge, Button, Col, DatePicker, Input, Row, Select } from "antd";
import { withTranslation } from "react-i18next";
import { get, isNil } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Normalizer from "../../../../services/normalizr";
import ApiActions from "../../../../services/api/Actions";
import Region from "../../../../schema/Regions";
import Structure from "../../../../schema/Structure";
import WorkflowProcess from "../../../../schema/WorkflowProcess";
import WorkflowState from "../../../../schema/WorkflowState";
import config from "../../../../config";
function Search(props) {
  const [values, setValues] = useState({
    "search[pin_id]": null,
    "search[org_id]": null,
    "search[created_date]": null,
    "search[updated_date]": null,
    "search[client_name]": null,
    "search[process_id]": null,
    "search[region_id]": null,
    "search[loan_id]": null,
    "search[state_id]": null,
  });
  const dispatch = useDispatch();
  const { Option } = Select;
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const onSearch = () => {
    let { filterByColumn } = props;
    let params = {};
    Object.entries(values).map(([key, value]) => {
      if (!isNil(value)) {
        return (params = { ...params, [key]: value });
      }
    });
    filterByColumn(params);
  };
  const clearFilter = () => {
    const { isClearFilter } = props;
    setValues({
      "search[pin_id]": null,
      "search[org_id]": null,
      "search[created_date]": null,
      "search[updated_date]": null,
      "search[client_name]": null,
      "search[process_id]": null,
      "search[region_id]": null,
      "search[loan_id]": null,
      "search[state_id]": null,
    });
    isClearFilter();
  };
  const entities = useSelector((state) => get(state, "normalize.entities"));
  //region structures
  const regionState = useSelector((state) =>
    get(state, "normalize.data.region-list.result", [])
  );
  let regions = Normalizer.Denormalize(
    regionState,
    { data: [Region] },
    entities
  );
  regions = get(regions, "data", []);
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
  //region structures

  // Monitoring process
  const resultList = useSelector((state) =>
    get(state, "normalize.data.workflow-process-list.result")
  );
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [WorkflowProcess] },
    entities
  );
  const resultProcess = get(resultListData, "data", []);
  // Monitoring process
  const resulStatetList = useSelector((state) =>
    get(state, "normalize.data.workflow-state-list.result")
  );
  const resultListStateData = Normalizer.Denormalize(
    resulStatetList,
    { data: [WorkflowState] },
    entities
  );
  const resultStateData = get(resultListStateData, "data", []);

  const getRegions = () => {
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

  //endregion
  useEffect(() => {
    getRegions();
    getDataMonitoringProcess();
    getStates();
  }, []);
  useEffect(() => {
    if (!isNil(get(values, "search[region_id]"))) {
      getStructures({
        "filter[region_id]": get(values, "search[region_id]"),
      });
    }
  }, [get(values, "search[region_id]")]);
  const { t, excelExport, totalCount, isFetched } = props;
  return (
    <>
      <Row>
        <Col span={12}>
          <Row className="mb-2 align-items-center">
            <Col span={6} className="text-right pr-1">
              <label>{t("ПНФЛ")} :</label>
            </Col>
            <Col span={12}>
              <Input
                name="search[pin_id]"
                value={get(values, "search[pin_id]")}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col className="text-right pr-1" span={6}>
              <label>{t("Region")} : </label>
            </Col>
            <Col span={12}>
              <Select
                style={{ width: "100%" }}
                name="search[region_id]"
                placeholder="Выберите region"
                onChange={(value) => {
                  if (isNil(value)) {
                    setValues({
                      ...values,
                      "search[org_id]": null,
                      "search[region_id]": value,
                    });
                  }
                  setValues({
                    ...values,
                    "search[region_id]": value,
                  });
                }}
                value={get(values, "search[region_id]")}
              >
                <Option value={null}>Все</Option>
                {regions &&
                  regions.map((region) => {
                    return (
                      <Option value={get(region, "uid")}>
                        {get(region, "title")}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col span={6} className="text-right pr-1">
              <label>{t("МФО")} :</label>
            </Col>
            <Col span={12}>
              <Select
                style={{ width: "100%" }}
                name="search[org_id]"
                placeholder="Выберите МФО"
                onChange={(value) => {
                  setValues({
                    ...values,
                    "search[org_id]": value,
                  });
                }}
                disabled={
                  isNil(get(values, "search[region_id]")) || !structureIsFetched
                }
                value={
                  isNil(get(values, "search[region_id]"))
                    ? null
                    : get(values, "search[org_id]")
                }
              >
                <Option value={null}>Все</Option>
                {structuresList &&
                  structuresList.map((structure) => {
                    return (
                      <Option value={get(structure, "uid")}>
                        {get(structure, "title")}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col span={6} className="text-right pr-1">
              <label>{t("Дата создания от")} : </label>
            </Col>
            <Col span={12}>
              <DatePicker
                style={{ width: "100%" }}
                name="search[created_date]"
                format={"YYYY-MM-DD"}
                onChange={(date) => {
                  setValues({
                    ...values,
                    "search[created_date]": date,
                  });
                }}
                value={get(values, "search[created_date]")}
              />
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col span={6} className="text-right pr-1">
              <label>{t("Дата обновлена до")} : </label>
            </Col>
            <Col span={12}>
              <DatePicker
                style={{ width: "100%" }}
                name="search[updated_date]"
                onChange={(date) => {
                  setValues({
                    ...values,
                    "search[updated_date]": date,
                  });
                }}
                value={get(values, "search[updated_date]")}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="mb-2 align-items-center">
            <Col span={6} className="text-right pr-1">
              <label>{t("Имя клиента")} : </label>
            </Col>
            <Col span={12}>
              <Input
                name="search[client_name]"
                value={get(values, "search[client_name]")}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col span={6} className="text-right pr-1">
              <label>{t("Loan ID")} : </label>
            </Col>
            <Col span={12}>
              <Input
                name="search[loan_id]"
                value={get(values, "search[loan_id]")}
                onChange={handleChange}
              />
            </Col>
          </Row>
          {/* Data soz */}
          <Row className="mb-2 align-items-center">
            <Col className="text-right pr-1" span={6}>
              <label>{t("Process")} : </label>
            </Col>
            <Col span={12}>
              <Select
                style={{ width: "100%" }}
                name="search[process_id]"
                placeholder="Выберите Process"
                onChange={(value) => {
                  if (isNil(value)) {
                    setValues({
                      ...values,
                      "search[process_id]": value,
                    });
                  }
                  setValues({
                    ...values,
                    "search[process_id]": value,
                  });
                }}
                value={get(values, "search[process_id]")}
              >
                <Option value={null}>Все</Option>
                {resultProcess &&
                  resultProcess.map((process) => {
                    return (
                      <Option value={get(process, "id")}>
                        {get(process, "name")}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col span={6} className="text-right pr-1">
              <label>{t("States")} :</label>
            </Col>
            <Col span={12}>
              <Select
                style={{ width: "100%" }}
                name="search[state_id]"
                placeholder="Выберите State"
                onChange={(value) => {
                  if (isNil(value)) {
                    setValues({
                      ...values,
                      "search[state_id]": value,
                    });
                  }
                  setValues({
                    ...values,
                    "search[state_id]": value,
                  });
                }}
                value={get(values, "search[state_id]")}
              >
                <Option value={null}>Все</Option>
                {resultStateData &&
                  resultStateData.map((state) => {
                    return (
                      <Option
                        value={get(state, "id")}
                        // style={{
                        //   color: config.STYLE[get(state, "style")],
                        // }}
                      >
                        {get(state, "title")}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={3} />
        <Col span={10}>
          <Button
            type="primary"
            onClick={() => {
              onSearch();
            }}
            className="mr-1"
          >
            {t("Поиск")}
          </Button>
          <Button className="mr-1" onClick={() => clearFilter()}>
            {t("Сброс")}
          </Button>
          <Button onClick={excelExport}>{t("Экспорт в Ехсел (XLS)")}</Button>
        </Col>
        <Col push={8}>
          {isFetched && (
            <Badge
              className="site-badge-count-109"
              count={`Общее количество элемент : ${totalCount}`}
              style={{ backgroundColor: "#1890ff" }}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default withTranslation("bhm_one")(Search);

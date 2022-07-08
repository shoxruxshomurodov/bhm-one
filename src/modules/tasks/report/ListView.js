import React, { useState, useEffect } from "react";
import { notification, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { get, isNil, isObject } from "lodash";
import { withTranslation } from "react-i18next";
import ApiActions from "../../../services/api/Actions";
import { decode, encode } from "js-base64";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import tableExport from "antd-table-export";
import config from "../../../config";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import Normalizer from "../../../services/normalizr";
import ApiService from "../ApiService";

function ListView(props) {
  let { encoded } = useParams();
  console.log(encoded, "encoded");
  const history = useHistory();
  const [additions, setAdditions] = useState({
    page: 1,
    pageSize: 20,
    params: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const { columns, scheme, storeName, CustomFilter } = props;
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  let data = useSelector((state) =>
    get(state, `normalize.data.${storeName}.result`, [])
  );
  console.log(data, "data");
  const isFetched = useSelector((state) =>
    get(state, `normalize.data.${storeName}.isFetched`, false)
  );
  let meta = useSelector((state) =>
    get(state, `normalize.data.${storeName}.result._meta`, {})
  );
  data = get(Normalizer.Denormalize(data, scheme, entities), "data", []);
  const checkUrlEncode = () => {
    let { params } = props;
    const { page, pageSize } = additions;
    if (!isNil(encoded) && encoded && !isObject(encoded)) {
      encoded = decode(encoded);
      encoded = JSON.parse(encoded);
      setAdditions((state) => ({
        ...state,
        page: get(encoded, "page"),
        "per-page": get(encoded, "per-page"),
      }));
      getAllList({
        ...encoded,
        page: get(encoded, "page"),
        "per-page": get(encoded, "per-page"),
      });
    } else {
      getAllList({ page, "per-page": pageSize, ...params });
    }
  };
  const changeUrl = (urlParams) => {
    let { params, customUrl = null } = props;
    const { page } = additions;
    let argumentsUrl = { page, ...urlParams };
    argumentsUrl = encode(JSON.stringify(argumentsUrl));
    getAllList({ ...params, ...urlParams });
    history.push(`${customUrl}/${argumentsUrl}`);
  };
  const pagination = {
    current: get(meta, "currentPage"),
    pageSize: get(meta, "perPage"),
    total: get(meta, "totalCount"),
  };
  const getAllList = (params = {}) => {
    const { storeName, entityName, url, params: OwnParams, scheme } = props;
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName,
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url,
        config: {
          params: {
            ...params,
            ...OwnParams,
          },
        },
        scheme,
        storeName,
        entityName,
      },
    });
  };
  const handleTableChange = (pagination) => {
    const { current: page, pageSize } = pagination;
    setAdditions((state) => ({ ...state, page, pageSize }));
    encoded = encoded && decode(encoded);
    encoded = encoded && JSON.parse(encoded);
    changeUrl({ ...encoded, "per-page": pageSize, page });
  };
  const filterByColumn = (params) => {
    encoded = encoded && decode(encoded);
    encoded = encoded && JSON.parse(encoded);
    setAdditions((state) => ({ ...state, params }));
    changeUrl({
      ...params,
      page: get(encoded, "page") ? get(encoded, "page") : 1,
      "per-page": get(encoded, "per-page") ? get(encoded, "per-page") : 20,
    });
  };
  const isClearFilter = () => {
    let { customUrl, params } = props;
    setAdditions({ page: 1, pageSize: 20, params: {} });
    history.push(`${customUrl}`);
    getAllList({ page: 1, "per-page": 20, ...params });
  };
  const handleClick = () => {
    encoded = encoded && decode(encoded);
    encoded = encoded && JSON.parse(encoded);
    setIsLoading(true);
    const { url } = props;
    axios
      .get(`${config.API_ROOT}${url}`, {
        params: {
          // ...OwnParams,
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
        const exportInstance = new tableExport(get(res, "data.data"), columns);
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
  useEffect(() => {
    checkUrlEncode();
  }, []);
  return (
    <>
      <CustomFilter
        isClearFilter={isClearFilter}
        excelExport={handleClick}
        filterByColumn={filterByColumn}
        encoded={encoded}
        totalCount={get(meta, "totalCount")}
        isFetched={isFetched}
        onSync={onSync}
      />
      {isFetched && !isLoading ? (
        <>
          <Table
            pagination={pagination}
            dataSource={data}
            onChange={handleTableChange}
            style={{
              // width: "100%",
              marginTop: "15px",
              zIndex: "-99",
            }}
            scroll={{ x: true }}
            columns={columns}
          />
        </>
      ) : (
        <SkeletonLoader />
      )}
    </>
  );
}

export default withTranslation("bhm_one")(ListView);

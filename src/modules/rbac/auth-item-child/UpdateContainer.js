import * as React from "react";
import { useEffect } from "react";
import ApiActions from "../../../services/api/Actions";
import AuthItemChildScheme from "../../../schema/AuthItemChild";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import Normalizer from "../../../services/normalizr";
import Loader from "../../../components/Loader";
import { UpdateForm } from "./UpdateForm";
import { notification } from "antd";
import AuthItemScheme from "../../../schema/AuthItem";

export function UpdateContainer({ parent, child }) {
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.auth-item-child-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.auth-item-child-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(
    resultOne,
    AuthItemChildScheme,
    entities
  );
  const resultList = useSelector((state) =>
    get(state, "normalize.data.auth-item-list.result")
  );
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [AuthItemScheme] },
    entities
  );
  const resultData = get(resultListData, "data", []);
  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/rbac/auth-item-child/${parent}/${child}`,
        scheme: AuthItemChildScheme,
        storeName: "auth-item-child-update-one",
        entityName: "authItemChild",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/rbac/auth-item-child/${parent}/${child}`;
    const storeName = "auth-item-child-create";
    const entityName = "authItem";
    dispatch({
      type: ApiActions.OPERATION_UPDATE.REQUEST,
      payload: {
        parent,
        child,
        url,
        attributes,
        formMethods,
        storeName,
        entityName,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Изменено",
              placement: "topLeft",
            });
          },
          fail: (e) => {
            const data = get(e, "response.data", []);
            data.map((item) => {
              notification["error"]({
                message: "Ошибка",
                description: item.message,
                placement: "topLeft",
              });
            });
          },
        },
      },
    });
  };

  const getAuthItemData = () => {
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/rbac/auth-item`,
        config: {
          params: {
            "per-page": 100,
          },
        },
        scheme: { data: [AuthItemScheme] },
        storeName: "auth-item-list",
        entityName: "authItem",
      },
    });
  };

  useEffect(() => {
    getData();
    getAuthItemData();
  }, []);

  if (isFetchedOne) {
    return <Loader />;
  }
  return (
    <UpdateForm
      attributes={dataOne}
      auth_item_list={resultData}
      update={update}
    />
  );
}

import * as React from "react";
import { useEffect } from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import get from "lodash/get";
import Normalizer from "../../../services/normalizr";
import ApiActions from "../../../services/api/Actions";
import AuthItemScheme from "../../../schema/AuthItem";
import AuthItemChildScheme from "../../../schema/AuthItemChild";
import Loader from "../../../components/Loader";
export function CreateContainer({ getData }) {
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const resultList = useSelector((state) =>
    get(state, "normalize.data.auth-item-list.result")
  );

  const isFetchedList = useSelector((state) =>
    get(state, "normalize.data.auth-item-list.isFetched", false)
  );

  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [AuthItemScheme] },
    entities
  );
  const resultData = get(resultListData, "data", []);
  const create = (attributes, formMethods) => {
    const url = "/rbac/auth-item-child";
    const storeName = "auth-item-child-create";
    const entityName = "authItem";
    const scheme = AuthItemChildScheme;
    dispatch({
      type: ApiActions.OPERATION_ADD.REQUEST,
      payload: {
        url,
        storeName,
        entityName,
        scheme,
        attributes,
        formMethods,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Создано",
              placement: "topRight",
            });
            getData();
          },
          fail: (e) => {
            const data = get(e, "response.data", []);
            data.map((item) => {
              notification["error"]({
                message: "Ошибка",
                description: item.message,
                placement: "topRight",
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
    getAuthItemData();
  }, []);

  return !isFetchedList ? (
    <Loader />
  ) : (
    <CreateForm create={create} auth_item_list={resultData} />
  );
}

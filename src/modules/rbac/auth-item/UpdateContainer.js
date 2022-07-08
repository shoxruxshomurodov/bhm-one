import * as React from "react";
import { useEffect } from "react";
import ApiActions from "../../../services/api/Actions";
import AuthItemScheme from "../../../schema/AuthItem";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import Normalizer from "../../../services/normalizr";
import Loader from "../../../components/Loader";
import { UpdateForm } from "./UpdateForm";
import { notification } from "antd";
export function UpdateContainer({ id }) {
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.auth-item-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.auth-item-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(resultOne, AuthItemScheme, entities);
  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/rbac/auth-item/${id}`,
        scheme: AuthItemScheme,
        storeName: "auth-item-update-one",
        entityName: "authItem",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/rbac/auth-item/${id}`;
    const storeName = "auth-item-update";
    const entityName = "authItem";
    const scheme = AuthItemScheme;
    dispatch({
      type: ApiActions.OPERATION_UPDATE.REQUEST,
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

  useEffect(() => {
    getData();
  }, []);

  if (!isFetchedOne) {
    return <Loader />;
  }

  return <UpdateForm attributes={dataOne} update={update} />;
}

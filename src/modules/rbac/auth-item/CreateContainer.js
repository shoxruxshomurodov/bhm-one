import * as React from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch } from "react-redux";
import actions from "./../../../services/api/Actions";
import { notification } from "antd";
import get from "lodash/get";
import AuthItemScheme from "../../../schema/AuthItem";
export function CreateContainer({ getData, setOpenCreateForm }) {
  const dispatch = useDispatch();
  const create = (attributes, formMethods) => {
    const url = "/rbac/auth-item";
    const storeName = "auth-item-create";
    const entityName = "authItem";
    const scheme = AuthItemScheme;
    dispatch({
      type: actions.OPERATION_ADD.REQUEST,
      payload: {
        url,
        attributes,
        storeName,
        entityName,
        scheme,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Создано",
              placement: "topRight",
            });
            getData({ page: 1 });
            setOpenCreateForm(false);
            formMethods.setSubmitting(false);
          },
          fail: (e) => {
            const message = get(e, "response.data[0].message", "");
            notification["error"]({
              message: "Ошибка",
              description: message,
              placement: "topRight",
            });
            formMethods.setSubmitting(false);
          },
        },
      },
    });
  };

  return <CreateForm create={create} />;
}

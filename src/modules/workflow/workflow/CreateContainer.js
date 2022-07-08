import * as React from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch } from "react-redux";
import ApiActions from "./../../../services/api/Actions";
import { notification } from "antd";
import get from "lodash/get";
import Workflow from "../../../schema/Workflow";

export function CreateContainer({ getData, setOpenCreateForm }) {
  const dispatch = useDispatch();
  const create = (attributes, formMethods) => {
    const url = `/workflow/workflow`;
    const scheme = Workflow;
    const storeName = "workflow-type-create";
    const entityName = "workflowType";
    dispatch({
      type: ApiActions.OPERATION_ADD.REQUEST,
      payload: {
        url,
        scheme,
        storeName,
        entityName,
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
            formMethods.setSubmitting(false);
            setOpenCreateForm(false);
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

  return (
    <div>
      <CreateForm create={create} />
    </div>
  );
}

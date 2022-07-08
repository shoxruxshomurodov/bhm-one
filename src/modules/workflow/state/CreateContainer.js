import * as React from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch } from "react-redux";
import ApiActions from "./../../../services/api/Actions";
import { notification } from "antd";
import get from "lodash/get";
import WorkflowState from "../../../schema/WorkflowState";
export function CreateContainer({ setOpenCreateForm, getData }) {
  const dispatch = useDispatch();

  const create = (attributes, formMethods) => {
    const url = `workflow/state`;
    const scheme = WorkflowState;
    const storeName = "workflow-state-create";
    const entityName = "workflowState";
    dispatch({
      type: ApiActions.OPERATION_ADD.REQUEST,
      payload: {
        url,
        scheme,
        storeName,
        entityName,
        attributes,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Создано",
              placement: "topRight",
            });
            setOpenCreateForm(false);
            getData();
            formMethods.setSubmitting(false);
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

  return <CreateForm create={create} />;
}

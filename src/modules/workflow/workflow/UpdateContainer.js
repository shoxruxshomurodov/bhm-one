import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { usePrevious } from "react-use";
import { UpdateForm } from "./UpdateForm";
import ApiActions from "./../../../services/api/Actions";
import { notification } from "antd";
import Loader from "../../../components/Loader";
import Workflow from "../../../schema/Workflow";
import Normalizer from "../../../services/normalizr";
export function UpdateContainer({ id, setOpenUpdateForm }) {
  const prevId = usePrevious(id);
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.workflow-type-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.workflow-type-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(resultOne, Workflow, entities);

  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/workflow/workflow/${id}`,
        scheme: Workflow,
        storeName: "workflow-type-update-one",
        entityName: "workflowType",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/workflow/workflow/${id}`;
    const scheme = Workflow;
    const storeName = "workflow-type-update-one";
    const entityName = "workflowType";
    dispatch({
      type: ApiActions.OPERATION_UPDATE.REQUEST,
      payload: {
        url,
        scheme,
        storeName,
        entityName,
        id,
        attributes,
        formMethods,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Изменено",
              placement: "topLeft",
            });
            setOpenUpdateForm(false);
            formMethods.setSubmitting(false);
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

  useEffect(() => {
    if (!isEqual(prevId, id) && isFetchedOne) {
      getData();
    }
  });

  if (!isFetchedOne) {
    return <Loader />;
  }

  return (
    <div>
      <UpdateForm attributes={dataOne} update={update} />
    </div>
  );
}

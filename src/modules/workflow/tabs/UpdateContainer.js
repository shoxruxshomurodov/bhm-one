import * as React from "react";
import {useEffect} from "react";
import ApiActions from "../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import {usePrevious} from "react-use";
import {UpdateForm} from "./UpdateForm";
import {notification} from "antd";
import Normalizer from "../../../services/normalizr";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import workflowProcessProduct from "../../../schema/WorkflowProcessProduct";
import WorkflowState from "../../../schema/WorkflowState";
import WorkflowTab from "../../../schema/WorkflowTab";

export function UpdateContainer({id, getAll, setOpenUpdateForm}) {
       const prevId = usePrevious(id);
       const dispatch = useDispatch();
       const entities = useSelector((state) => get(state, "normalize.entities"));

       const isFetchedOne = useSelector((state) =>
           get(state, "normalize.data.workflow-tab-update-one.isFetched")
       );
       const resultOne = useSelector((state) =>
           get(state, "normalize.data.workflow-tab-update-one.result")
       );
       const isFetchedList = useSelector((state) =>
           get(state, "normalize.data.workflow-state-list.isFetched")
       );
       const resultList = useSelector((state) =>
           get(state, "normalize.data.workflow-state-list.result")
       );
       const resultListData = Normalizer.Denormalize(
           resultList,
           {data: [WorkflowState]},
           entities
       );
       const resultData = get(resultListData, "data", []);
       const dataOne = Normalizer.Denormalize(resultOne, WorkflowTab, entities);

       const getOne = () => {
              dispatch({
                     type: ApiActions.GET_ONE.REQUEST,
                     payload: {
                            url: `/monitoring/process-tab/${id}`,
                            config: {},
                            scheme: WorkflowTab,
                            storeName: "workflow-tab-update-one",
                            entityName: "workflowTab",
                     },
              });
       };
       const update = (attributes, formMethods) => {
              const url = `/monitoring/process-tab/${id}`;
              const storeName = "workflow-tab-update-one";
              const entityName = "workflowTab";
              const scheme =WorkflowTab;
              dispatch({
                     type: ApiActions.OPERATION_UPDATE.REQUEST,
                     payload: {
                            url,
                            storeName,
                            entityName,
                            scheme,
                            attributes,
                            cb: {
                                   success: (nData, data) => {
                                          notification["success"]({
                                                 message: "Успешно",
                                                 description: "Изменено",
                                                 placement: "topLeft",
                                          });
                                          getAll();
                                          setOpenUpdateForm(false);
                                          formMethods.setSubmitting(false)
                                   },
                                   fail: (e) => {
                                          formMethods.setSubmitting(false);
                                          const data = get(e, "response.data", []);
                                          data.map((item) => {
                                                 notification["error"]({
                                                        message: "Ошибка",
                                                        description: item.message,
                                                        placement: "topLeft",
                                                 });
                                          });
                                          getAll();
                                   },
                            },
                     },
              });
       };

       const getWorkflow = () => {
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
                            scheme: {data: [WorkflowState]},
                            storeName: "workflow-state-list",
                            entityName: "workflowState",
                     },
              });
       };

       useEffect(() => {
              getOne();
              getWorkflow();
       }, []);

       useEffect(() => {
              if (!isEqual(prevId, id) && isFetchedOne) {
                     getOne();
              }
       });

       if (!isFetchedOne && isFetchedList ) {
              return <SkeletonLoader/>;
       }
       return (
           <UpdateForm attributes={dataOne}  state_list={resultData} update={update}/>
       );
}

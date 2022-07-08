import {Button, Card, Col, notification, Row, Typography, Divider} from "antd";
import {get,isEqual} from "lodash";
import React from "react";
import {useEffect,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SkeletonLoader from "../../../../components/SkeletonLoader/SkeletonLoader";
import WorkflowProcess from "../../../../schema/WorkflowProcess";
import ApiActions from "../../../../services/api/Actions";
import Normalizer from "../../../../services/normalizr";
import {CaretRightOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
function MonitoringProcessContainer({
                                        client_id,
                                    }) {
    const {Title, Text} = Typography;
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading,setIsLoading] = useState(false)
    const [active,setActive] = useState(false)
    const entities = useSelector((state) => get(state, "normalize.entities"));
    const isFetchedList = useSelector((state) =>
        get(state, "normalize.data.workflow-process-list.isFetched", true)
    );
    const resultList = useSelector((state) =>
        get(state, "normalize.data.workflow-process-list.result")
    );
    const resultListData = Normalizer.Denormalize(
        resultList,
        {data: [WorkflowProcess]},
        entities
    );
    const resultData = get(resultListData, "data", []);
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
                scheme: {data: [WorkflowProcess]},
                storeName: "workflow-process-list",
                entityName: "workflowProcess",
            },
        });
    };

    const changeProcessHandle = (attributes) => {
        setIsLoading(true)
        const url = "/monitoring/process-request";
        const storeName = "workflow-process-add";
        const entityName = "workflowProcess";
        const scheme = WorkflowProcess;
        dispatch({
            type: ApiActions.OPERATION_ADD.REQUEST,
            payload: {
                url,
                storeName,
                entityName,
                scheme,
                attributes,
                cb: {
                    success: (normalizedData, data) => {
                        setIsLoading(false)
                        notification["success"]({
                            message: "Успешно",
                            description: "Принято",
                            placement: "topLeft",
                        });
                        history.push(`/monitoring/my-task/view/${get(data, "id")}`)
                    },
                    fail: (e) => {
                        setIsLoading(false)
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
        getDataMonitoringProcess();
    }, []);
    if (!isFetchedList) {
        return <SkeletonLoader/>;
    }
    return (
        <Row>
            {resultData.map((item,index) => (
                <Col span={10}
                     key={get(item, "id")}
                     className={"mr-4"}
                >
                    <Card className="d-flex flex-column align-items-center">
                        <Title className={"text-center"} level={3}>{get(item, "name")}</Title>
                        <Divider/>
                        <Text>{get(item, "description")}</Text>
                        <Divider/>
                        <Button
                            type="primary"
                            block
                            loading={isLoading && isEqual(active,get(item, "id"))}
                            className={"d-flex justify-content-center align-items-center"}
                            icon={<CaretRightOutlined/>}
                            onClick={() => {
                                setActive(get(item, "id"))
                                changeProcessHandle({
                                    monitoring_loan_id: client_id,
                                    monitoring_process_id: get(item, "id"),
                                })
                            }
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default MonitoringProcessContainer;

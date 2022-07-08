import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Input,Select } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

const {Option} = Select;
export function CreateForm({ create,workflowList,processList }) {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    return (
        <Formik
            initialValues={{
                workflow_id: "",
                monitoring_process_id:""
            }}
            onSubmit={(values, actions) => {
                create(values, actions);
            }}
        >
            {({
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                setFieldValue
              }) => {
                if(isSubmitting) {
                    return <SkeletonLoader />
                }
                return (
                    <>
                        <Form {...layout} onFinish={handleSubmit}>
                            <Form.Item
                                name="workflow_id"
                                label="Workflow"
                                hasFeedback={get(errors, "workflow_id", []).length > 0}
                                validateStatus={
                                    get(errors, "workflow_id", []).length > 0 ? "error" : ""
                                }
                                help={
                                    get(errors, "workflow_id", []).length > 0
                                        ? errors.workflow_id && touched.workflow_id && errors.workflow_id
                                        : null
                                }
                            >
                                <Select value={values.workflow_id} placeholder={"Workflow"} onChange={value => setFieldValue("workflow_id",value)}>
                                    {workflowList && workflowList.map(workflow => {
                                        return (
                                            <Option value={get(workflow,"id")}>{get(workflow,"title")}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="monitoring_process_id"
                                label="Process"
                                hasFeedback={get(errors, "monitoring_process_id", []).length > 0}
                                validateStatus={
                                    get(errors, "monitoring_process_id", []).length > 0 ? "error" : ""
                                }
                                help={
                                    get(errors, "monitoring_process_id", []).length > 0
                                        ? errors.monitoring_process_id && touched.monitoring_process_id && errors.monitoring_process_id
                                        : null
                                }
                            >
                                <Select placeholder={"Monitoring process"} onChange={value => setFieldValue("monitoring_process_id",value)}>
                                    {processList && processList.map(process => {
                                        return (
                                            <Option value={get(process,"id")}>{get(process,"name")}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item className="text-center">
                                <Button type="primary" htmlType="submit">
                                    Создать
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
}

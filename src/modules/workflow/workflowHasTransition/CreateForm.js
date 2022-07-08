import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Select } from "antd";
import get from "lodash/get";

import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

const { Option } = Select;
export function CreateForm({ create, workflowType, transition_list }) {
  console.log(get(workflowType), "workflowType");
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Formik
      initialValues={{
        workflow_id: "",
        transition_id: "",
      }}
      onSubmit={(values, actions) => {
        create(values, actions);
        form.resetFields();
      }}
    >
      {({
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
        isSubmitting,
      }) => {
        if (isSubmitting) {
          return <SkeletonLoader />;
        }
        return (
          <>
            <Form {...layout} onFinish={handleSubmit} form={form}>
              <Form.Item
                name="workflow_id"
                label="Workflow"
                hasFeedback={get(errors, "workflow_id", []).length > 0}
                validateStatus={
                  get(errors, "workflow_id", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "workflow_id", []).length > 0
                    ? errors.workflow_id &&
                      touched.workflow_id &&
                      errors.workflow_id
                    : null
                }
              >
                <Select
                  placeholder="Workflow Type"
                  onChange={(value) => setFieldValue("workflow_id", value)}
                >
                  {workflowType &&
                    workflowType.map((item) => (
                      <Select.Option value={get(item, "id")}>
                        {get(item, "name")}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="transition_id"
                label="Transition"
                hasFeedback={get(errors, "transition_id", []).length > 0}
                validateStatus={
                  get(errors, "transition_id", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "transition_id", []).length > 0
                    ? errors.transition_id &&
                      touched.transition_id &&
                      errors.transition_id
                    : null
                }
              >
                <Select
                  placeholder="Workflow Transition"
                  onChange={(value) => setFieldValue("transition_id", value)}
                >
                  {transition_list &&
                    transition_list.map((item) => (
                      <Select.Option value={get(item, "id")}>
                        {get(item, "name")}
                      </Select.Option>
                    ))}
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

import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Select } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

export function UpdateForm({
  attributes = {},
  update,
  workflow_list,
  transition_list,
}) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Formik
      initialValues={{
        ...attributes,
      }}
      onSubmit={(values, actions) => {
        update(values, actions);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
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
                    ? errors.workflow_id &&
                      touched.workflow_id &&
                      errors.workflow_id
                    : null
                }
              >
                <Select
                  defaultValue={{ value: get(values, "workflow_id") }}
                  labelInValue
                  value={get(values, "workflow_id")}
                  onChange={(data) => setFieldValue("workflow_id", data.value)}
                >
                  {workflow_list.map((item) => (
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
                  defaultValue={{ value: get(values, "transition_id") }}
                  labelInValue
                  value={get(values, "transition_id")}
                  onChange={(data) =>
                    setFieldValue("transition_id", data.value)
                  }
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
                  Изменить
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

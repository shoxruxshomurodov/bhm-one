import * as React from "react";
import { Formik } from "formik";
import { Button, Checkbox, Form, Select } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

const { Option } = Select;

export function UpdateForm({
  attributes = {},
  update,
  state_list,
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
                name="state_id"
                label="State"
                hasFeedback={get(errors, "state_id", []).length > 0}
                validateStatus={
                  get(errors, "state_id", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "state_id", []).length > 0
                    ? errors.state_id && touched.state_id && errors.state_id
                    : null
                }
              >
                <Select
                  placeholder="Choose state"
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  value={values.value}
                  defaultValue={values.state_id}
                  onChange={(value) => setFieldValue("state_id", value)}
                >
                  {state_list &&
                    state_list.map((state) => (
                      <Option value={get(state, "id")}>
                        {get(state, "title")}
                      </Option>
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
                  placeholder="Choose transition"
                  showArrow={true}
                  value={values.value}
                  onChange={(value) => setFieldValue("transition_id", value)}
                  defaultValue={values.transition_id}
                >
                  {transition_list &&
                    transition_list.map((transition) => (
                      <Option value={get(transition, "id")}>
                        {get(transition, "title")}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="is_parallel"
                label="?????????????????????"
                hasFeedback={get(errors, "is_parallel", []).length > 0}
                validateStatus={
                  get(errors, "is_parallel", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "is_parallel", []).length > 0
                    ? errors.is_parallel &&
                      touched.is_parallel &&
                      errors.is_parallel
                    : null
                }
              >
                <Checkbox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.is_parallel}
                  defaultChecked={values.is_parallel}
                  disabled={isSubmitting}
                >
                  ???????????????????????
                </Checkbox>
              </Form.Item>
              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit">
                  ????????????????
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

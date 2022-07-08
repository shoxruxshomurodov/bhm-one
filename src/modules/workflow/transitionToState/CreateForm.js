import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Select } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import { useEffect } from "react";
export function CreateForm({ create, state_list, transaction_list }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Formik
      initialValues={{
        transition_id: null,
        state_id: null,
      }}
      onSubmit={(values, actions) => {
        create(values, actions);
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
            <Form {...layout} onFinish={handleSubmit}>
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
                  placeholder="Transition"
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  notFoundContent={null}
                  value={values.value}
                  name="transition_id"
                  onChange={(value) => setFieldValue("transition_id", value)}
                >
                  {transaction_list &&
                    transaction_list.map((item) => (
                      <Select.Option value={get(item, "id")}>
                        {get(item, "name")}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

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
                  placeholder="States"
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  notFoundContent={null}
                  value={values.value}
                  onChange={(value) => setFieldValue("state_id", value)}
                >
                  {state_list &&
                    state_list.map((item) => (
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

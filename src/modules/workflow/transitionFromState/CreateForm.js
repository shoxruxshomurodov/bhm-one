import * as React from "react";
import { Formik } from "formik";
import { Button, Checkbox, Form, Select } from "antd";
import get from "lodash/get";
import SelectAsyncPaginate from "../../../components/AsyncSelect/AsyncSelect";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
const { Option } = Select;
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
        is_parallel: false,
      }}
      onSubmit={(values, actions) => {
        create(values, actions);
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
                  placeholder="States"
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  notFoundContent={null}
                  value={values.value}
                  onChange={(value) => setFieldValue("state_id", value)}
                  name="state_id"
                >
                  {state_list &&
                    state_list.map((item) => (
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
                    ? errors.transaction_id &&
                      touched.transaction_id &&
                      errors.transaction_id
                    : null
                }
              >
                {/* <SelectAsyncPaginate
                  url="/monitoring/transaction"
                  name="title"
                  placeholder="Choose transition"
                  onChange={(value) => setFieldValue("transition_id", value.id)}
                /> */}
                <Select
                  placeholder="Transition"
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  notFoundContent={null}
                  value={values.value}
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
                name="is_parallel"
                label="Параллеьно?"
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
                  Параллельно?
                </Checkbox>
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

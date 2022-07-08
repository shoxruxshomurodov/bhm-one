import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Select } from "antd";
import get from "lodash/get";
import SelectAsyncPaginate from "../../../components/AsyncSelect/AsyncSelect";
const { Option } = Select;
export function CreateForm({ create, auth_item_list, auth_user_list }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Formik
      initialValues={{
        user_id: null,
        item_name: null,
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
        return (
          <>
            <Form {...layout} onFinish={handleSubmit}>
              <Form.Item
                name="user_id"
                label="User"
                hasFeedback={get(errors, "user_id", []).length > 0}
                validateStatus={
                  get(errors, "user_id", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "user_id", []).length > 0
                    ? errors.user_id && touched.user_id && errors.user_id
                    : null
                }
              >
                {/* <SelectAsyncPaginate
									url="/auth/user/"
									name="phone"
									placeholder="User"
									onChange={(value) => setFieldValue('user_id', value.id)}
								/> */}
                <Select
                  showSearch
                  placeholder="User"
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  notFoundContent={null}
                  value={values.value}
                  onChange={(value) => setFieldValue("user_id", value)}
                >
                  {auth_user_list &&
                    auth_user_list.map((item) => (
                      <Option value={get(item, "user_id")}>
                        {get(item, "phone")}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="item_name"
                label="Item name"
                hasFeedback={get(errors, "item_name", []).length > 0}
                validateStatus={
                  get(errors, "item_name", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "item_name", []).length > 0
                    ? errors.item_name && touched.item_name && errors.item_name
                    : null
                }
              >
                <Select
                  showSearch
                  placeholder="Item name"
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  notFoundContent={null}
                  value={values.value}
                  onChange={(value) => setFieldValue("item_name", value)}
                >
                  {auth_item_list &&
                    auth_item_list.map((item) => (
                      <Option value={get(item, "name")}>
                        {get(item, "name")}
                      </Option>
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

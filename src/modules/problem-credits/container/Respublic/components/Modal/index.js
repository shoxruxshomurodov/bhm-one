import React from "react";
import { Modal, Input } from "antd";

const { TextArea } = Input;
const index = (props) => {
  const { visible, onOk = () => {}, onCancel, onChange, loan_id } = props;
  return (
    <>
      <Modal
        title="Юристга қайтариб юбориш"
        visible={visible}
        onOk={() => onOk(loan_id)}
        onCancel={onCancel}
        okText="қайтариб юбориш"
        cancelText="Бекор қилиш"
      >
        <TextArea
          placeholder="қўшимча изоҳ учун...."
          maxLength="200"
          rows={4}
          showCount
          className="mt-2"
          onChange={onChange}
          required
        />
      </Modal>
    </>
  );
};

export default index;

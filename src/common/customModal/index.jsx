import React, { useState } from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(props.showModal);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = (e) => {
      console.log(e);
    setIsModalVisible(false);
  };

  return (
      <Modal
        centered
        title={props.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={props.destroyOnClose}
      >
        <p>Some contents...</p>
      </Modal>
  );
};

export default CustomModal;

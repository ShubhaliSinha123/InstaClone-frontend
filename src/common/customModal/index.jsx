import {Modal } from 'antd';
import { useEffect, useState } from 'react';

const CustomModal = (props) => {
const [isModalVisible, setisModalVisible] = useState(false);

useEffect(() => {
    setisModalVisible(props.showModal);
    console.log(props.data);
}, [props.showModal, props.data]);

const cancelHandler = () => {
    setisModalVisible(false);
};

    return (
       <Modal title={props.title}
       centered
       visible= {isModalVisible}
       onCancel={cancelHandler}
       >
           <>
           <label htmlFor='email'>Email:</label><br />
               <input type="text" id="email" />
               </>
       </Modal>

    )
};

export default CustomModal;
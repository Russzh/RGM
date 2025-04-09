import React from "react";
import { Modal } from "antd";

import { IDialogProps } from "./Dialog.types";
import styles from "./Dialog.module.scss";

const { hiddenCancelButton, okButton, cancelButton } = styles;

const Dialog: React.FC<IDialogProps> = ({
  title,
  children,
  isConfirmModal = false,
  buttonsText,
  onCancelClick,
  onOkClick,
}) => {
  return (
    <Modal
      title={title}
      open
      centered
      width={600}
      keyboard
      destroyOnClose
      maskClosable={false}
      cancelText={buttonsText.cancelText}
      cancelButtonProps={{
        className: isConfirmModal ? hiddenCancelButton : cancelButton,
      }}
      onCancel={onCancelClick}
      okText={buttonsText.okText}
      onOk={onOkClick}
      okButtonProps={{ className: okButton }}
    >
      <div>{children}</div>
    </Modal>
  );
};

export { Dialog };

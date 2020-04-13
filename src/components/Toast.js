import React from "react";
import cx from "classnames";
import styles from "../css/Toast.module.css";
import { ReactComponent as SuccessIcon } from "../assets/icons/check.svg";

function Toast(props) {
  return (
    <div
      className={cx(styles.toast, {
        [styles.success]: props.type === "success",
        [styles.warn]: props.type === "warn",
        [styles.danger]: props.type === "danger",
      })}
    >
      <SuccessIcon className={styles.icon} />

      <div className={styles.message}>{props.message}</div>
    </div>
  );
}

export default Toast;

import React from "react";
import cx from 'classnames'
import styles from "../css/Toast.module.css"

function Toast(props){
    return (<div className={cx(styles.toast,{[styles.success]:props.type==='success'})}>{props.message}</div>)
}

export default Toast;
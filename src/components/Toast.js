import React from "react";
import cx from 'classnames'
import styles from "../css/Toast.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
} from "@fortawesome/free-solid-svg-icons";

function Toast(props){
    return (<div className={cx(styles.toast,{[styles.success]:props.type==='success',[styles.warn]:props.type==='warn',[styles.danger]:props.type==='danger'})}>
        <div>
        <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.icon}
                
                />

        </div>
        <div className={styles.message}>
        {props.message}
        </div>
        </div>)
}

export default Toast;
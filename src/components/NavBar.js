import React from 'react';
import styles from "../css/NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars, faEdit,
    faTrashAlt,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import cx from 'classnames'



function NavBar(props) {

    return <header className={styles.bar}>
        <FontAwesomeIcon
            icon={faBars}
            className={styles.optionBtn}
            onClick={props.onSidebarToggle}
        />
        <div className={styles.optionBtnGroup}>
            <FontAwesomeIcon
                icon={faTrashAlt}
                className={cx(styles.optionBtn,{[styles.optionBtnDeactivated]:!props.activeID})}
                onClick={props.onItemDelete}
            />

            <FontAwesomeIcon
                icon={faSave}
                className={cx(styles.optionBtn,{[styles.optionBtnDeactivated]: !props.saveEnabled })}
                onClick={props.onSave}
            />
            <FontAwesomeIcon
                icon={faEdit}
                className={cx(styles.optionBtn,{[styles.optionBtnDeactivated]:!(props.items[0]?.title||props.items[0]?.contents || !props.activeID)})}
                onClick={()=>{(props.items[0]?.title||props.items[0]?.contents || !props.activeID) ? props.onItemCreate() : (()=>{})()}}
            />

        </div>


    </header>
}

export default NavBar;
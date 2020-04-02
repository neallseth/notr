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
    function getComposeButton() {
        if (props.items.length) {
            const { title, contents } = props.items[0];
            if (title || contents) {
                return (
                    <FontAwesomeIcon
                        icon={faEdit}
                        className={styles.optionBtn}
                        onClick={props.onItemCreate}
                    />
                );
            } else {
                return (
                    <FontAwesomeIcon
                        icon={faEdit}
                        className={styles.optionBtnDeactivated}
                    />
                );
            }
        } else {
            return (
                <FontAwesomeIcon
                    icon={faEdit}
                    className={styles.optionBtn}
                    onClick={props.onItemCreate}
                />
            );
        }
    }

    return <header className={styles.bar}>
        <FontAwesomeIcon
            icon={faBars}
            className={styles.optionBtn}
            onClick={props.onSidebarToggle}
        />
        <div className={styles.optionBtnGroup}>
            <FontAwesomeIcon
                icon={faTrashAlt}
                className={styles.optionBtn}
                onClick={props.onItemDelete}
            />

            <FontAwesomeIcon
                icon={faSave}
                className={cx({ [styles.optionBtn]: props.saveEnabled, [styles.optionBtnDeactivated]: !props.saveEnabled })}
                onClick={props.onSave}
            />
            {getComposeButton()}

        </div>


    </header>
}

export default NavBar;
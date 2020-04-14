import React from "react";
import styles from "../css/NavBar.module.css";
import cx from "classnames";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import { ReactComponent as SaveIcon } from "../assets/icons/save.svg";
import { ReactComponent as MenuIcon } from "../assets/icons/bars.svg";
import { ReactComponent as ComposeIcon } from "../assets/icons/compose.svg";

function NavBar(props) {
  return (
    <header className={styles.bar}>
      <MenuIcon className={styles.optionBtn} onClick={props.onSidebarToggle} />
      {/* <span className={styles.noteDetails}>
        {props.activeItem?.title ? props.activeItem.title : null}
      </span> */}
      <div className={styles.optionBtnGroup}>
        <TrashIcon
          className={cx(styles.optionBtn, {
            [styles.optionBtnDeactivated]: !props.activeID,
          })}
          onClick={() => {
            props.activeID ? props.onItemDelete() : (() => {})();
          }}
        />

        <SaveIcon
          className={cx(styles.optionBtn, {
            [styles.optionBtnDeactivated]: !props.saveEnabled,
          })}
          onClick={() => {
            props.saveEnabled ? props.onSave() : (() => {})();
          }}
        />

        <ComposeIcon
          className={cx(styles.optionBtn, {
            [styles.optionBtnDeactivated]: !(
              props.items[0]?.title ||
              props.items[0]?.contents ||
              !props.activeID
            ),
          })}
          onClick={() => {
            props.items[0]?.title || props.items[0]?.contents || !props.activeID
              ? props.onItemCreate()
              : (() => {})();
          }}
        />
      </div>
    </header>
  );
}

export default NavBar;

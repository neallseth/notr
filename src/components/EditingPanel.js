import React from "react";
import styles from "../css/EditingPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function EditingPanel(props) {
  function onTitleChange(e) {
    let newItem = props.item;
    newItem.title = e.target.value;
    props.onNoteEdit(newItem);
  }

  function onContentsChange(e) {
    let newItem = props.item;
    newItem.contents = e.target.value;
    props.onNoteEdit(newItem);
  }

  function getPanelView() {
    if (props.item) {
      return (
        <>
          <FontAwesomeIcon
            icon={faBars}
            className={styles.optionBtns}
            onClick={props.onSidebarToggle}
          />
          <input
            className={styles.titleInput}
            type="text"
            placeholder="Edit title..."
            value={props.item.title}
            onChange={onTitleChange}
          ></input>
          <textarea
            className={styles.contentInput}
            placeholder="Edit contents..."
            value={props.item.contents}
            onChange={onContentsChange}
          ></textarea>
        </>
      );
    }
  }
  return <div className={styles.panel}>{getPanelView()}</div>;
}

export default EditingPanel;

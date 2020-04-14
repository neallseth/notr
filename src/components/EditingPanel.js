import React from "react";
import styles from "../css/EditingPanel.module.css";
import { ReactComponent as BlankCanvas } from "../assets/illustrations/blank_canvas.svg";

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
          <input
            className={styles.titleInput}
            type="text"
            placeholder="Edit title..."
            spellCheck="false"
            value={props.item.title}
            onChange={onTitleChange}
          ></input>
          <textarea
            className={styles.contentInput}
            placeholder="Edit contents..."
            spellCheck="false"
            value={props.item.contents}
            onChange={onContentsChange}
          ></textarea>
        </>
      );
    } else {
      return (
        <div className={styles.noContentsContainer}>
          <h1 className={styles.noContentsText}>
            Compose a note to get started
          </h1>
          <BlankCanvas className={styles.blankCanvas} />
        </div>
      );
    }
  }
  return <div className={styles.panel}>{getPanelView()}</div>;
}

export default EditingPanel;

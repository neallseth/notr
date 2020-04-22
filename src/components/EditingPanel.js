import React from "react";
import styles from "../css/EditingPanel.module.css";
import { SwitchTransition, CSSTransition } from "react-transition-group";
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
    } else if (props.initialLoadComplete) {
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
  return (
    <SwitchTransition>
      <CSSTransition
        key={true}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames={styles}
      >
        <div className={styles.panel}>{getPanelView()}</div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default EditingPanel;

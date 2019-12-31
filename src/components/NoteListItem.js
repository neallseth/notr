import React from "react";
import styles from "../css/NoteListItem.module.css";
import { CSSTransition } from 'react-transition-group';


function NoteListItem(props) {
  function getClass(id) {
    if (id == props.activeID) {
      return `${styles.listItem} ${styles.activeItem}`;
    } else {
      return `${styles.listItem}`;
    }
  }

  function getItemTitle(title) {
    if (title){
      return <h5 className={styles.itemTitle}>{props.item.title}</h5>
    }
    else{
      return <h5 style={{ fontStyle: "italic" }} className={styles.itemTitle}>No Title</h5>
    }

  }

  function getItemContents(contents) {
    if (contents) {
      return <p className={styles.listItemText}>{contents}</p>;
    } else {
      return (
        <p style={{ fontStyle: "italic" }} className={styles.listItemText}>
          No Contents
        </p>
      );
    }
  }

  return (
    <CSSTransition classNames={{exitActive: styles.noteListItemExitActive}}>
    <div
      role="button"
      onClick={() => props.onItemClick(props.item.id)}
      className={getClass(props.item.id)}
    >
      <div className={styles.itemTitleRow}>
        {getItemTitle(props.item.title)}
        <span className={styles.itemDate}>{props.item.date}</span>
      </div>
      {getItemContents(props.item.contents)}
    </div>
    </CSSTransition>
  );
}

export default NoteListItem;

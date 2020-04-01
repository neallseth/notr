import React from "react";
import styles from "../css/NoteListItem.module.css";
import cx from 'classnames'


function NoteListItem(props) {
  function getClass(id) {
    if (id === props.activeID) {
      return `${styles.listItem} ${styles.activeItem}`;
    } else {
      return `${styles.listItem}`;
    }
  }

  function getItemTitle(titleExists) {
    return <p className={cx(styles.itemTitle,{[styles.itemTitleRegular]:titleExists, [styles.itemTitleItalic]:!titleExists})}>{titleExists?props.item.title:"No Title"}</p>;
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
    <div
      role="button"
      onClick={() => props.onItemClick(props.item.id)}
      className={getClass(props.item.id)}
    >
      <div className={styles.itemTitleRow}>
        {getItemTitle(!!props.item.title)}
        <span className={styles.itemDate}>{props.item.date}</span>
      </div>
      {getItemContents(props.item.contents)}
    </div>
  );
}

export default NoteListItem;

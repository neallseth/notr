import React from "react";
import styles from "../css/NoteList.module.css";
import NoteListItem from "./NoteListItem";

function NoteList(props) {

  return (
    <div className={styles.listContainer}>
      <div className={styles.searchContainer}>
        <input
          className={styles.search}
          placeholder="Search"
          onChange={e => props.onSearchQuery(e.target.value)}
        ></input>
      </div>

      <div className={styles.listGroup}>
        {props.items.map(item => {
          return (
            <NoteListItem
              key={item.id}
              item={item}
              onItemClick={props.onItemClick}
              activeID={props.activeID}
            ></NoteListItem>
          );
        })}
      </div>
    </div>
  );
}

export default NoteList;

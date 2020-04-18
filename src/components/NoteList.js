import React from "react";
import styles from "../css/NoteList.module.css";
import NoteListItem from "./NoteListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function NoteList(props) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.searchContainer}>
        <input
          className={styles.search}
          placeholder="Search"
          onChange={(e) => props.onSearchQuery(e.target.value)}
        ></input>
      </div>

      <div className={styles.listGroup}>
        <TransitionGroup component={null}>
          {props.items.map((item) => (
            <CSSTransition key={item.id} classNames={styles} timeout={300}>
              <NoteListItem
                item={item}
                onItemClick={props.onItemClick}
                activeID={props.activeID}
              ></NoteListItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default NoteList;

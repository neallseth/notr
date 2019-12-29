import React from "react";
import styles from "../css/NoteList.module.css";
import NoteListItem from "./NoteListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function NoteList(props) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.optionBtnGroup}>
        {/* <button className={styles.optionBtn}>Hello</button>
        <button className={styles.optionBtn}>Its me</button>
        <button className={styles.optionBtn}>Hola</button> */}
        <FontAwesomeIcon icon={faTrashAlt} />

        <FontAwesomeIcon icon={faEdit} />
      </div>
      <div className={styles.searchContainer}>
        <input className={styles.search} placeholder="Search"></input>
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

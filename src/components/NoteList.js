import React from "react";
import styles from "../css/NoteList.module.css";
import NoteListItem from "./NoteListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSave,
  faBars
} from "@fortawesome/free-solid-svg-icons";

function NoteList(props) {
  function getComposeButton() {
    if (props.items.length) {
      const { title, contents } = props.items[0];
      if (title || contents) {
        return (
          <FontAwesomeIcon
            icon={faEdit}
            className={styles.optionBtns}
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
          className={styles.optionBtns}
          onClick={props.onItemCreate}
        />
      );
    }
  }
  function getSaveButton() {
    if (props.saveEnabled) {
      return (
        <FontAwesomeIcon
          icon={faSave}
          className={styles.optionBtns}
          onClick={props.onSave}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faSave}
          className={styles.optionBtnDeactivated}
        />
      );
    }
  }
  return (
    <div className={styles.listContainer}>
      <div className={styles.optionBtnGroup}>
        <FontAwesomeIcon
          icon={faTrashAlt}
          className={styles.deleteBtn}
          onClick={props.onItemDelete}
        />
        {getSaveButton()}
        {getComposeButton()}
        <FontAwesomeIcon
          icon={faBars}
          className={styles.optionBtns}
          onClick={props.onSidebarToggle}
        />
      </div>
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

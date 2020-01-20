import React from "react";
import "./css/App.css";
import NoteList from "./components/NoteList";
import EditingPanel from "./components/EditingPanel";

class App extends React.Component {
  state = {
    searchQuery: "",
    activeID: null,
    notes: [
      {
        id: 1,
        title: "First Item",
        contents: "Donec id eget risus varius blandit.",
        date: "12/24/2019"
      },
      {
        id: 2,
        title: "Second Item",
        contents:
          "Donec id elit non mi porta gravida at eget metus mi porta gravida at eget metus mi porta gravida at eget metus mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.",
        date: "12/24/2019"
      },
      {
        id: 3,
        title: "Third Item",
        contents:
          "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.",
        date: "12/24/2019"
      },
      {
        id: 4,
        title: "Fourth Item",
        contents:
          "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.",
        date: "12/25/2019"
      }
    ]
  };

  filterBySearch(data) {
    const { searchQuery } = this.state;
    const filtered = this.state.notes.filter(item => {
      return (
        item.title.toUpperCase().search(searchQuery.toUpperCase()) > -1 ||
        item.contents.toUpperCase().search(searchQuery.toUpperCase()) > -1
      );
    });
    return filtered;
  }

  handleSearchQuery(query) {
    this.setState({ searchQuery: query });
  }

  handleItemClick(newActiveID) {
    this.setState({ activeID: newActiveID });
  }

  handleItemDelete() {
    this.setState(prevState => {
      const filtered = prevState.notes.filter(
        item => item.id !== prevState.activeID
      );
      return { notes: filtered };
    });
    this.setFirstItemActive();
  }

  handleItemCreate() {
    this.setState(prevState => {
      let maxID = 0;
      if (prevState.notes.length > 0) {
        for (let note of prevState.notes) {
          if (note.id > maxID) {
            maxID = note.id;
          }
        }
      }

      const newItem = {
        id: maxID + 1,
        title: "",
        contents: "",
        date: new Date().toLocaleDateString()
      };
      const newNotes = [newItem, ...prevState.notes];
      return { notes: newNotes };
    });
    this.setFirstItemActive();
  }

  handleNoteEdit(newItem) {
    this.setState(prevState => {
      let notes = [...prevState.notes];
      const newDate = new Date().toLocaleDateString();
      newItem.date = newDate;
      const editedIndex = notes.findIndex(item => item.id === newItem.id);
      notes.splice(editedIndex, 1, newItem);
      return { notes };
    });
  }

  setFirstItemActive() {
    this.setState(prevState => {
      if (prevState.notes.length > 0) {
        return { activeID: prevState.notes[0].id };
      } else {
        return { activeID: null };
      }
    });
  }

  componentDidMount() {
    this.setFirstItemActive();
  }

  render() {
    const [item] = this.state.notes.filter(
      item => item.id === this.state.activeID
    );

    const filteredNotes = this.filterBySearch(this.state.notes);

    return (
      <div className="App">
        <div className="row no-gutters">
          <div className="col-4">
            <NoteList
              items={filteredNotes}
              onSearchQuery={this.handleSearchQuery.bind(this)}
              onItemClick={this.handleItemClick.bind(this)}
              onItemDelete={this.handleItemDelete.bind(this)}
              onItemCreate={this.handleItemCreate.bind(this)}
              activeID={this.state.activeID}
            ></NoteList>
          </div>
          <div className="col-8">
            <EditingPanel
              item={item}
              onNoteEdit={this.handleNoteEdit.bind(this)}
            ></EditingPanel>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

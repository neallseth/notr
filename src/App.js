import React from "react";
import "./css/Base.css"
import "./css/App.css";
import NoteList from "./components/NoteList";
import EditingPanel from "./components/EditingPanel";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast"

class App extends React.Component {
  state = {
    sidebarOpen: true,
    searchQuery: "",
    activeID: null,
    notes: [],
    savedNotes: [],
    toasts: []
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
    }, this.showToast("danger", "Note deleted!"));
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

  handleSave() {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
    const savedNotes = localStorage.getItem("notes");
    this.setState({
      savedNotes: JSON.parse(savedNotes),
      notes: JSON.parse(savedNotes)
    }, this.showToast("success", "Notes saved!"));
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

  handleSidebarToggle() {
    this.setState(prevState => {
      return { sidebarOpen: !prevState.sidebarOpen };
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

  changeDetected() {
    const notes = this.state.notes.map(note => [note.title, note.contents]);
    const savedNotes = this.state.savedNotes.map(note => [
      note.title,
      note.contents
    ]);

    return JSON.stringify(notes) !== JSON.stringify(savedNotes);
  }

  showToast(type, message) {
    let toasts = JSON.parse(JSON.stringify(this.state.toasts));
    const id = toasts.length + 1;
    toasts.push({ id, type, message })
    this.setState({ toasts });
    const removedToast = this.state.toasts.filter(toast=>toast.id!==id)
    setTimeout(() => this.setState({toasts:removedToast}),2000);
  }

  componentDidMount() {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    const initNotes = savedNotes?.length
      ? savedNotes
      : [
        {
          id: 1,
          title: "Welcome to Notr",
          contents: "Hi, thanks for checking out Notr!",
          date: new Date().toLocaleDateString()
        }
      ];
    this.setState({
      notes: JSON.parse(JSON.stringify(initNotes)),
      savedNotes: JSON.parse(JSON.stringify(initNotes))
    });
    this.setFirstItemActive();
  }

  render() {
    const [item] = this.state.notes.filter(
      item => item.id === this.state.activeID
    );

    const filteredNotes = this.filterBySearch(this.state.notes);

    return (
      <div className="App">
        <NavBar
          onSidebarToggle={this.handleSidebarToggle.bind(this)}
          items={filteredNotes}
          saveEnabled={this.changeDetected()}
          onItemDelete={this.handleItemDelete.bind(this)}
          onItemCreate={this.handleItemCreate.bind(this)}
          activeID={this.state.activeID}
          onSave={this.handleSave.bind(this)}
        ></NavBar>

        <div className="main">
          <div
            className={
              this.state.sidebarOpen
                ? "sidebar sidebar-active"
                : "sidebar sidebar-inactive"
            }
          >
            <NoteList
              items={filteredNotes}
              saveEnabled={this.changeDetected()}
              onSearchQuery={this.handleSearchQuery.bind(this)}
              onItemClick={this.handleItemClick.bind(this)}
              onItemDelete={this.handleItemDelete.bind(this)}
              onItemCreate={this.handleItemCreate.bind(this)}
              activeID={this.state.activeID}
              onSave={this.handleSave.bind(this)}
            ></NoteList>
          </div>
          <div
            className={
              this.state.sidebarOpen
                ? "content-area content-area-shared"
                : "content-area"
            }
          >
            <EditingPanel
              item={item}
              onNoteEdit={this.handleNoteEdit.bind(this)}
              onSidebarToggle={this.handleSidebarToggle.bind(this)}
            ></EditingPanel>
          </div>

        </div>
       {this.state.toasts.map(item=>{
         return <Toast key={item.id} type={item.type} message={item.message}></Toast>
       })}
       

      </div>
    );
  }
}

export default App;

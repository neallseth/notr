import React from "react";
import "./css/App.css";
import NoteList from "./components/NoteList";
import EditingPanel from "./components/EditingPanel";

class App extends React.Component {
  state = {
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

  handleSearchQuery(query) {
    console.log("query: ", query);
    this.setState(prevState => {
      const filtered = prevState.notes.filter(item => {
        console.log(item.title.toUpperCase().search(query.toUpperCase()) > -1);
        console.log(
          item.contents.toUpperCase().search(query.toUpperCase()) > -1
        );
        console.log(
          "or condition: ",
          item.title.toUpperCase().search(query.toUpperCase()) > -1 ||
            item.contents.toUpperCase().search(query.toUpperCase()) > -1
        );
        return (
          item.title.toUpperCase().search(query.toUpperCase()) > -1 ||
          item.contents.toUpperCase().search(query.toUpperCase()) > -1
        );
      });
      return { notes: filtered };
    });
  }

  handleItemClick(newActiveID) {
    this.setState({ activeID: newActiveID });
  }

  handleItemDelete() {
    this.setState(prevState => {
      console.log("deleting: ", prevState.activeID);
      const filtered = prevState.notes.filter(
        item => item.id !== prevState.activeID
      );
      return { notes: filtered };
    });
    this.setFirstItemActive();
  }

  handleItemCreate() {
    this.setState(prevState => {
      let maxID;
      if (prevState.notes.length > 0) {
        maxID = prevState.notes.reduce((prev, current) => {
          return prev.id > current.id ? prev.id : current.id;
        });
      } else {
        maxID = 0;
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
      const editedIndex = notes.findIndex(item => item.id == newItem.id);
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
      item => item.id == this.state.activeID
    );

    return (
      <div className="App">
        <div className="container-fluid px-0">
          <div className="row no-gutters">
            <div className="col-lg-3 col-md-4 col-sm-5 col-xs-6">
              <NoteList
                items={this.state.notes}
                onSearchQuery={this.handleSearchQuery.bind(this)}
                onItemClick={this.handleItemClick.bind(this)}
                onItemDelete={this.handleItemDelete.bind(this)}
                onItemCreate={this.handleItemCreate.bind(this)}
                activeID={this.state.activeID}
              ></NoteList>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-7 col-xs-6">
              <EditingPanel
                item={item}
                onNoteEdit={this.handleNoteEdit.bind(this)}
              ></EditingPanel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

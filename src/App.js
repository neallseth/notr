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

  setInitialActiveID() {
    if (this.state.notes.length > 0) {
      this.setState(prevState => {
        return { activeID: prevState.notes[0].id };
      });
    }
  }

  handleItemClick(newActiveID) {
    this.setState({ activeID: newActiveID });
  }

  getActiveItem() {
    const [item] = this.state.notes.filter(
      item => item.id == this.state.activeID
    );
    return item;
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

  componentDidMount() {
    this.setInitialActiveID();
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid px-0">
          <div className="row no-gutters">
            <div className="col-lg-3 col-md-4 col-sm-5 col-xs-6">
              <NoteList
                items={this.state.notes}
                onItemClick={this.handleItemClick.bind(this)}
                activeID={this.state.activeID}
              ></NoteList>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-7 col-xs-6">
              <EditingPanel
                item={this.getActiveItem()}
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

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.note };
        this.onClick = this.onClick.bind(this);
    }
    render() {
        return <div>
                   <p><b>{this.state.note.id}</b></p>
                   <p> {this.state.note.name}</p>
                   <p> {this.state.note.text}</p>
               </div>;
    }
}

class NotesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", text: "1" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onTextChange(e) {
        this.setState({ text: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var noteName = this.state.name.trim();
        var noteText = this.state.text;
        if (!noteName) {
            return;
        }
        this.props.onNoteSubmit({ name: noteName, text: noteText });
        this.setState({ name: "", text: 0 });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                           placeholder="note place holder (header)?"
                           value={this.state.name}
                           onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="text"
                           placeholder="text?"
                           value={this.state.price}
                           onChange={this.onTextChange} />
                </p>
                <input type="submit" value="Save" />
            </form>
        );
    }
}

class NotesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { notes: [] };

        this.onAddNote = this.onAddNote.bind(this);
        this.onRemoveNote = this.onRemoveNote.bind(this);
    }

    loadData() {
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open("get", this.props.apiUrl, true);
        xmlRequest.onload = function () {
            var data = JSON.parse(xmlRequest.responseText);
            this.setState({ notes: data });
        }.bind(this);
        xmlRequest.send();
    }
	
    componentDidMount() {
        this.loadData();
    }
	
    // add new note
    onAddNote(note) {
        if (note) {

            var data = JSON.stringify({ "name": note.name, "text": note.price });
            var xmlRequest = new XMLHttpRequest();

            xmlRequest.open("post", this.props.apiUrl, true);
            xmlRequest.setRequestHeader("Content-type", "application/json");
            xmlRequest.onload = function () {
                if (xmlRequest.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xmlRequest.send(data);
        }
    }

    onRemoveNote(note) {

        if (note) {
            var url = this.props.apiUrl + "/" + note.id;

            var xmlRequest = new XMLHttpRequest();
            xmlRequest.open("delete", url, true);
            xmlRequest.setRequestHeader("Content-Type", "application/json");
            xmlRequest.onload = function () {
                if (xmlRequest.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xmlRequest.send();
        }
    }
    render() {

        var remove = this.onRemoveNote;
        return <div>
            <NotesForm onNoteSubmit={this.onAddNote} />
            <h2>List</h2>
            <div>
                {
                    this.state.notes.map(function (note) {

                        return <Note key={note.id} note={note} onRemove={remove} />
                    })
                }
            </div>
        </div>;
    }
}


ReactDOM.render(
    <NotesList apiUrl="/api/values" />,
    document.getElementById("content")
);
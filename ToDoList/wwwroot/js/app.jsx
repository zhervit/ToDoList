class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.note };
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }
	onDeleteClick(e){
        this.props.onRemove(this.state.data);
    }
    render() {
        return  <div className="note">
                        <p><b>{this.state.data.id}</b></p>
                        <p>{this.state.data.name}</p>
                        <p><img src="/media/logo.svg" className="logopic"/></p>
                        <div className="text">
                            <p>{this.state.data.text}</p>
				        </div>
                        <div >
                        <p>
                         <button className="btn bubble edit" onClick={this.onEditClick}>Edit</button>
                         <button className="btn bubble delete" onClick={this.onDeleteClick}>Delete</button>
                        </p>
                        </div>
                </div>;
    }
}

class NotesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", text: "" };

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
        this.setState({ name: "", text: "" });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                           placeholder="Enter the name"
                           value={this.state.name}
                           onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="text"
                           placeholder="Enter the text"
                           value={this.state.text}
                           onChange={this.onTextChange} />
                </p>
                <input type="submit"  className="btn bubble save" value="Save" />
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

            var data = JSON.stringify({ "name": note.name, "text": note.text });
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
            <div className="container">
            <NotesForm onNoteSubmit={this.onAddNote} />
            <div className="header">
            <h2>My Bucket List</h2>
            </div>
            <div className = "left"></div>
            <div  className="center">
                {
                    this.state.notes.map(function (note) {

                        return <Note key={note.id} note={note} onRemove={remove} />
                    })
                }
            </div>
            <div className = "right"></div>
            </div>
        </div>;
    }
}


ReactDOM.render(
    <NotesList apiUrl="/api/values" />,
    document.getElementById("content")
);
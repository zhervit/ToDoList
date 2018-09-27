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

 

class NotesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { notes: [] };

        this.onAddNote = this.onAddNote.bind(this);
        this.onRemoveNote = this.onRemoveNote.bind(this);
    }
    // загрузка данных
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
    // удаление объекта
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
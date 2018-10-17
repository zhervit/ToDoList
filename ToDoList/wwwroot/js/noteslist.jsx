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

            var data = JSON.stringify({ "name": note.name, "text": note.text, "category":note.category, "imageAddress":note.imageAddress });
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
        return <div className="container">
            <div className="header">
            <h2>My Bucket List</h2>
            </div>
            <div className = "left">
            <NotesForm onNoteSubmit={this.onAddNote} />
            </div>
            <div  className="center">
                {
                    this.state.notes.map(function (notesgroup) {
                        
                        return <Category key={notesgroup.name} groupname={notesgroup.name} notes={notesgroup.notes} onRemove={remove} />
                    })
                }
            </div>
            <div className = "right"></div>
        </div>;
    }
}
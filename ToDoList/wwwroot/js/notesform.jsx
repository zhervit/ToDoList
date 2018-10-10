class NotesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", text: "", category:"" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onTextChange(e) {
        this.setState({ text: e.target.value });
    }
    onCategoryChange(e) {
        this.setState({ category: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var noteName = this.state.name.trim();
        var noteText = this.state.text;
        var noteCategory = this.state.category;
        if (!noteName) {
            return;
        }
        this.props.onNoteSubmit({ name: noteName, text: noteText, category: noteCategory });
        this.setState({ name: "", text: "", category:"" });
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

                 <p>
                    <input type="text"
                           placeholder="Choose the category"
                           value={this.state.category}
                           onChange={this.onCategoryChange} />
                </p>

                <input type="submit"  className="btn bubble save" value="Save" />
            </form>
        );
    }
}
class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.notes };
        this.onRemoveNote = this.onRemoveNote.bind(this);
    }
    
    onRemoveNote(e){
        this.props.onRemove(e);
    }
    collapse(e){
        coll=e.currentTarget;

        coll.classList.toggle("active");
            var content = coll.nextElementSibling;
            if (content.style.maxHeight){
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + "px";
            } 
         ;
    }
    render() {
        var remove = this.onRemoveNote;
        return <div>
            <button className="collapsible" onClick={this.collapse}>{this.props.groupname}</button>
         <div  className="category">
        {   
            this.props.notes.map(function(note){
                return <Note key={note.id} note={note} onRemove={remove} />
            })
        }
        </div>
        </div>;
    }
}

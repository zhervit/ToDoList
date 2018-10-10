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
                        <p><b>id: {this.state.data.id}</b></p>
                       <div className="noteHeader"> <p><h2>{this.state.data.name}</h2></p></div>
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
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
        
        var imgSource="/media/logo.svg";
        if(this.state.data.imageAddress !=null) imgSource =this.state.data.imageAddress; 
        return  <div className="note">
                       
                        <p><b>id: {this.state.data.id}</b></p>
                       <div className="noteHeader"> <p><h2>{this.state.data.name}</h2></p></div>
                      
                       <p><img src={imgSource} className="logopic"/></p>

                        <div className="text">
                            <p>{this.state.data.text}</p>
				        </div>
                        <div>
                        <div className="checkBox">
                            <label className="checkContainer">Done
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <p>
                         <button className="btn bubble edit" onClick={this.onEditClick}>Edit</button>
                         <button className="btn bubble delete" onClick={this.onDeleteClick}>Delete</button>
                        </p>
                        </div>
                </div>;
    }
}
class CategoriesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categoryName: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onCategoryNameChange = this.onCategoryNameChange.bind(this);
    
    }
    onCategoryNameChange(e) {
        this.setState({ categoryName: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        var categoryName = this.state.categoryName.trim();
        if (!categoryName) {
            return;
        }
        this.props.onCategorySubmit({ categoryName: categoryName});
        this.setState({ categoryName: "" });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p><b>add new category</b></p>
                <p>
                    <input type="text"
                           placeholder="Enter the category name"
                           value={this.state.categoryName}
                           onChange={this.onCategoryNameChange} />
                </p>

                <input type="submit"  className="btn bubble save" value="Create" />
            </form>
        );
    }
}
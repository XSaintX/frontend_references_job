import React from 'react'


const SearchList = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
        filteredData: props.list
      }
    }
    handleListSearch = event => {

      let searchTerm = event.target.value;
      let self = this;
      let filteredData = this.props.list.filter(function (item) {
        //if (item[self.props.field].toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0)
          return item;
      });
      this.setState({ filteredData: filteredData, searchTerm: event.target.value })
    }

    render() {
      return (
        <div>
          <div>
            <input onChange={this.handleListSearch} value={this.state.searchTerm} type="text" placeholder={this.props.placeholder} />
          </div>
          <WrappedComponent list={this.state.filteredData} />
        </div>
      )
    }
  }

}
export default SearchList
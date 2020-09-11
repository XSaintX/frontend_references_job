import React from 'react';
import SearchList from './SearchListHOC.jsx';
import Table from './Table.jsx';

function MyList(props) {
  return (
    <div>
      <Table data={props.list} />
    </div>
  )
}

export default SearchList(MyList)
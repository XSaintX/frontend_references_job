import React, { memo } from 'react';

const Table = ({ data }) => {

  const getKeys = () => {
    return data.length > 0 ? Object.keys(data[0]) : [];
  }

  const getHeader = () => {
    var keys = getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>
    })
  }

  const getRowsData = () => {
    var items = data;
    var keys = getKeys();
    return items.map((row, index) => {
      return <tr key={index}><RenderRow mainkey={index} data={row} keys={keys} /></tr>
    })
  }

  return (
    <div>
      <table>
        <thead>
          <tr>{getHeader()}</tr>
        </thead>
        <tbody>
          {getRowsData()}
        </tbody>
      </table>
    </div>

  );
}

const RenderRow = ({ mainkey, data, keys }) => {
  return keys.map((key, index) => {
    return <td key={data[key]}>{data[key]}</td>
  })
}

export default memo(Table);
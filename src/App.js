import React, { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import { Graph } from "react-d3-graph";
import MyList from './components/MyList.jsx';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

function App() {
  const [combo, setcombo] = useState([]);
  const [items, setItems] = useState([]);
  const [userId, setuserId] = useState(null);
  const [companyName, setcompanyName] = useState(null);
  const [graph, setgraph] = useState({});
  const [table, settable] = useState([]);
  const [myConfig, setmyConfig] = useState({});
  const [path, setpath] = useState(null);
  const [pathformatted, setpathformatted] = useState({});

  const onSelect = e => {
    var newItems = combo.filter((item) => item.id != e.target.value);
    setItems(newItems);
    setuserId(e.target.value);
  }

  const onSelectCompany = e => {
    setcompanyName(e.target.value);
  }

  const showresult = () => {
    if (userId !== null && companyName !== null) {
      const data = {
        userId: parseInt(userId),
        companyName: companyName
      };
      axios.post(
        "https://referencejob.herokuapp.com/references", data
      )
        .then(responseJson => {
          setpath(responseJson.data);
        })
        .catch(error => console.log("error", error));
    }
  }

  useEffect(() => {
    setgraph({
      nodes: [
        { id: "Daniel", company: "Renault" },
        { id: "Terry", company: "Lufthansa" },
        { id: "Paul", company: "Nissan" },
        { id: "Wilson", company: "Schindler" },
        { id: "Russell", company: "Volkswagen" },
        { id: "Any", company: "Fiat" },
        { id: "Nicolas", company: "Siemens" },
        { id: "Patty", company: "BMW" }
      ],
      links: [
        { source: "Daniel", target: "Terry" },
        { source: "Daniel", target: "Paul" },
        { source: "Daniel", target: "Wilson" },
        { source: "Daniel", target: "Russell" },
        { source: "Daniel", target: "Nicolas" },
        { source: "Terry", target: "Any" },
        { source: "Terry", target: "Patty" },
        { source: "Paul", target: "Wilson" },
        { source: "Paul", target: "Russell" },
        { source: "Paul", target: "Patty" },
        { source: "Wilson", target: "Any" },
        { source: "Wilson", target: "Patty" },
        { source: "Russell", target: "Nicolas" },
        { source: "Any", target: "Nicolas" },
        { source: "Any", target: "Patty" },
        { source: "Nicolas", target: "Patty" }]
    });
    setmyConfig({
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
      },
    });
  }, []);

  const createPath = useMemo(() => {
    if (path != null) {
      const answer_array = path.split('-');
      let resultpath = { nodes: [], links: [] };
      let nodespartial = [];
      let linkspartial = [];
      for (var i = 0; i < answer_array.length; i++) {
        nodespartial.push({ "id": answer_array[i] });
      }
      for (var i = 0; i < answer_array.length - 1; i++) {
        linkspartial.push({ "source": answer_array[i], "target": answer_array[i + 1] });
      }
      resultpath['nodes'] = nodespartial;
      resultpath['links'] = linkspartial;
      setpathformatted(resultpath);
    }
  }, [path]);

  const fillTable = useMemo(() => {
    if (Object.keys(graph).length > 0) {
      const arrayOfObj = graph.nodes;
      const newArrayOfObj = arrayOfObj.map(({ id: name, ...rest }) => ({ name, ...rest }));
      settable(newArrayOfObj);
      let result = [];
      for (var i = 0; i < graph.nodes.length; i++) {
        result.push({ "id": i + 1, "name": graph.nodes[i].id, "company": graph.nodes[i].company });
      }
      setcombo(result);
    }
  }, [graph]);

  return (
    <div>
      <Grid container direction={'row'} justify="center" alignItems="center">
        <div align="center">
          <label>
            User:
          <select onChange={e => onSelect(e)}>
              {combo.map(i => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Company:
          <select onChange={e => onSelectCompany(e)}>
              {items.map(i => (
                <option key={i.id} value={i.company}>
                  {i.company}
                </option>
              ))}
            </select>
          </label>
          <button onClick={showresult}>SHOW</button>
        </div>
      </Grid>
      <br />
      <Grid container spacing={12} spacing={2} justify="center" alignItems="center" align-items-xs-center>
        
        <Grid item xs={4} align="center">
          {Object.keys(graph).length > 0 ? (
            <>
              <p>Friend's relation</p><br />
              <Graph
                id="graph-id"
                data={graph}
                config={myConfig}
                initialZoom={16}
              /></>) : null}
        </Grid>
        <Grid item xs={5} align="center">
          {Object.keys(pathformatted).length > 0 ? (
            <><p>Reference's path to company</p>
              <Graph
                id="graph-idf"
                data={pathformatted}
                config={myConfig}
                initialZoom={4}
              /></>) : null}
        </Grid>
        <Grid item xs={3}>
          {
            table.length > 0 ? <MyList list={table} field={'name'}
              placeholder={'Search name'} /> : null
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

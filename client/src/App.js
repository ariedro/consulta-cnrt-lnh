import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import "./App.css";
import TableChoferes from "./tables/TableChoferes";

const APIS = ["choferes", "curso", "cursadas", "examenes"];

class App extends Component {
  state = {};

  callApi = dni =>
    Promise.all(APIS.map(api => fetch(`/api/${api}/${dni}`))).then(resps =>
      Promise.all(resps.map(res => res.json()))
    );

  handleSubmit = () => {
    const { dni } = this.state;
    this.callApi(dni)
      .then(data => this.setState({ data }))
      .catch(error => this.setState({ error }));
  };

  render() {
    return (
      <div className="App">
        <InputGroup>
          <InputGroupAddon addonType="append">
            <Button onClick={this.handleSubmit}>Enviar</Button>
          </InputGroupAddon>
          <Input
            onChange={({ target: { value: dni } }) => this.setState({ dni })}
          />
        </InputGroup>
        <TableChoferes />
      </div>
    );
  }
}

export default App;

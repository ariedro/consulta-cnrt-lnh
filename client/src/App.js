import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import "./App.css";
import Table from "./tables/Table";

class App extends Component {
  state = { data: [] };

  APIS = [
    {
      title: "Choferes",
      name: "choferes"
    },
    {
      title: "Curso",
      subtitle:
        "Mercancías Peligrosas (C) - Pasajeros (P) - Cargas Generales Bitrenes (BT)",
      sortby: "VIGENCIA",
      name: "curso"
    },
    {
      title: "Cursadas",
      subtitle: "Cargas Generales (G)",
      name: "cursadas"
    },
    {
      title: "Exámenes",
      sortby: "LICVALIHAS",
      name: "examenes"
    }
  ];

  callApi = dni =>
    Promise.all(this.APIS.map(({ name }) => fetch(`/api/${name}/${dni}`))).then(
      resps => Promise.all(resps.map(res => res.json()))
    );

  handleSubmit = () => {
    const { dni } = this.state;
    this.callApi(dni)
      .then(data => this.setState({ data }))
      .catch(error => this.setState({ error }));
  };

  render() {
    const { data } = this.state;
    console.log("this.state:", this.state);
    return (
      <div className="App">
        <InputGroup>
          <InputGroupAddon addonType="append">
            <Button onClick={this.handleSubmit}>Enviar</Button>
          </InputGroupAddon>
          <Input
            placeholder="DNI"
            onChange={({ target: { value: dni } }) => this.setState({ dni })}
          />
        </InputGroup>
        {this.APIS.map(({ name, sortby, title, subtitle }, i) => (
          <div>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            <Table name={name} data={data[i]} sortby={sortby} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;

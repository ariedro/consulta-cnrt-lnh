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
      title: "Exámenes",
      sortby: "LICVALIHAS",
      name: "examenes"
    },
    {
      title: "Cursadas",
      subtitle: "Cargas Generales (G)",
      name: "cursadas"
    },
    {
      title: "Curso",
      subtitle:
        "Mercancías Peligrosas (C) - Pasajeros (P) - Cargas Generales Bitrenes (BT)",
      sortby: "VIGENCIA",
      name: "curso"
    }
  ];

  callApi = dni =>
    Promise.all(this.APIS.map(({ name }) => fetch(`/api/${name}/${dni}`))).then(
      resps => Promise.all(resps.map(res => res.json()))
    );

  handleSubmit = () => {
    const { dni } = this.state;
    this.setState({ loading: true }, () =>
      this.callApi(dni)
        .then(data => this.setState({ data, loading: false }))
        .catch(error => this.setState({ error }))
    );
  };

  render() {
    const { data, loading } = this.state;
    return (
      <div className="App">
        <div className="input">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Input
                placeholder="DNI"
                onChange={({ target: { value: dni } }) =>
                  this.setState({ dni })
                }
                onKeyPress={({ charCode }) =>
                  charCode === 13 && this.handleSubmit()
                }
              />
              <Button
                color="primary"
                onClick={this.handleSubmit}
                disabled={loading}
              >
                {loading ? "Cargando" : "Enviar"}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
        {data.length > 0 && (
          <div className="tables">
            {this.APIS.map(({ name, sortby, title, subtitle }, i) => (
              <div className="table-block">
                <h2 className="title">{title}</h2>
                <h3 className="subtitle">{subtitle}</h3>
                <Table name={name} data={data[i]} sortby={sortby} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;

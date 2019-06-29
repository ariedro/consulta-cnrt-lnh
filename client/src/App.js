import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button, Alert } from "reactstrap";
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

  callApi = async dni => {
    try {
      const responses = await Promise.all(
        this.APIS.map(({ name }) => fetch(`/api/${name}/${dni}`))
      );
      const data = await Promise.all(responses.map(res => res.json()));
      if (data.findIndex(d => d.length > 0) === -1)
        throw new Error("DNI vacio");
      return data;
    } catch (e) {
      console.log("[CallApi Error]", e);
      throw e;
    }
  };

  handleSubmit = () => {
    const { dni } = this.state;
    this.setState({ error: null, loading: true }, () =>
      this.callApi(dni)
        .then(data => this.setState({ data, loading: false }))
        .catch(error => this.setState({ error, loading: false }))
    );
  };

  parseError = error => {
    const stringError = error.toString();
    const errors = { "Error: DNI vacio": "El DNI es inválido" };
    return errors[stringError] || "Ha ocurrido un error";
  };

  render() {
    const { error, data, loading } = this.state;
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
          {error && <Alert color="danger">{this.parseError(error)}</Alert>}
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

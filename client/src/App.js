import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Alert,
  Badge
} from "reactstrap";
import "./App.css";
import Table from "./tables/Table";

class App extends Component {
  state = { data: [] };

  APIS = [
    {
      title: "Choferes",
      name: "choferes",
      rows: 2
    },
    {
      title: "Exámenes",
      sortby: "LICVALIHAS",
      name: "examenes",
      rows: 7
    },
    {
      title: "Cursadas",
      badges: ["Cargas Generales (G)"],
      name: "cursadas",
      rows: 7
    },
    {
      title: "Curso",
      badges: [
        "Mercancías Peligrosas (C)",
        "Pasajeros (P)",
        "Cargas Generales Bitrenes (BT)"
      ],
      sortby: "VIGENCIA",
      name: "curso",
      rows: 5
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
        <div className={data.length > 0 ? "input" : "emptyinput"}>
          {data.length === 0 && <p>Ingrese DNI</p>}
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
            {this.APIS.map(({ name, sortby, title, badges, rows }, i) => (
              <div className="table-block">
                <h2 className="title">{title}</h2>
                <div className="badges">
                  {badges &&
                    badges.map(badge => <Badge color="info">{badge}</Badge>)}
                </div>
                <Table name={name} data={data[i]} sortby={sortby} rows={rows} />
              </div>
            ))}
          </div>
        )}
        <p className="signature">
          Creado por Ariel Aguirre (ariedro@gmail.com)
        </p>
      </div>
    );
  }
}

export default App;

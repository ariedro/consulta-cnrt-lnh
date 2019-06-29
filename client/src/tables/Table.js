import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import schemas from "./schemas";

class Table extends Component {
  state = {};

  render() {
    const { name, data } = this.props;
    return <ReactTable data={data} columns={schemas[name]} />;
  }
}

export default Table;

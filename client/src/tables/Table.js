import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import schemas from "./schemas";

class Table extends Component {
  state = {};

  render() {
    const { name, data } = this.props;
    const tableProps = {
      defaultPageSize: 5,
      showPageSizeOptions: false,
      showFilters: true,
      nextText: "Siguiente",
      previousText: "Anterior",
      pageText: "Página",
      ofText: "de",
      noDataText: "No se encontraron datos"
    };
    return <ReactTable data={data} columns={schemas[name]} {...tableProps} />;
  }
}

export default Table;

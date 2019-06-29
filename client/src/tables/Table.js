import React from "react";
import ReactTable from "react-table";
import schemas from "./schemas";
import "./Table.css";

const Table = props => {
  const { name, data, sortby, rows } = props;
  const tableProps = {
    defaultPageSize: rows,
    showPageSizeOptions: false,
    showFilters: true,
    nextText: "Siguiente",
    previousText: "Anterior",
    pageText: "Página",
    ofText: "de",
    noDataText: "No se encontraron datos",
    defaultSorted: [
      {
        id: sortby,
        desc: true
      }
    ]
  };
  return <ReactTable data={data} columns={schemas[name]} {...tableProps} />;
};

export default Table;

import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import schemas from "./schemas";

const Table = props => {
  console.log("props:", props);
  const { name, data, sortby } = props;
  const tableProps = {
    defaultPageSize: 5,
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

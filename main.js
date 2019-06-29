const express = require("express");
const config = require("./config.json");

const app = express();
const port = process.env.PORT || 5000;
const sql = require("mssql");

sendQuery = (pool, req, res, table, field) => {
  const dni = req.params[field];
  if (!dni || isNaN(dni)) {
    res.status(400).send("Invalid params");
    return;
  }
  pool
    .request()
    .input("input_parameter", sql.VarChar, dni)
    .query(`select * from ${table} where ${field} = @input_parameter`)
    .then(({ recordset }) => res.status(200).send(recordset))
    .catch(error => {
      console.log("[Query Error]", error);
      res.status(400).send(error);
    });
};

sql
  .connect(config.db)
  .then(pool => {
    [
      { table: "choferes", field: "DOC" },
      { table: "curso", field: "DOC" },
      { table: "cursadas", field: "IDDoc" },
      { table: "examenes", field: "DOC" }
    ].map(({ table, field }) =>
      app.get(`/api/${table}/:${field}`, (req, res) =>
        sendQuery(pool, req, res, table, field)
      )
    );
  })
  .catch(err => {
    console.log("[SQL Connect Error]", err);
  });

sql.on("error", err => {
  console.log("[SQL Error]", err);
});

// app.get('/api/curso')
// app.get('/api/cursada')
// app.get('/api/examen')

app.listen(port, () => console.log(`Listening on port ${port}`));

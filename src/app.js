const express = require('express');
const app = express();
// const swaggerDocument = require("./swagger.yaml");
// const swaggerui = require("swagger-ui-express");
const port = 3003;

const mongoose = require ("mongoose");
mongoose.connect('mongodb://mongo/apinode')

app.use(express.urlencoded());
app.use(express.json());

// app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
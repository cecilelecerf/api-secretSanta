const express = require('express');
const app = express();
// const swaggerDocument = require("./swagger.yaml");
const swaggerui = require("swagger-ui-express");
const swaggerjsdoc = require("swagger-jsdoc")
const port = 3003;

const mongoose = require ("mongoose");
mongoose.connect('mongodb://mongo/apinode')

app.use(express.urlencoded());
app.use(express.json());

const options = {
  definition:{
    openapi : "3.0.0",
    info : {
      title : "Secret santa api doc",
      description : "Documentation de l'api d'un secret santa"
    },
    contact:{
      name: "Cecoule",
    },
    servers : [
      {
        url: "http://localhost:3003/"
      }
    ]
  },
  apis : ["/routes/*.js"]
}
const spacs = swaggerjsdoc(options)
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
const express = require('express');
const app = express();
const swaggerui = require("swagger-ui-express");
const swaggerjsdoc = require("swagger-jsdoc")
const port = 3003;

const mongoose = require ("mongoose");
mongoose.connect('mongodb://mongo/apinode')

app.use(express.urlencoded());
app.use(express.json());

const userRoute = require("./routes/userRoute");
userRoute(app);

const groupRoute = require("./routes/groupRoute");
groupRoute(app);

const memberShipRoute = require("./routes/memberShipRoute");
memberShipRoute(app)

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
  apis : ["./routes/*.js"]
}
const spacs = swaggerjsdoc(options)
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
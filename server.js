const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require("./routes/routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
app.use(express.static(path.join(__dirname, "build")));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Clients and Providers API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/routes.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3001;

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});

app.use(express.static("public"));
app.use(cors());
app.use("/", routesUrls);

app.use("/", (req, res, next) => {
  res.end("Home page");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

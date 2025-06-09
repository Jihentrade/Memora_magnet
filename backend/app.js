var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./config/connectDB");
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var app = express();
const cron = require("node-cron");
require("dotenv").config({ path: "./config/.env" });
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(express.json({ limit: "10mb" }));

app.use(express.json());
//******************************************************* */
// Configurer CORS
app.use(
  cors({
    origin: "http://localhost:3003",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//******************************************************* */
//2-***********************CONNECTE THE DATABASE****/

connectDB();
//*********************partie router *********************************** */
// const commandeRouter = require("./src/routers/commandeRouter");
// const produitRouter = require("./src/routers/produitRouter");
// const authRouter = require("./src/routers/authRouter");
// const adminRouter = require("./src/routers/adminRouter");

// app.use("/admin", adminRouter);
// app.use("/commande", commandeRouter);
// app.use("/produit", produitRouter);
// app.use("/auth", authRouter);
//******************************************************* */
//1-START THE SERVER
app.listen(4002, function () {
  console.log("Running on http://127.0.0.1:4003");
});
module.exports = app;

//******************************************************* */

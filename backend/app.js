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
require("dotenv").config({ path: "./src/config/.env" });
// view engine setup
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
// app.use(cors());
// Configurer CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3003",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Autoriser certaines méthodes HTTP
    credentials: true, // Autoriser l'envoi de cookies
  })
);
// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

//2-*******************************CONNECTE THE DATABASE*********************

connectDB();
//********************************Tester les fonction ************************

const commandeRouter = require("./src/routers/commandeRouter");
const authRouter = require("./src/routers/authRouter");
const adminRouter = require("./src/routers/adminRouter");
const clientRouter = require("./src/routers/clientRouter");
const reductionRouter = require("./src/routers/ReductionRouter");
app.use("/admin", adminRouter);
app.use("/commande", commandeRouter);
app.use("/client", clientRouter);
app.use("/reduction", reductionRouter);
app.use("/auth", authRouter);
//**************************************************************************** */
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   console.log(`Requested path: ${req.path}`);
//   next(createError(404));
// });

//1-START THE SERVER
app.listen(4001, function () {
  console.log("Running on http://127.0.0.1:4001");
});

module.exports = app;

require("dotenv").config();
const express = require('express');
const mongoose =  require('mongoose');
const session =  require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

//database connection
mongoose.connect(
    "mongodb+srv://levananh:123@cluster0.mddxbxf.mongodb.net/node_crud",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () =>console.log("Connected to the database"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.use(express.static('uploads'));

app.set("view engine", "ejs");

app.use("", require("./routes/routes"));

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
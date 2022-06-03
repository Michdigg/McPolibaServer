const
    port = 8080,
    express = require('express'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => console.log("Connessione al database riuscita"));

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("view engine", "ejs");

app.listen(port, () => console.log("Applicazione in ascolto"));
const
    port = 8080,
    mongodbUrl = "mongodb+srv://michdigg:poliba123@mcpoliba.b0aafb5.mongodb.net/?retryWrites=true&w=majority",
    express = require('express'),
    mongoose = require('mongoose'),
    productController = require('./controllers/productController'),
    userController = require('./controllers/userController'),
    orderController = require('./controllers/orderController')
;
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user").User;
const flash = require('connect-flash');

mongoose.connect(mongodbUrl, {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => console.log("Connessione al database riuscita"));

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(flash());
app.use(expressSession({ secret: 'super secret' , resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

const cors=require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Product on Menu CRUD
app.get("/getProducts", productController.getProducts)
app.post("/addProduct", productController.addProduct)
app.delete("/deleteProduct", productController.deleteProduct)
app.put("/updateProduct", productController.updateProduct)

//User
app.post("/signUp", userController.create)
app.post("/login", userController.authenticate)
app.get("/logout", userController.logout)

//Order
app.post("/createOrder", orderController.createOrder)
app.post("/acceptOrder", orderController.acceptOrder)
app.post("/completeOrder", orderController.completeOrder)
app.get("/orders", orderController.getActiveOrders)

app.listen(port, () => console.log("Applicazione in ascolto"));
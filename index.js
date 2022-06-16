const
    port = 8080,
    mongodbUrl = "mongodb+srv://michdigg:poliba123@mcpoliba.b0aafb5.mongodb.net/?retryWrites=true&w=majority",
    express = require('express'),
    mongoose = require('mongoose'),
    productController = require('./controllers/productController'),
    userController = require('./controllers/userController'),
    orderController = require('./controllers/orderController'),
    cookieParser = require('cookie-parser')
;
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user").User;
const flash = require('connect-flash');

mongoose.connect(mongodbUrl, {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => console.log("Connessione al database riuscita"));

require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser("jhdshhds884hfhhs-ew6dhjd"))

app.use(flash());
app.use(expressSession({ secret: 'super secret' , resave: true, saveUninitialized: true}));
app.use(passport.initialize());

const cors=require("cors");
const {verifyUser} = require ("./authenticate");

const whitelist = 'http://localhost:3000'
    ? 'http://localhost:3000'.split(",")
    : []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    httpOnly: true,
    credentials: true,
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
app.post("/login", passport.authenticate("local") ,userController.authenticate)
app.post("/refreshToken", userController.refreshToken)
app.get("/logout",verifyUser, userController.logout)
app.get("/me", verifyUser, userController.me)

//Order
app.post("/createOrder", orderController.createOrder)
app.post("/acceptOrder", orderController.acceptOrder)
app.post("/completeOrder", orderController.completeOrder)
app.get("/orders", orderController.getActiveOrders)
app.get("/orders/:email", orderController.getMyOrders)

app.listen(port, () => console.log("Applicazione in ascolto"));
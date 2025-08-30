let dotenv = require("dotenv")
let express =  require("express")
let mongoose = require("mongoose")
let cart = require('./model/cart.js')
let orders = require('./model/orders.js')
const cron = require('node-cron');
let app = express()
let cookieParser=require("cookie-parser")
let route = require("./router/router.js")
dotenv.config()

let port = process.env.PORT

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected")
).catch(()=>console.log("not connected")
)


app.set('view engine', 'ejs');
// app.set('vie',path.resolve("./vie"))
app.use(cookieParser())
app.use("/admin",(req,res,next)=>{
    if(req.cookies.name == "admin"){
        next()
    }
    else{
        res.redirect("/login")
    }
})
app.use((req, res, next) => {
    res.locals.user = req.cookies.name || null; // You can add more cookie values if needed
    res.locals.msg = req.cookies.msg || null;
    if (req.cookies.msg) {
        res.clearCookie('msg');
    }

    res.locals.c = cart.find({
        email:req.cookies.name
    })
    next();
});

app.use(express.static('uploads'));
app.use(express.urlencoded({extended: false}))

app.use("/", route); 
app.listen(port,()=>console.log("server started"))
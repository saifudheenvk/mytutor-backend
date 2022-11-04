import express, {Request,Response,Application} from 'express';

const { connect } = require("./db/database");
const cors = require('cors')
const morgan = require("morgan");
const userRouter = require("./routers/user")
const roleRouter = require("./routers/role")

const app:Application = express();


app.use(cors())
app.use(express.json())
app.use(morgan("dev"));


app.get("/", (req:Request, res:Response):void => {
    res.send("Mytutor Apis")
  });

  //middlewares
  app.use("/users", userRouter)
  app.use("/roles", roleRouter)

  //connect with mong
connect();

app.listen(process.env.PORT, ():void => {
    console.log('server is on port ' + process.env.PORT)
})
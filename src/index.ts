import express, {Request,Response,Application} from 'express';

const { connect } = require("./db/database");
const cors = require('cors')
const morgan = require("morgan");

const app:Application = express();


app.use(cors())
app.use(express.json())
app.use(morgan("dev"));


app.get("/", (req:Request, res:Response):void => {
    res.send("Mytutor Apis")
  });

  //connect with mong
connect();

app.listen(process.env.PORT, ():void => {
    console.log('server is on port ' + process.env.PORT)
})
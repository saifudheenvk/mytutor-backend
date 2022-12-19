import express, {Request,Response,Application} from 'express';
import { createDefaultPolicies } from './services/policy';

const { connect } = require("./db/database");
const cors = require('cors')
const morgan = require("morgan");
const myRouter = require("./routers")

const app:Application = express();


app.use(cors())
app.use(express.json())
app.use(morgan("dev"));


app.get("/", (req:Request, res:Response):void => {
    res.send("Mytutor Apis")
  });

  //middlewares
  app.use("/api", myRouter)

  //connect with mong
connect();

app.listen(process.env.PORT, async ():Promise<void> => {
    console.log('server is on port ' + process.env.PORT)
    await createDefaultPolicies();
})
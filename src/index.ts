
import express, {Request, Response} from 'express'
import {Ciudad}  from './intefaces'

const app = express()

// Database Setup

const DataStore = require("nedb"),
  db = new DataStore({
    filename: __dirname + "/data/example.dat",
    autoload: true,
  });


app.use(express.json());
app.get("/", (req: Request, res: Response):void => {
    
    const ciudadPrueba: Ciudad = {
        nombre: 'Terrassa',
        poblacion: 120000,
        pais: "España",
        region: "Cataluña"
    }
        res.json(ciudadPrueba)
})

app.post("/create-city", (req: Request, res: Response ):void => {

  const ciudad: Ciudad = req.body;
  if (ciudad) {
    db.insert(ciudad, (err:any, response:any) => {
      if (err) {
        console.log("error", err);
        process.exit(3);
      }
      console.log("user creat", response);
    });
  } else {
    res.send("no has definit cap user");
  }
  res.json(req.body); // res.json es com res.send pero especificant que el content type es JSON a la metadata
    
})

app.listen("3002", ():void=> {
    console.log('server runing');
})
 
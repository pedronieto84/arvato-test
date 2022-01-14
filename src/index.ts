
import express, {Request, Response} from 'express'
import {Ciudad}  from './intefaces'
import { obtenerIncidencia } from './helperFunctions';
const app = express()


const cityesArray: Ciudad[] = []

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

// Endpoint to create cities. Requeriment 3.2.
app.post("/create-city", (req: Request, res: Response ):void => {
  const ciudad: Ciudad = req.body;
  if (ciudad) {
    cityesArray.push(ciudad)
    res.send({message:"Successfully created"}) 
  } else {
    res.send({message:"You need to specify a city"});
  }
  
})

// Endpoint to check covid-Rate. Requirement 3.3.

app.get("/covid-rate", (req: Request, res: Response ):void => {

    //const covidRateRequest: CovidRequest = req.body

})

app.listen("3002", ():void=> {
    console.log('server runing');
})
 

import express, {Request, Response} from 'express'
import {Ciudad, CovidRateRequest}  from './intefaces'
import { obtenerIncidencia, validDate } from './helperFunctions';

const app = express()


const cities: Ciudad[] = []
const citiesSet = new Set()

// Mockup Data

cities.push({ nombre: "Terrassa", poblacion: 210000, region:"Cataluña", pais:"España"})
citiesSet.add("Terrassa")

app.use(express.json());
app.get("/", (req: Request, res: Response):void => {
})


// Endpoint to create cities. Requeriment 3.2.

app.post("/create-city", (req: Request, res: Response ):void => {
  const ciudad: Ciudad = req.body;
  if (ciudad) {
    if(citiesSet.has(ciudad.nombre)){
        res.send({ message: "City already exists"}) 
    }else{
        cities.push(ciudad);
        citiesSet.add(ciudad.nombre)
        res.send({ message: "Successfully created"}) 
    }
  } else {
    res.send({ message:"You need to specify a city" });
  }
})


// Endpoint to check covid-Rate for certain day. Requirement 3.3.
app.post("/covid-rate", (req: Request, res: Response ):void => {
    const covidRateRequest = req.body as CovidRateRequest | undefined
    if(covidRateRequest?.ciudad){
        // check if we have the city in our list
        console.log('set', citiesSet.values())
        if(! citiesSet.has(covidRateRequest.ciudad)){
            res.send({ error: 'City does not exist on our list' } )
        }else{
            const ciudadObject = cities.find((ciudad: Ciudad)=>{
                return ciudad.nombre === covidRateRequest.ciudad
            })
            // I know for certain that city is on the array so I cast the return to number to avoid the "undefined safecheck"
            const poblacion = ciudadObject?.poblacion as number
            console.log('poblacion', poblacion)
            const incidencia = obtenerIncidencia(covidRateRequest.covidCasos, poblacion );
            res.send({ incidencia })
        }
    }else{
        res.send({message:"Incorrect format, please check documentation about the specified format required."})
    }
})

app.get("/covid-rate-range", (req: Request, res: Response ):void => {
 
    const area = req.query.city || req.query.region
    const from = req.query.from
    const until = req.query.until
    if(area && ( from || until )){
        // Check if days format is the specified.
        const firstParam = (from || until) as string
        if(validDate(firstParam, until as string)){

        }else{
            res.send({error: "Dates have wrong format, format must be DD-MM-YYYY"})
        }


    }else{
        res.send({error: "Incorrect format request, please we need it like this ?city=London&from=DD-MM-YYYY&until=DD-MM-YYYY"})
    }
    

})

app.listen("3002", ():void=> {
    console.log('server runing');
})
 
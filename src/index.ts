
import express, {Request, Response} from 'express'
import {Ciudad, CovidRateRequest}  from './intefaces'
import { obtenerIncidencia, validDate, obtenerIncidenciaPorRangos, getDatesNumber, getTotalPopulation } from './helperFunctions';

const app = express()

// Data
const cities: Ciudad[] = []
const citiesSet = new Set()

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


// Requirement 3.3. Endpoint to check covid-Rate for certain day. 

app.get("/covid-rate", (req: Request, res: Response ):void => {
    const city = req.query.city
    const covidCasos = req.query.cases as string
    if(city && covidCasos){
        // check if we have the city in our list
        if(! citiesSet.has(city)){
            res.send({ error: 'City does not exist on our list' } )
        }else{
            const ciudadObject = cities.find((ciudad: Ciudad)=>{
                return ciudad.nombre === city
            })
            // I know for certain that city is on the array so I cast the return to number to avoid the "undefined safecheck"
            const poblacion = ciudadObject?.poblacion as number
           
            const incidencia = obtenerIncidencia(parseInt(covidCasos), poblacion );
            res.send({ incidencia })
        }
    }else{
        res.send({message:"Incorrect format, please check documentation about the specified format required."})
    }
})

// Requirement 3.4 and 3.5. Endpoint that returns covid rate of a certain city/region from a certain day or a range of days

app.get("/covid-rate-range", (req: Request, res: Response ):void => {
    
    const area = req.query.city || req.query.region
    const from = req.query.from
    const until = req.query.until
    const infected = req.query.infected as string | undefined

    if(area && ( from || until ) && infected ){
        // Check if days format is the specified.
        const firstParam = (from || until) as string
        if(validDate(firstParam, until as string)){
            const days = getDatesNumber(from as string | undefined, until as string | undefined) as number
            const poblacion = getTotalPopulation( cities, area as string )
            const covidResp = obtenerIncidenciaPorRangos( parseInt(infected), poblacion, days );
            res.send(covidResp) 
            
        }else{
            res.send({error: "Dates have wrong format, format must be DD-MM-YYYY"})
        }


    }else{
        res.send({error: "Incorrect format request, please check documentation"})
    }
    

})

app.listen("3000", ():void=> {
    console.log('server runing');
})
 
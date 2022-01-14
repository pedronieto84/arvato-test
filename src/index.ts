
import express, {Request, Response} from 'express'
import {Ciudad}  from './intefaces'

const app = express()

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

    const ciudad = req.body;
    console.log('ciudad', ciudad);
    res.json(ciudad)
    
})

app.listen("3002", ():void=> {
    console.log('server runing');
})
 
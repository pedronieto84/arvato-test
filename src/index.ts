
import express, {Request, Response} from 'express'
import {Ciudad}  from './intefaces'

const app = express()

app.get("/", (req: Request, res: Response):void => {
    
    const ciudadPrueba: Ciudad = {
        nombre: 'Terrassa',
        poblacion: 120000,
        pais: "España",
        region: "Cataluña"
    }
        res.json(ciudadPrueba)
})

app.listen("3000", ():void=> {
    console.log('server runing');
})
 

import express, {Request, Response} from 'express'

const app = express()

app.get("/", (req: Request, res: Response):void => {
        res.json({message:"hola"})
})

app.listen("3000", ():void=> {
    console.log('server runing');
})
 
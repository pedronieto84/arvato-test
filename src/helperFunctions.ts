import {Ciudad} from './intefaces'
const isValidDate = require('is-valid-date');

export const obtenerIncidencia = (infectados: number, poblacion: number) =>  {

    const ratio = infectados / poblacion
    return Math.floor(ratio * 100000)
}


export const validDate = (from:string, until?:string | undefined) => {
    if(from && until) {
        return isValidDate(from) && isValidDate(until)
    }else{
        return isValidDate(from)
    }
}
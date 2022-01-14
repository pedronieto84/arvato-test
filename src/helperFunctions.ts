import {Ciudad, CovidResponseRate} from './intefaces'
const isValidDate = require('is-valid-date');

export const obtenerIncidencia = (infectados: number, poblacion: number) =>  {

    const ratio = infectados / poblacion
    return Math.floor(ratio * 100000)
}


export const validDate = (from:string, until?:string | undefined): boolean => {
    if(from && until) {
        return isValidDate(from) && isValidDate(until)
    }else{
        return isValidDate(from)
    }
}

export const obtenerIncidenciaPorRangos = ( infectados: number, poblacion: number, fechas: string | string[] ): CovidResponseRate =>  {
    
    let responseRate: CovidResponseRate
    const ratio = obtenerIncidencia(infectados, poblacion)
    if( Array.isArray(fechas)){
       const dias = fechas.length
       responseRate = {
           total: ratio,
           diariaPromedio: Math.floor(ratio/dias)
       }
    } else {
        responseRate = {
            total: ratio,
            diariaPromedio: ratio
        }
    }
    return responseRate

}

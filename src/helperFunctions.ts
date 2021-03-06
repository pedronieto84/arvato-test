import {Ciudad, CovidResponseRate} from './intefaces'
const isValidDate = require('is-valid-date');
import moment from 'moment';

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

export const obtenerIncidenciaPorRangos = ( infectados: number, poblacion: number, fechas: number ): CovidResponseRate =>  {
    let responseRate: CovidResponseRate
    const ratio = obtenerIncidencia(infectados, poblacion)
    if( fechas > 1){
      
       responseRate = {
           total: ratio,
           diariaPromedio: Math.floor(ratio/fechas)
       }
    } else {
        responseRate = {
            total: ratio,
            diariaPromedio: ratio
        }
    }
    return responseRate
}

export const getDatesNumber = ( from: string | undefined, until: string | undefined ) =>{
        if( (from === undefined)  || ( until === undefined)){
            return 1
        }else{
            const start = moment(from, 'DD-MM-YYYY')
            const end = moment(until, 'DD-MM-YYYY')
            const totalDays = end.diff(start,'days')
            return Math.abs(totalDays)
        }
}

export const getTotalPopulation = (cities: Ciudad [], areaOrRegion: string) =>{

    // Method that returns the total population either from a certain city or from a whole region

    const findCityOrArea = cities.some((ciudad) =>{
        return ( ciudad.nombre === areaOrRegion  ) || ( ciudad.region === areaOrRegion)
    })

    if(findCityOrArea){
        let population = 0;
        cities.forEach((ciudad) =>{
            if(( ciudad.nombre === areaOrRegion  ) || ( ciudad.region === areaOrRegion)){
                population += ciudad.poblacion
            }else{
                return
            }
        })
        return population
    }else{
        return 0
    }
       
}

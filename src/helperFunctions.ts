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
            const start = moment(from)
            const end = moment(until)
            const totalDays = start.diff(end,'days')
            console.log('total days', totalDays)
            return totalDays
        }
}

export const getTotalPopulation = (cities: Ciudad [], areaOrRegion: string) =>{

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
        return 0
    }else{
        return 0
    }
       
}

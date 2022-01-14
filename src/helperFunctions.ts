import {Ciudad} from './intefaces'

export const obtenerIncidencia = (infectados: number, poblacion: number) =>  {

    const ratio = infectados / poblacion
    return Math.floor(ratio * 100000)
}


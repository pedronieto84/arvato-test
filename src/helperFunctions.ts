export const obtenerIncidencia = (infectados: number, poblacion: number) =>{

    const ratio = infectados / poblacion
    return ratio * 1000000
}
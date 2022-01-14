export interface Ciudad {
    nombre: string
    pais: string
    poblacion: number
    region?: string
}

export interface CovidRateRequest {
    covidCasos: number
    ciudad: string
}
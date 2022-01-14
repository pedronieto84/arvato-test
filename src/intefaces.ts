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

export interface CovidResponseRate {
    total: number
    diariaPromedio: number
}
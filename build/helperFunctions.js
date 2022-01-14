"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalPopulation = exports.getDatesNumber = exports.obtenerIncidenciaPorRangos = exports.validDate = exports.obtenerIncidencia = void 0;
const isValidDate = require('is-valid-date');
const moment_1 = __importDefault(require("moment"));
const obtenerIncidencia = (infectados, poblacion) => {
    const ratio = infectados / poblacion;
    return Math.floor(ratio * 100000);
};
exports.obtenerIncidencia = obtenerIncidencia;
const validDate = (from, until) => {
    if (from && until) {
        return isValidDate(from) && isValidDate(until);
    }
    else {
        return isValidDate(from);
    }
};
exports.validDate = validDate;
const obtenerIncidenciaPorRangos = (infectados, poblacion, fechas) => {
    let responseRate;
    const ratio = (0, exports.obtenerIncidencia)(infectados, poblacion);
    if (fechas > 1) {
        responseRate = {
            total: ratio,
            diariaPromedio: Math.floor(ratio / fechas)
        };
    }
    else {
        responseRate = {
            total: ratio,
            diariaPromedio: ratio
        };
    }
    return responseRate;
};
exports.obtenerIncidenciaPorRangos = obtenerIncidenciaPorRangos;
const getDatesNumber = (from, until) => {
    if ((from === undefined) || (until === undefined)) {
        return 1;
    }
    else {
        const start = (0, moment_1.default)(from, 'DD-MM-YYYY');
        const end = (0, moment_1.default)(until, 'DD-MM-YYYY');
        const totalDays = end.diff(start, 'days');
        return Math.abs(totalDays);
    }
};
exports.getDatesNumber = getDatesNumber;
const getTotalPopulation = (cities, areaOrRegion) => {
    // Method that returns the total population either from a certain city or from a whole region
    const findCityOrArea = cities.some((ciudad) => {
        return (ciudad.nombre === areaOrRegion) || (ciudad.region === areaOrRegion);
    });
    if (findCityOrArea) {
        let population = 0;
        cities.forEach((ciudad) => {
            if ((ciudad.nombre === areaOrRegion) || (ciudad.region === areaOrRegion)) {
                population += ciudad.poblacion;
            }
            else {
                return;
            }
        });
        return population;
    }
    else {
        return 0;
    }
};
exports.getTotalPopulation = getTotalPopulation;

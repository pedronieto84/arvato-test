"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helperFunctions_1 = require("./helperFunctions");
const app = (0, express_1.default)();
// Data
const cities = [];
const citiesSet = new Set();
app.use(express_1.default.json());
app.get("/", (req, res) => {
});
// Endpoint to create cities. Requeriment 3.2.
app.post("/create-city", (req, res) => {
    const ciudad = req.body;
    if (ciudad) {
        if (citiesSet.has(ciudad.nombre)) {
            res.send({ message: "City already exists" });
        }
        else {
            cities.push(ciudad);
            citiesSet.add(ciudad.nombre);
            res.send({ message: "Successfully created" });
        }
    }
    else {
        res.send({ message: "You need to specify a city" });
    }
});
// Requirement 3.3. Endpoint to check covid-Rate for certain day. 
app.post("/covid-rate", (req, res) => {
    const covidRateRequest = req.body;
    if (covidRateRequest === null || covidRateRequest === void 0 ? void 0 : covidRateRequest.ciudad) {
        // check if we have the city in our list
        if (!citiesSet.has(covidRateRequest.ciudad)) {
            res.send({ error: 'City does not exist on our list' });
        }
        else {
            const ciudadObject = cities.find((ciudad) => {
                return ciudad.nombre === covidRateRequest.ciudad;
            });
            // I know for certain that city is on the array so I cast the return to number to avoid the "undefined safecheck"
            const poblacion = ciudadObject === null || ciudadObject === void 0 ? void 0 : ciudadObject.poblacion;
            const incidencia = (0, helperFunctions_1.obtenerIncidencia)(covidRateRequest.covidCasos, poblacion);
            res.send({ incidencia });
        }
    }
    else {
        res.send({ message: "Incorrect format, please check documentation about the specified format required." });
    }
});
// Requirement 3.4 and 3.5. Endpoint that returns covid rate of a certain city/region from a certain day or a range of days
app.get("/covid-rate-range", (req, res) => {
    const area = req.query.city || req.query.region;
    const from = req.query.from;
    const until = req.query.until;
    const infected = req.query.infected;
    if (area && (from || until) && infected) {
        // Check if days format is the specified.
        const firstParam = (from || until);
        if ((0, helperFunctions_1.validDate)(firstParam, until)) {
            const days = (0, helperFunctions_1.getDatesNumber)(from, until);
            const poblacion = (0, helperFunctions_1.getTotalPopulation)(cities, area);
            const covidResp = (0, helperFunctions_1.obtenerIncidenciaPorRangos)(parseInt(infected), poblacion, days);
            res.send(covidResp);
        }
        else {
            res.send({ error: "Dates have wrong format, format must be DD-MM-YYYY" });
        }
    }
    else {
        res.send({ error: "Incorrect format request, please check documentation" });
    }
});
app.listen("3002", () => {
    console.log('server runing');
});

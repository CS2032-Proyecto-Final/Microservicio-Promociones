"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNombreTiendaById = exports.fetchNombresTiendas = void 0;
const axios_1 = __importDefault(require("axios"));
const MC_URL = "your_api_endpoint"; // Replace with your actual API URL
const fetchNombresTiendas = async (tiendaIds) => {
    try {
        // Convert tiendaIds array into a comma-separated string
        const idsParam = tiendaIds.join(',');
        // Make a GET request with tienda_id as query parameters
        const response = await axios_1.default.get(`${MC_URL}/tiendas/nombre`, {
            params: {
                tienda_id: idsParam, // Sends tienda_id as a query parameter
            },
        });
        // Check if the request was successful and data is returned
        if (response.status === 200) {
            const tiendas = response.data; // Assuming the response returns a list of tiendas
            return tiendas;
        }
        else if (response.status === 404) {
            // No tiendas found, return null or handle appropriately
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching tiendas:', error);
        return null;
    }
};
exports.fetchNombresTiendas = fetchNombresTiendas;
const fetchNombreTiendaById = async (tienda_id) => {
    try {
        const response = await axios_1.default.get(`${MC_URL}/tiendas/nombre`, {
            params: {
                tienda_id, // Sends tienda_id as a query parameter
            },
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
exports.fetchNombreTiendaById = fetchNombreTiendaById;
//# sourceMappingURL=api.js.map
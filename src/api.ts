import axios from 'axios';

const MC_URL = "http://localhost:8080"; // Replace with your actual API URL

interface Tienda {
  tienda_id: number;
  nombre_tienda: string;
}

export const fetchNombresTiendas = async (tiendaIds: number[]): Promise<Tienda[] | null> => {
  try {
    // Convert tiendaIds array into a comma-separated string
    const idsParam = tiendaIds.join(',');

    // Make a GET request with tienda_id as query parameters
    const response = await axios.get(`${MC_URL}/tiendas/nombre`, {
      params: {
        tienda_id: idsParam, // Sends tienda_id as a query parameter
      },
    });

    // Check if the request was successful and data is returned
    if (response.status === 200) {
      const tiendas: Tienda[] = response.data; // Assuming the response returns a list of tiendas
      return tiendas;
    } else if (response.status === 404) {
      // No tiendas found, return null or handle appropriately
      return null;
    }
  } catch (error) {
    console.error('Error fetching tiendas:', error);
    return null;
  }
};

export const fetchNombreTiendaById = async (tienda_id : number ) : Promise<Tienda | null> => {
    try {
        const response = await axios.get(`${MC_URL}/tiendas/nombre`, {
            params: {
              tienda_id, // Sends tienda_id as a query parameter
            },
          });

        return response.data;

    } catch (error) {
        console.error(error);
    }
}


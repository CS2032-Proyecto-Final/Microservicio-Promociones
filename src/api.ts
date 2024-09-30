import axios from 'axios';

const MC_URL = "your_api_endpoint"; // Replace with your actual API URL

interface Tienda {
  tienda_id: number;
  nombre_tienda: string;
}

export const fetchNombresTiendas = async (tiendaIds: number[]): Promise<Tienda[] | null> => {
  try {
    
    // Make a GET request with tienda_id as query parameters
    const response = await axios.patch(`${MC_URL}/tiendas/nombre`, tiendaIds);

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
        const response = await axios.patch(`${MC_URL}/tiendas/nombre`, tienda_id);

        return response.data;

    } catch (error) {
        console.error(error);
    }
}


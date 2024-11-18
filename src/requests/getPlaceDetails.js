require('dotenv').config();

const apiKey = process.env.API_KEY;

const getPlaceDetails = async (placeId) => {
  const detailsResponse = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
  );
  const detailsData = await detailsResponse.json();
  
  if (detailsData.status === 'OK') {
    return detailsData.result; // Devuelve todos los detalles del lugar
  } else {
    throw new Error('No se pudo obtener detalles del lugar');
  }
};

module.exports = {
  getPlaceDetails,
};

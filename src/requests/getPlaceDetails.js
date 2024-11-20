require('dotenv').config();

const apiKey = process.env.API_KEY;

const getPlaceDetails = async (placeId) => {
  const detailsResponse = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
  );
  const detailsData = await detailsResponse.json();

  if (detailsData.status === 'OK') {
    const result = detailsData.result;

    const photos = result.photos.length > 0 ? result.photos : null;
    
    const imagesData = photos.map(img => img.photo_reference)

    return {
      ...result,
      imagesData, 
    };
  } else {
    throw new Error('No se pudo obtener detalles del lugar');
  }
};

module.exports = {
  getPlaceDetails,
};
